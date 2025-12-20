import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class AuthService {
  private readonly entity = 'Auth';

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {}
}
