import { Entity, BaseEntity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { IsDefined, IsNotEmpty, IsOptional, MaxLength, IsEmail, IsDate } from 'class-validator'
import { Task } from '@/entities/task'

type ConstructorParams = {
  firstName?: string
  lastName?: string
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
    if (lastName) this.lastName = lastName
    if (email) this.email = email
    if (password) this.password = password
  }

  @PrimaryColumn({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  id!: string

  @Column()
  @IsDefined({ message: 'First name should be defined' })
  @MaxLength(200, { message: 'First name is too long. Max $constraint1' })
  firstName!: string

  @Column({ nullable: true })
  @IsOptional()
  @MaxLength(200, { message: 'First name is too long. Max $constraint1' })
  lastName?: string

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Email should be defined' })
  @MaxLength(200, { message: 'Email is too long. Max $constraint1' })
  @IsEmail(undefined, { message: 'Incorrect email.' })
  email!: string

  @Column()
  @IsNotEmpty({ message: 'Password should be defined' })
  password!: string

  @OneToMany(() => Task, task => task.board)
  tasks?: Task[]

  @CreateDateColumn()
  @IsDate()
  createdAt!: Date

  @UpdateDateColumn()
  @IsDate()
  updatedAt!: Date
}
