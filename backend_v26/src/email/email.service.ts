import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { LoggerService } from 'src/common/logger/logger.service';
import { ConfigService } from 'src/config/config.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {
    const host = this.config.get('SMTP_HOST');
    const port = Number(this.config.get('SMTP_PORT')) || 587;
    const user = this.config.get('SMTP_USER');
    const pass = this.config.get('SMTP_PASS');

    if (!host || !user || !pass) {
      throw new Error('SMTP configuration is incomplete');
    }

    const secure = port === 465;

    const transporterConfig: SMTPTransport.Options = {
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    };

    this.transporter = nodemailer.createTransport(transporterConfig);

    this.logger.info('EmailService initialized', {
      host,
      port,
      secure,
    });
  }

  // ──────────────────────────────
  // SEND EMAIL (GENERIC)
  // ──────────────────────────────
  async sendMail(params: {
    to: string | string[];
    subject: string;
    html: string;
    fromName?: string;
  }): Promise<void> {
    const recipients = Array.isArray(params.to) ? params.to : [params.to];

    if (!recipients.length) {
      this.logger.warn('No recipients provided. Skipping email send.');
      return;
    }

    const ctx = {
      recipientsCount: recipients.length,
      subject: params.subject,
    };

    const nodeEnv = this.config.get('NODE_ENV');

    // ──────────────────────────────
    // TEST / LOCAL MODE
    // ──────────────────────────────
    if (nodeEnv === 'test' || nodeEnv === 'development') {
      this.saveHtmlToFile(params.html, params.subject);
      this.logger.info('Email skipped (non-production mode)', ctx);
      return;
    }

    // ──────────────────────────────
    // PRODUCTION SEND
    // ──────────────────────────────
    try {
      const mailOptions: nodemailer.SendMailOptions = {
        from: `"${params.fromName ?? 'App'}" <${this.config.get('SMTP_USER')}>`,
        to: recipients.join(','),
        subject: params.subject,
        html: params.html,
      };

      const info = await this.transporter.sendMail(mailOptions);

      this.logger.info('Email sent successfully', {
        ...ctx,
        messageId: info.messageId,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown email error';

      this.logger.error('Failed to send email', {
        ...ctx,
        error: message,
      });

      throw new InternalServerErrorException('Email delivery failed');
    }
  }

  // ──────────────────────────────
  // DEV / TEST HELPER
  // ──────────────────────────────
  private saveHtmlToFile(html: string, subject: string) {
    try {
      const dir = path.join(process.cwd(), 'email-previews');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      const safeSubject = subject
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .slice(0, 50);

      const filename = `${Date.now()}-${safeSubject}.html`;
      const filePath = path.join(dir, filename);

      fs.writeFileSync(filePath, html, 'utf-8');

      this.logger.debug('Email HTML saved to file', {
        filePath,
        sizeKb: (html.length / 1024).toFixed(2),
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Unknown file write error';

      this.logger.warn('Failed to save email HTML to file', {
        error: message,
      });
    }
  }
}
