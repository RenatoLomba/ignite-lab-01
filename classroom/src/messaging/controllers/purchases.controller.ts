import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PurchaseEvents } from '../../core/enums/events/purchase-events';
import { CoursesService } from '../../services/courses.service';
import { EnrollmentsService } from '../../services/enrollments.service';
import { StudentsService } from '../../services/students.service';
import { PurchaseCreatedPayload } from '../payloads/purchase-created';

@Controller()
export class PurchasesController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly coursesService: CoursesService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  @EventPattern(PurchaseEvents.NEW_PURCHASE)
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.findByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.create({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.coursesService.findBySlug(payload.product.slug);

    if (!course) {
      course = await this.coursesService.create({
        title: payload.product.title,
        slug: payload.product.slug,
      });
    }

    await this.enrollmentsService.create({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
