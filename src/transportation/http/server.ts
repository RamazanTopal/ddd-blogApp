import { Application, json } from 'express'
import morgan from 'morgan'

import registerRoutes from '../../presentation/index.router'
import UserController from './controllers/user.controller'
import PostController from './controllers/post.controller'
import CommentController from './controllers/comment.controller'

export interface CreateServerOpts {
  userController: UserController
  postController: PostController
  commentController: CommentController
}

export function createHttpServer(app, opts: CreateServerOpts): Application {
  app.use(json())
  app.use(morgan('dev'))
  registerRoutes(app, {
    userController: opts.userController,
    postController: opts.postController,
    commentController: opts.commentController,
  })

  return app
}
