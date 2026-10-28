import { Module } from '@nestjs/common';
import { LearningUnitsService } from './learning-units.service';
import { LearningUnitsController } from './learning-units.controller';

@Module({
  controllers: [LearningUnitsController],
  providers: [LearningUnitsService],
  exports: [LearningUnitsService],
})
export class LearningUnitsModule {}
