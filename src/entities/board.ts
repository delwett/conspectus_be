import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm'
import { IsEnum, IsNotEmpty, validate } from 'class-validator'
import getValidationErrorMessage from '@/utils/get-validation-error-message'
import ValidationError from '@/errors/validation-error'
import { Task } from '@/entities/task'

export enum BoardStatus {
  Pending = 'PENDING',
  Finished = 'FINISHED'
}

type ConstructorParams = {
  meetingDate?: string
  status?: BoardStatus
}

@Entity({ name: 'boards' })
export class Board extends BaseEntity {
  constructor(params?: ConstructorParams) {
    super()
    if (!params) return

    const { meetingDate, status } = params

    if (meetingDate) this.meetingDate = meetingDate
    if (status) this.status = status
  }

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
  tasks?: Task[]

  @CreateDateColumn()
  readonly createdAt!: Date

  @UpdateDateColumn()
  readonly updatedAt!: Date

  @BeforeInsert()
  @BeforeUpdate()
  async validateEntity(): Promise<void> {
    const errors = await validate(this)

    if (errors.length > 0) throw new ValidationError(getValidationErrorMessage(errors))
  }
}
