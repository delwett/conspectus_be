import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsDefined, IsNotEmpty, IsOptional, MaxLength, IsEmail } from 'class-validator'

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

  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'first_name' })
  @IsDefined({ message: 'First name should be defined' })
  @MaxLength(200, { message: 'First name is too long. Max $constraint1' })
  firstName!: string

  @Column({ name: 'last_name', nullable: true })
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
