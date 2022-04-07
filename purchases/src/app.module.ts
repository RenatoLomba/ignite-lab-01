import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { ServicesModule } from './services/services.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [DatabaseModule, ServicesModule, HttpModule, MessagingModule],
  providers: [],
})
export class AppModule {}
