export const Stage = process.env.STAGE ?? 'development'
export const JwtSecret = process.env.JWT_SECRET ?? ''
export const Port = Number(process.env.PORT) ?? 8000
export const ApiPath = process.env.API_PATH ?? '/graphql'
export const ApiPlaygroundPath = process.env.API_PLAYGROUND_PATH ?? '/playground'
export const Host = process.env.HOST ?? 'localhost'

export const SmtpHost = process.env.SMTP_HOST ?? 'smtp.yandex.ru'
export const SmtpUser = process.env.SMTP_USER ?? 'user'
export const SmtpPass = process.env.SMTP_PASS ?? 'pass'
export const EmailFrom = process.env.EMAIL_FROM ?? 'test@test.test'
