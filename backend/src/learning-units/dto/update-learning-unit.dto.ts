import { PartialType } from '@nestjs/swagger';
import { CreateLearningUnitDto } from './create-learning-unit.dto';

export class UpdateLearningUnitDto extends PartialType(CreateLearningUnitDto) {}
