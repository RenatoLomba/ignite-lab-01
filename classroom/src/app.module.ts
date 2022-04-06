import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [DatabaseModule, ServicesModule, HttpModule],
  providers: [],
})
export class AppModule {}
