import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsDefined, IsNotEmpty, MaxLength } from 'class-validator'
import { Task } from '@/entities/task'
import { User } from '@/entities/user'

type ConstructorParams = {
  taskId?: string
  creatorId?: string
  text?: string
}

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
  constructor(params?: ConstructorParams) {
    super()
    if (!params) return

    const { taskId, creatorId, text } = params

    if (taskId) this.taskId = taskId
    if (creatorId) this.creatorId = creatorId
    if (text) this.text = text
  }

  @PrimaryColumn({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  id!: string

  @Column({ type: 'uuid' })
  @IsNotEmpty({ message: 'Task for comment should be defined' })
  taskId!: string

  @ManyToOne(() => Task, task => task.comments, { onDelete: 'CASCADE' })
  task!: Task

  @Column({ type: 'uuid' })
  @IsNotEmpty({ message: 'Creator for comment should be defined' })
  creatorId!: string

  @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
  creator!: User

  @Column()
  @IsDefined({ message: 'Text should be defined' })
  @MaxLength(200, { message: 'Text is too long. Max $constraint1' })
  text!: string

  @CreateDateColumn()
  readonly createdAt!: Date

  @UpdateDateColumn()
  readonly updatedAt!: Date
}
