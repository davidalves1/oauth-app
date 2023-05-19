import { FastifyInstance } from 'fastify'
import { readdirSync } from 'fs'

const PATH_FROM_ROOT = 'src/routes'
const BASE_PATH = './'

export function registerRoutes(app: FastifyInstance) {
  return new Promise<void>((resolve) => {
    const files = readdirSync(PATH_FROM_ROOT)

    const lastIndex = files.length - 1

    files.forEach(async (file, index) => {
      if (file.includes('index')) return

      const { default: moduleHandler } = await import(`${BASE_PATH}${file}`)

      app.register(moduleHandler)

      if (index === lastIndex) resolve()
    })
  })
}
