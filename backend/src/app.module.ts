import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SubjectsModule } from './subjects/subjects.module';
import { LearningUnitsModule } from './learning-units/learning-units.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { DailyAssignmentsModule } from './daily-assignments/daily-assignments.module';
import { AttemptsModule } from './attempts/attempts.module';
import { GradingModule } from './grading/grading.module';
import { StorageModule } from './storage/storage.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env.local'],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    SubjectsModule,
    LearningUnitsModule,
    AssessmentsModule,
    DailyAssignmentsModule,
    AttemptsModule,
    GradingModule,
    StorageModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
