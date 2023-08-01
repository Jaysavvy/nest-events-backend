import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;
  name: string;
  description: string;
  when: Date;
  address: string;
}
