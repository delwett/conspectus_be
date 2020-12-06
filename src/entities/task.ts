import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsDate, IsDefined, IsEnum, IsNotEmpty, MaxLength } from 'class-validator'
import { Board } from '@/entities/board'
import { User } from '@/entities/user'

export enum TaskStatus {
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED'
}

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  id!: string

  @Column({ type: 'uuid' })
  @IsNotEmpty({ message: 'Board for task should be defined' })
  boardId!: string

  @ManyToOne(() => Board, board => board.tasks)
  board!: Board

  @Column({ type: 'uuid' })
  @IsNotEmpty({ message: 'Creator for task should be defined' })
  creatorId!: string

  @ManyToOne(() => User, user => user.tasks)
  creator!: User

  @Column()
  @IsDefined({ message: 'Description should be defined' })
  @MaxLength(200, { message: 'Description is too long. Max $constraint1' })
  description!: string

  @Column({ type: 'varchar' })
  @IsNotEmpty({ message: 'Status should be defined' })
  @IsEnum(TaskStatus, { message: 'Incorect status value' })
  status!: TaskStatus

  @CreateDateColumn()
  @IsDate()
  createdAt!: Date

  @UpdateDateColumn()
  @IsDate()
  updatedAt!: Date
}
