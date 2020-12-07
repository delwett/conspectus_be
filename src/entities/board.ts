import { Entity, BaseEntity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { Task } from '@/entities/task'

export enum BoardStatus {
  Pending = 'PENDING',
  Finished = 'FINISHED'
}

@Entity({ name: 'boards' })
export class Board extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  id!: string

  @Column({ type: 'date' })
  @IsNotEmpty({ message: 'Meeting date should be defined' })
  meetingDate!: string

  @Column({ type: 'varchar' })
  @IsNotEmpty({ message: 'Status should be defined' })
  @IsEnum(BoardStatus, { message: 'Incorect status value' })
  status!: BoardStatus

  @OneToMany(() => Task, task => task.board)
  tasks?: Promise<Task[]>

  @CreateDateColumn()
  readonly createdAt!: Date

  @UpdateDateColumn()
  readonly updatedAt!: Date
}
