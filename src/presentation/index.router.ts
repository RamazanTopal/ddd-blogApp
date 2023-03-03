import { Application } from 'express'
import UserRouter from './user.router'
import PostRouter from './post.router'
import UserController from '../transportation/http/controllers/user.controller'
import PostController from '../transportation/http/controllers/post.controller'

export interface RouterOptions {
  userController: UserController
  postController: PostController
}

const registerRoutes = (server: Application, opts: RouterOptions): void => {
  server.use('/users', new UserRouter(opts.userController).getRoutes())
  server.use('/posts', new PostRouter(opts.postController).getRoutes())
}

export default registerRoutes
