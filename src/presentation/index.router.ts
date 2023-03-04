import { Application } from 'express'
import UserRouter from './user.router'
import PostRouter from './post.router'
import CommentRouter from './comment.router'
import UserController from '../transportation/http/controllers/user.controller'
import PostController from '../transportation/http/controllers/post.controller'
import CommentController from '../transportation/http/controllers/comment.controller'

export interface RouterOptions {
  userController: UserController
  postController: PostController
  commentController: CommentController
}

const registerRoutes = (server: Application, opts: RouterOptions): void => {
  server.use('/users', new UserRouter(opts.userController).getRoutes())
  server.use('/posts', new PostRouter(opts.postController).getRoutes())
  server.use('/comments', new CommentRouter(opts.commentController).getRoutes())
}

export default registerRoutes
