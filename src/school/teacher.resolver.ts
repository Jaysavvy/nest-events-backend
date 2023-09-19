import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PaginatedTeachers, Teacher } from './teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherAddInput } from './input/teacher-add.input';
import { Logger, UseGuards } from '@nestjs/common';
import { TeacherEditInput } from './input/teacher-edits.input';
import { EntityWithId } from './school.types';
import { AuthGuardJwtGql } from 'src/auth/auth-gaurd-jwt-gql';
import { paginate } from 'src/pagination/paginator';

@Resolver(() => Teacher)
export class TeacherResolver {
  private readonly logger = new Logger(TeacherResolver.name);

  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {}

  @Query(() => PaginatedTeachers)
  public async teachers(): Promise<PaginatedTeachers> {
    return paginate<Teacher, PaginatedTeachers>(
      this.teachersRepository.createQueryBuilder(),
      PaginatedTeachers,
    );
  }

  @Query(() => Teacher)
  public async teacher(
    @Args('id', { type: () => Int })
    id: number,
  ): Promise<Teacher> {
    return await this.teachersRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  @Mutation(() => Teacher, { name: 'teacherAdd' })
  @UseGuards(AuthGuardJwtGql)
  public async add(
    @Args('input', { type: () => TeacherAddInput })
    input: TeacherAddInput,
  ): Promise<Teacher> {
    return await this.teachersRepository.save(new Teacher(input));
  }

  @Mutation(() => Teacher, { name: 'teacherEdit' })
  public async edit(
    @Args('id', { type: () => Int })
    id: number,
    @Args('input', { type: () => TeacherEditInput })
    input: TeacherEditInput,
  ): Promise<Teacher> {
    const teacher = await this.teachersRepository.findOneOrFail({
      where: {
        id,
      },
    });

    return await this.teachersRepository.save(
      new Teacher(Object.assign(teacher, input)),
    );
  }

  @Mutation(() => EntityWithId, { name: 'teacherDelete' })
  public async delete(
    @Args('id', { type: () => Int })
    id: number,
  ): Promise<EntityWithId> {
    const teacher = await this.teachersRepository.findOneOrFail({
      where: {
        id,
      },
    });
    await this.teachersRepository.remove(teacher);

    return new EntityWithId(id);
  }

  @ResolveField('subjects')
  public async subjects(@Parent() teacher: Teacher) {
    this.logger.debug(`@ResolveField subjects was called`);
    return await teacher.subjects;
  }
}
