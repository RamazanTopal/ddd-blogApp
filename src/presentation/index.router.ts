import { Application } from 'express'
import UserRoute from './user.router'
import UserController from '../transportation/http/controllers/user.controller'

export interface RouterOptions {
  userController: UserController
}

const registerRoutes = (server: Application, opts: RouterOptions): void => {
  server.use('/users', new UserRoute(opts.userController).getRoutes())
}

export default registerRoutes
