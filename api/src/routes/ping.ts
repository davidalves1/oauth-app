import { FastifyInstance } from 'fastify'

export default async function pingRoute(app: FastifyInstance) {
  app.get('/ping', () => {
    return { pong: 'OK' }
  })
}
