import { BadRequestException, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async listAll() {
    return this.prisma.product.findMany();
  }

  async findById(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async findBySlug(slug: string) {
    return this.prisma.product.findUnique({
      where: {
        slug,
      },
    });
  }

  async create({ title }: CreateProductDto) {
    const slug = slugify(title, { lower: true, trim: true, remove: /\./ });

    const productWithSameSlug = await this.findBySlug(slug);

    if (!!productWithSameSlug) {
      throw new BadRequestException(
        'Another product with same slug already exists.',
      );
    }

    const product = await this.prisma.product.create({ data: { title, slug } });

    return product;
  }
}
