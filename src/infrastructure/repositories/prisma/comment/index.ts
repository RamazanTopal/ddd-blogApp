import { PrismaClient } from '@prisma/client'
import IComment from '../../../../domain/entities/comment.entity'

import ICommentRepository from '../../../../domain/repositories/comment.repository'

export default class PrismaCommentRepository implements ICommentRepository {
  constructor(private prisma: PrismaClient) {}

  async deleteOne(id: number): Promise<IComment | undefined> {
    return await this.prisma.comment.delete({
      where: {
        id,
      },
    })
  }

  async findMany(): Promise<IComment[]> {
    return await this.prisma.comment.findMany({ include: { user: true, post: true } })
  }

  async findUnique(id: number): Promise<IComment | undefined> {
    const comment = await this.prisma.comment.findFirst({
      where: {
        id,
      },
    })

    if (!comment) {
      return
    }

    return comment
  }

  async create({ message, userId, postId }): Promise<IComment | undefined> {
    return await this.prisma.comment.create({
      data: { message, userId, postId },
    })
  }

  async update({ id, message, userId, postId }): Promise<IComment | undefined> {
    return await this.prisma.comment.update({
      where: { id: Number(id) },
      data: { message, userId, postId },
    })
  }
}
