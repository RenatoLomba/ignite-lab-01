import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { ServicesModule } from './services/services.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    DatabaseModule,
    ServicesModule,
    HttpModule,
    MessagingModule,
  ],
  providers: [],
})
export class AppModule {}
