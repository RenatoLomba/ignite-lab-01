import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { CreatePurchaseDto } from './dtos/create-purchase.dto';
import { ProductsService } from './products.service';

@Injectable()
export class PurchasesService {
  constructor(
    private readonly prisma: PrismaService,
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
    });

    return purchase;
  }
}
