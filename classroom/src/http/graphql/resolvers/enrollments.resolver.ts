import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses.service';

import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { CreateEnrollmentInput } from '../inputs/create-enrollment.input';
import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private readonly enrollmentsService: EnrollmentsService,
    private readonly studentsService: StudentsService,
    private readonly coursesService: CoursesService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentsService.listAll();
  }

  @ResolveField(() => Student)
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.findById(enrollment.studentId);
  }

  @ResolveField(() => Course)
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.findById(enrollment.courseId);
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Enrollment)
  async createEnrollment(
    @Args('data') data: CreateEnrollmentInput,
    @CurrentUser() user: AuthUser,
  ) {
    let student = await this.studentsService.findByAuthUserId(user.sub);

    if (!student) {
      student = await this.studentsService.create({ authUserId: user.sub });
    }

    const enrollment = await this.enrollmentsService.create({
      courseId: data.courseId,
      studentId: student.id,
    });

    return enrollment;
  }
}
