import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { json } from 'body-parser'
import cors from 'cors'
import { Application } from 'express'
import { Context } from './context'

import UserService from '../../domain/services/user/user.service'
import PostService from '../../domain/services/post/post.service'
import CommentService from '../../domain/services/comment/comment.service'

export default async function registerExpressMiddleware(
  app: Application,
  server: ApolloServer<Context>,
  userService: UserService,
  postService: PostService,
  commentService: CommentService
): Promise<void> {
  await server.start()
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware<Context>(server, {
      async context(reqCtx): Promise<Context> {
        return {
          userService,
          postService,
          commentService,
        }
      },
    })
  )
}
