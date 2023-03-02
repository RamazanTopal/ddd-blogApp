import { Application, json } from 'express'
import morgan from 'morgan'

import registerRoutes from '../../presentation/index.router'
import UserController from './controllers/user.controller'

export interface CreateServerOpts {
  userController: UserController
}

export function createHttpServer(app, opts: CreateServerOpts): Application {
  app.use(json())
  app.use(morgan('dev'))
  registerRoutes(app, {
    userController: opts.userController,
  })

  return app
}
