import { Router } from 'express'
import UserController from '../transportation/http/controllers/user.controller'

export default class UserRouter {
  public router: Router

  constructor(private userController: UserController) {
    this.router = Router()
  }

  getRoutes() {
    this.router.get('/', this.userController.getUsers.bind(this.userController))

    this.router.post(
      '/register',
      this.userController.registerUser.bind(this.userController)
    )

    this.router.post(
      '/login',
      this.userController.loginUser.bind(this.userController)
    )

    this.router.get(
      '/:id',
      this.userController.getUser.bind(this.userController)
    )

    this.router.delete(
      '/:id',
      this.userController.deleteUser.bind(this.userController)
    )

    this.router.put(
      '/:id',
      this.userController.updateUser.bind(this.userController)
    )

    return this.router
  }
}
