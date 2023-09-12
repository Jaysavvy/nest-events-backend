import { TeacherAddInput } from './teacher-add.input';
import { InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class TeacherEditInput extends PartialType(
  OmitType(TeacherAddInput, ['gender']),
) {}
