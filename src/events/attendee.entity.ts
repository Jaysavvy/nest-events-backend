import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';

export enum AttendeeAnswerEnum {
  Accepted = 1,
  Maybe = 2,
  Rejected,
}

@Entity()
export class Attendee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Event, (event) => event.attendees, {
    nullable: false,
  })
  @JoinColumn()
  event: Event;

  @Column('enum', {
    enum: AttendeeAnswerEnum,
    default: AttendeeAnswerEnum.Accepted,
  })
  answer: AttendeeAnswerEnum;

  //   @ManyToOne(() => Event, (event) => event.attendees)
  //   event: Event;
}
