import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { LoggerService } from './common/logger/logger.service';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import * as crypto from 'crypto';
import helmet from 'helmet';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') ?? 3000;
  const nodeEnv = configService.get('NODE_ENV') ?? 'development';

  // ----------------------
  // Core Security
  // ----------------------
  app.use(helmet());

  app.use(cookieParser());

  // Body limit
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));

  // Request ID
  app.use(
    (
      req: express.Request & { id?: string },
      res: express.Response,
      next: express.NextFunction,
    ) => {
      req.id = (req.headers['x-request-id'] as string) || crypto.randomUUID();
      res.setHeader('x-request-id', req.id);
      next();
    },
  );
  // ----------------------
  // Versioning
  // ----------------------
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // ----------------------
  // CORS
  // ----------------------
  // ----------------------
  // CORS
  // ----------------------
  const allowedOrigins =
    configService
      .get('ALLOWED_ORIGINS')
      ?.split(',')
      .map((o) => o.trim()) || [];

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      // Logic: Allow if no origin (local/server) or if it's in our white-list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // Logging the origin as a string safely
        console.warn(
          `CORS blocked for origin: ${String(origin)}. Update ALLOWED_ORIGINS in .env`,
        );
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // ----------------------
  // Logging Middleware
  // ----------------------
  const logger = await app.resolve(LoggerService);
  app.use(new LoggingMiddleware(logger).use);

  // ----------------------
  // Validation
  // ----------------------
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ----------------------
  // Exception Filter
  // ----------------------
  app.useGlobalFilters(new AllExceptionsFilter());

  // ----------------------
  // Prefix
  // ----------------------
  app.setGlobalPrefix('api');

  // ----------------------
  // Graceful shutdown
  // ----------------------
  app.enableShutdownHooks();

  await app.listen(port);
  console.log(`Server running on http://localhost:${port} [${nodeEnv}]`);
}

void bootstrap();
