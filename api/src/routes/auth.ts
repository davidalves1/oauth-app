import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { github, githubApi } from '../lib/github'

export default async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (req) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(req.body)

    const accessTokenResponse = await github.post('/login/oauth/access_token', null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    })

    const { access_token } = accessTokenResponse.data

    const userResponse = await githubApi.get('/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })
    const githubUser = userSchema.parse(userResponse.data)
    console.log('🚀 ~ app.post ~ githubUser:', githubUser)

    // antes de salvar verificar se o usuário não existe
    // salvar usuário no BD

    // simula dados do usuário vindo do BD
    const user = {
      id: githubUser.id,
      login: githubUser.login,
      name: githubUser.name,
      avatarUrl: githubUser.avatar_url,
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: String(user.id), //subject = qual usuário pertence este token
        expiresIn: '1 day',
      },
    )

    return { token }
  })
}
