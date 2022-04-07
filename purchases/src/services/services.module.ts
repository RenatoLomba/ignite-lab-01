import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MessagingModule } from '../messaging/messaging.module';
import { CustomersService } from './customers.service';
import { ProductsService } from './products.service';
import { PurchasesService } from './purchases.service';

@Module({
  imports: [DatabaseModule, MessagingModule],
  providers: [ProductsService, PurchasesService, CustomersService],
  exports: [ProductsService, PurchasesService, CustomersService],
})
export class ServicesModule {}
