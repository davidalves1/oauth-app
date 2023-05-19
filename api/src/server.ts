import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { registerRoutes } from './routes'

const app = fastify({ logger: true })

const PORT = process.env.PORT || 5555

app.register(cors, {
  origin: true, // Aqui pode definir quais urls serão aceitas. true aceita tudo
})

app.register(jwt, {
  // email+project
  secret:
    '55d52dcf6ea8031d5564ad8b068e7c1cebb6144a96c223e1953713b2b773c37ed8c5d0e05e3ee17db961b563f07aac4538b86ee41ed88e26149437bc0455a31d',
})

const bootstrap = async () => {
  try {
    await registerRoutes(app)

    await app.listen({ port: Number(PORT) })

    // eslint-disable-next-line no-console
    console.log(`🔥 The magic happens on http://localhost:${PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

bootstrap()
