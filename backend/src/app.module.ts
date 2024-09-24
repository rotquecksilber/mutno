import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { createWinstonConfig } from '../configs/winston.config';
import { ProductModule } from './products/product.module';
import { WinstonModule } from 'nest-winston';
import { UsersModule } from './users/users.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { StoresModule } from './stores/stores.module';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot(createWinstonConfig()),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    ProductModule,
    UsersModule,
    BcryptModule,
    AuthModule,
    ContactsModule,
    StoresModule,
    NotificationModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, NotificationService],
})
export class AppModule {}
