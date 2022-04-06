import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { CoursesService } from './courses.service';
import { CreateEnrollmentDto } from './dtos/create-enrollment.dto';
import { FindByStudentAndCourse } from './dtos/find-by-student-and-course.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly coursesService: CoursesService,
  ) {}

  listAll() {
    return this.prisma.enrollment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        cancelledAt: null,
      },
    });
  }

  listByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        cancelledAt: null,
        studentId,
      },
    });
  }

  findByCourseAndStudent({ courseId, studentId }: FindByStudentAndCourse) {
    return this.prisma.enrollment.findFirst({
      where: { courseId, studentId, cancelledAt: null },
    });
  }

  async create({ courseId, studentId }: CreateEnrollmentDto) {
    const course = await this.coursesService.findById(courseId);

    if (!course) {
      throw new BadRequestException('Course not found.');
    }

    return this.prisma.enrollment.create({
      data: { courseId, studentId },
    });
  }
}
