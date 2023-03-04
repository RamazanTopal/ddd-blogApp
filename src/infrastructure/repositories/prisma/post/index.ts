import { PrismaClient } from '@prisma/client'
import IPost from '../../../../domain/entities/post.entity'

import IPostRepository from '../../../../domain/repositories/post.repository'

export default class PrismaPostRepository implements IPostRepository {
  constructor(private prisma: PrismaClient) {}

  async deleteOne(id: number): Promise<IPost | undefined> {
    return await this.prisma.post.delete({
      where: {
        id,
      },
    })
  }

  async findMany(): Promise<IPost[]> {
    return await this.prisma.post.findMany({ include: { comments: true } })
  }

  async findUnique(id: number): Promise<IPost | undefined> {
    const post = await this.prisma.post.findFirst({
      where: {
        id,
      },
    })

    if (!post) {
      return
    }

    return post
  }

  async create({ title, content, authorId }): Promise<IPost | undefined> {
    return await this.prisma.post.create({
      data: { title, content, authorId },
    })
  }

  async update({ id, title, content, authorId }): Promise<IPost | undefined> {
    return await this.prisma.post.update({
      where: { id: Number(id) },
      data: { title, content, authorId },
    })
  }
}
