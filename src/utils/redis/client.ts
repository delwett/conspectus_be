import redis from 'redis'

const client = redis.createClient({ url: process.env.REDIS_URL })

client.on('error', (e: unknown) => {
  console.error(e)
  throw e
})

export default client
