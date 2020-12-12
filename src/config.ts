export const Stage = process.env.STAGE ?? 'development'
export const JwtSecret = process.env.JWT_SECRET ?? ''
export const Port = Number(process.env.PORT) ?? 8000
export const ApiPath = process.env.API_PATH ?? '/graphql'
export const ApiPlaygroundPath = process.env.API_PLAYGROUND_PATH ?? '/playground'
export const Host = process.env.HOST ?? 'localhost'
