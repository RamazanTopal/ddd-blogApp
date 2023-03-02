import { IUser } from '../../entities/index.entity'
import IUserRepository from '../../repositories/user.repository'
import {
  verifyPassword,
  hashPassword,
} from '../../../application/utils/password'

export default class UserService {
  constructor(private repo: IUserRepository) {}

  async delete(id: number): Promise<IUser | undefined> {
    const user = await this.repo.findUnique(id)

    if (!user) {
      throw new Error('User not found')
    }

    return this.repo.deleteOne(id)
  }

  async findUnique(id: number): Promise<IUser | undefined> {
    return await this.repo.findUnique(id)
  }

  async findMany(): Promise<{ users: IUser[] }> {
    const users = await this.repo.findMany()

    return {
      users,
    }
  }

  async register({
    name,

    email,
    phone,
    password,
  }): Promise<IUser | undefined> {
    const hashedPassword = await hashPassword(password)

    return await this.repo.register({
      name,

      email,
      phone,
      password: hashedPassword,
    })
  }

  async update({
    id,
    name,

    email,
    phone,
  }): Promise<IUser | undefined> {
    return await this.repo.update({ id, name, email, phone })
  }

  async findOneByEmail(email: string): Promise<IUser | undefined> {
    return await this.repo.findOneByEmail(email)
  }

  async login({ email, password }): Promise<any> {
    const user = await this.findOneByEmail(email)

    if (!user) {
      throw new Error('User not exist')
    }

    const isMatchedPassword = await verifyPassword(password, user.password)

    if (!isMatchedPassword) {
      throw new Error("User's password isn't matched")
    }

    return user
  }
}
