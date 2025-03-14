import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeUpdate,
  BeforeInsert
} from 'typeorm'
import { IsDefined, IsEnum, IsNotEmpty, MaxLength, validate } from 'class-validator'
import { Board } from '@/entities/board'
import { User } from '@/entities/user'
import { Comment } from '@/entities/comment'
import validateTaskInheritance from '@/validators/validate-task-inheritance'
import getValidationErrorMessage from '@/utils/get-validation-error-message'
import ValidationError from '@/errors/validation-error'

export enum TaskStatus {
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED'
}

type ConstructorParams = {
  boardId?: string
  creatorId?: string
  parentId?: string | null
  description?: string
  status?: TaskStatus
}

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  constructor(params?: ConstructorParams) {
    super()
    if (!params) return
    const { boardId, creatorId, parentId, description, status } = params

    if (boardId) this.boardId = boardId
    if (creatorId) this.creatorId = creatorId
    if (parentId) this.parentId = parentId
    if (description) this.description = description
    if (status) this.status = status
  }

  @PrimaryColumn({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  id!: string

  @Column({ type: 'uuid' })
  @IsNotEmpty({ message: 'Board for task should be defined' })
  boardId!: string

  @ManyToOne(() => Board, board => board.tasks, { onDelete: 'CASCADE' })
  board!: Board

  @Column({ type: 'uuid' })
  @IsNotEmpty({ message: 'Creator for task should be defined' })
  creatorId!: string

  @ManyToOne(() => User, user => user.tasks, { onDelete: 'CASCADE' })
  creator!: User

  @Column({ type: 'uuid', nullable: true })
  parentId!: string | null

  @OneToMany(() => Task, task => task.parent)
  subtasks?: Task[]

  @ManyToOne(() => Task, task => task.subtasks)
  parent?: Task | null

  @OneToMany(() => Comment, comment => comment.task)
  comments?: Comment[]

  @Column()
  @IsDefined({ message: 'Description should be defined' })
  @MaxLength(200, { message: 'Description is too long. Max $constraint1' })
  description!: string

  @Column({ type: 'varchar' })
  @IsNotEmpty({ message: 'Status should be defined' })
  @IsEnum(TaskStatus, { message: 'Incorect status value' })
  status!: TaskStatus

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

  @BeforeInsert()
  @BeforeUpdate()
  async vaidateInheritance(): Promise<void> {
    await validateTaskInheritance(this)
  }
}
