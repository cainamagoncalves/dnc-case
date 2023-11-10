import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Incorrect environment variables.')

  throw new Error('Incorrect environment variables')
}

export const env = _env.data
