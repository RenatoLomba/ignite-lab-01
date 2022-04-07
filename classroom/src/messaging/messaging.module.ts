import { Module } from '@nestjs/common';
import { ServicesModule } from '../services/services.module';

import { PurchasesController } from './controllers/purchases.controller';

@Module({
  imports: [ServicesModule],
  controllers: [PurchasesController],
})
export class MessagingModule {}
