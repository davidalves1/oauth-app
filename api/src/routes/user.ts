import { FastifyInstance } from 'fastify'

export default async function userRoutes(app: FastifyInstance) {
  // Garante que todas as rotas deste método deverão estar autenticadas
  app.addHook('preHandler', async (req) => {
    await req.jwtVerify()
  })

  app.get('/user', async () => {
    // usa o req.
    return {
      id: 10,
      name: 'Test',
      login: 'test123',
      avatarUrl: '',
    }
  })
}
