import { BadRequestException, Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '../database/prisma/prisma.service';
import { CreateCourseDto } from './dtos/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  listAll() {
    return this.prisma.course.findMany();
  }

  findById(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.course.findUnique({ where: { slug } });
  }

  async create({ title }: CreateCourseDto) {
    const slug = slugify(title, { lower: true, trim: true, remove: /\./ });

    const courseWithSameSlug = await this.findBySlug(slug);

    if (!!courseWithSameSlug) {
      throw new BadRequestException(
        'Another course with same slug already exists.',
      );
    }

    const course = await this.prisma.course.create({ data: { title, slug } });

    return course;
  }
}
