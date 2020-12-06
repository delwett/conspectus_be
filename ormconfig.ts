import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  logger: 'advanced-console',
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations'
  }
}
