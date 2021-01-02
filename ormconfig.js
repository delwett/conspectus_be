const { SnakeNamingStrategy } = require('typeorm-naming-strategies')

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  logger: 'advancedconsole',
  migrations: ['dist/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/migrations'
  }
}