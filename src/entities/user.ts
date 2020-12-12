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
import { IsDefined, IsNotEmpty, IsOptional, MaxLength, IsEmail, validate } from 'class-validator'
import getValidationErrorMessage from '@/utils/get-validation-error-message'
import ValidationError from '@/errors/validation-error'
import { Task } from '@/entities/task'
import { Comment } from '@/entities/comment'

type ConstructorParams = {
  firstName?: string
  lastName?: string | null
  email?: string
  password?: string
}

@Entity({ name: 'users' })
export class User extends BaseEntity {
  constructor(params?: ConstructorParams) {
    super()
    if (!params) return
    const { firstName, lastName, email, password } = params

    if (firstName) this.firstName = firstName
    if (lastName !== undefined) this.lastName = lastName
    if (email) this.email = email
    if (password) this.password = password
  }

  @PrimaryColumn({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  id!: string

  @Column()
  @IsDefined({ message: 'First name should be defined' })
  @MaxLength(200, { message: 'First name is too long. Max $constraint1' })
  firstName!: string

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @MaxLength(200, { message: 'First name is too long. Max $constraint1' })
  lastName!: string | null

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Email should be defined' })
  @MaxLength(200, { message: 'Email is too long. Max $constraint1' })
  @IsEmail(undefined, { message: 'Incorrect email.' })
  email!: string

  @Column()
  @IsNotEmpty({ message: 'Password should be defined' })
  password!: string

  @OneToMany(() => Task, task => task.creator)
  tasks?: Task[]

  @OneToMany(() => Comment, comment => comment.creator)
  comments?: Comment[]

  @Column({ type: 'timestamp', nullable: true })
  deletedAt!: Date | null

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
