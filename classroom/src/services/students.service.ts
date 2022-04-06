import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { CreateStudentDto } from './dtos/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  listAll() {
    return this.prisma.student.findMany();
  }

  findById(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }

  findByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: { authUserId },
    });
  }

  create({ authUserId }: CreateStudentDto) {
    return this.prisma.student.create({
      data: { authUserId },
    });
  }
}
