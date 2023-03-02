import express, { Application } from 'express'
import { PrismaClient } from '@prisma/client'
import registerRoutes from '../presentation/index.router'
import UserController from '../transportation/http/controllers/user.controller'
import UserService from '../domain/services/user/user.service'
import PrismaUserRepository from '../infrastructure/repositories/user/prisma'
import { createHttpServer } from '../transportation/http/server'
import createGraphqlServer from '../transportation/graphql/server'
import registerExpressMiddleware from '../transportation/graphql/express'

async function startServer(): Promise<void> {
  const prisma = new PrismaClient()
  const prismaUserRepository = new PrismaUserRepository(prisma)
  const userService = new UserService(prismaUserRepository)
  const userController = new UserController(userService)

  const app: Application = express()

  const graphqlServer = createGraphqlServer()

  await registerExpressMiddleware(app, graphqlServer, userService)

  createHttpServer(app, { userController })

  app.listen(3000, () => {
    console.log('listening on http://localhost:3000')
  })
}

startServer().catch(err => {
  console.log(err)
})
