import { PrismaClient } from '@prisma/client'
import IUser from '../../../../domain/entities/user.entity'

import IUserRepository from '../../../../domain/repositories/user.repository'

export default class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async deleteOne(id: number): Promise<IUser | undefined> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    })
  }

  async findMany(): Promise<IUser[]> {
    return await this.prisma.user.findMany({ include: { posts: true } })
  }

  async findUnique(id: number): Promise<IUser | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    })

    if (!user) {
      return
    }

    return user
  }

  async findOneByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      return
    }

    return user
  }

  async register({ name, phone, email, password }): Promise<IUser | undefined> {
    return await this.prisma.user.create({
      data: { name, phone, email, password },
    })
  }

  async update({ id, name, phone, email }): Promise<IUser | undefined> {
    return await this.prisma.user.update({
      where: { id: Number(id) },
      data: { name, phone, email },
    })
  }
}
