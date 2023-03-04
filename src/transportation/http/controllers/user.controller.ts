import { Request, Response, NextFunction } from 'express'
import UserService from '../../../domain/services/user/user.service'

export default class UserController {
  constructor(private userService: UserService) {}

  async getUsers(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { users } = await this.userService.findMany()

      return res.json({ users })
    } catch (error) {
      next(error)
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = req.params.id
      const user = await this.userService.findUnique(Number(id))

      return res.json({ user })
    } catch (error) {
      next(error)
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = req.params.id
      const user = await this.userService.delete(Number(id))

      return res.json({ user })
    } catch (error) {
      next(error)
    }
  }

  async registerUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { name, email, phone, password } = req.body

      const user = await this.userService.register({
        name,
        email,
        phone,
        password,
      })

      return res.json({ user })
    } catch (error) {
      next(error)
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body

      const user = await this.userService.login({
        email,
        password,
      })

      return res.json({ user })
    } catch (error) {
      next(error)
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { name, email, phone } = req.body
      const { id } = req.params

      const user = await this.userService.update({
        id,
        name,
        email,
        phone,
      })

      return res.json({ user })
    } catch (error) {
      next(error)
    }
  }
}
