import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { nestCsrf } from 'ncsrf/dist';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';

import { ServerExceptionFilter } from './errors/filters/server-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.use(cookieParser());
  app.use(nestCsrf());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new ServerExceptionFilter());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3001);
}
bootstrap()
  .then(() => console.log('Application started successfully'))
  .catch((err) => console.error('Failed to start application', err));
