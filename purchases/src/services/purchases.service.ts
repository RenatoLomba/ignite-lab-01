import { BadRequestException, Injectable } from '@nestjs/common';
import { PurchaseEvents } from '../core/enums/events/purchase-events';

import { PrismaService } from '../database/prisma/prisma.service';
import { KafkaService } from '../messaging/kafka.service';
import { CreatePurchaseDto } from './dtos/create-purchase.dto';
import { ProductsService } from './products.service';

@Injectable()
export class PurchasesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaService: KafkaService,
    private readonly productsService: ProductsService,
  ) {}

  async listAll() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async listByCustomerId(customerId: string) {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: { customerId },
    });
  }

  async create({ customerId, productId }: CreatePurchaseDto) {
    const product = await this.productsService.findById(productId);

    if (!product) {
      throw new BadRequestException('Product not found.');
    }

    const purchase = await this.prisma.purchase.create({
      data: { customerId, productId },
      include: { customer: true, product: true },
    });

    this.kafkaService.emit(PurchaseEvents.NEW_PURCHASE, {
      customer: {
        authUserId: purchase.customer.authUserId,
      },
      product: {
        id: purchase.product.id,
        title: purchase.product.title,
        slug: purchase.product.slug,
      },
    });

    return purchase;
  }
}
