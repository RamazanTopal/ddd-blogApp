import express, { Application } from 'express'
import { createHttpServer } from '../transportation/http/server'
import createGraphqlServer from '../transportation/graphql/server'
import registerExpressMiddleware from '../transportation/graphql/express'
import createApplication from './createApplication'

async function startServer(): Promise<void> {
  const app: Application = express()

  const { userService, userController, postController, postService, commentController, commentService } = createApplication()
  const graphqlServer = createGraphqlServer()

  await registerExpressMiddleware(app, graphqlServer, userService, postService, commentService)

  createHttpServer(app, { userController, postController, commentController })

  app.listen(3000, () => {
    console.log('listening on http://localhost:3000')
  })
}

startServer().catch(err => {
  console.log(err)
})
