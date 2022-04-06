import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CoursesService } from './courses.service';
import { EnrollmentsService } from './enrollments.service';
import { StudentsService } from './students.service';

@Module({
  imports: [DatabaseModule],
  providers: [CoursesService, StudentsService, EnrollmentsService],
  exports: [CoursesService, StudentsService, EnrollmentsService],
})
export class ServicesModule {}
