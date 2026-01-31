import { Injectable, Scope } from '@nestjs/common';
import pino, { Logger as PinoLogger, StreamEntry } from 'pino';
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { join } from 'path';
import { ConfigService } from 'src/config/config.service';

export interface LogContext {
  entity: string;
  action: string;
  additional?: Record<string, unknown>;
}

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private readonly logger: PinoLogger;
  private readonly logDetail: boolean;

  constructor(private readonly configService: ConfigService) {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    const logToFile = this.configService.get('LOG_TO_FILE');
    this.logDetail = this.configService.get('LOG_DETAIL');
    const logLevel =
      this.configService.get('LOG_LEVEL') || (isProduction ? 'info' : 'debug');

    const logDir = this.configService.get('LOG_DIR') || './logs';

    if (logToFile && !existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
    }

    const pinoConfig = {
      level: logLevel,
      timestamp: pino.stdTimeFunctions.isoTime,
    };

    // ---------------- PROD: FILE LOGGING ----------------
    if (logToFile && isProduction) {
      const streams: StreamEntry[] = [
        // Access log → EVERYTHING
        {
          level: logLevel,
          stream: createWriteStream(join(logDir, 'access.log'), {
            flags: 'a',
          }),
        },
        // Error log → ONLY errors
        {
          level: 'error',
          stream: createWriteStream(join(logDir, 'error.log'), {
            flags: 'a',
          }),
        },
      ];

      this.logger = pino(pinoConfig, pino.multistream(streams));
      return;
    }

    // ---------------- DEV: PRETTY CONSOLE ----------------
    this.logger = pino({
      ...pinoConfig,
      transport: !isProduction
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
    });
  }

  info(msg: string, meta?: Record<string, unknown>) {
    this.logger.info(meta, msg);
  }

  warn(msg: string, meta?: Record<string, unknown>) {
    this.logger.warn(meta, msg);
  }

  error(msg: string, meta?: Record<string, unknown>) {
    this.logger.error(meta, msg);
  }

  debug(msg: string, meta?: Record<string, unknown>) {
    this.logger.debug(meta, msg);
  }

  logInfo(msg: string, context: LogContext) {
    this.logger.info(this.formatContext(context, msg));
  }

  logDebug(msg: string, context: LogContext) {
    this.logger.debug(this.formatContext(context, msg));
  }

  logWarn(msg: string, context: LogContext) {
    this.logger.warn(this.formatContext(context, msg));
  }

  logError(msg: string, context: LogContext, error?: unknown) {
    const errorMsg = error instanceof Error ? error.stack : String(error);
    this.logger.error(this.formatContext(context, msg, errorMsg));
  }

  private formatContext(
    context: LogContext,
    msg: string,
    error?: string,
  ): string {
    let base = `[${context.entity}][${context.action}] ${msg}`;

    if (this.logDetail && context.additional) {
      base += ` | ${JSON.stringify(context.additional)}`;
    }

    if (error) {
      base += ` | ERROR: ${error}`;
    }

    return base;
  }
}
