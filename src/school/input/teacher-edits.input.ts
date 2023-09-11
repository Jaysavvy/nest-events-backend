import { PartialType } from '@nestjs/mapped-types';
import { TeacherAddInput } from './teacher-add.input';
import { InputType } from '@nestjs/graphql';

@InputType()
export class TeacherEditInput extends PartialType(TeacherAddInput) {}
