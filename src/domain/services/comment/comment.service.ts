import { IComment } from '../../entities/index.entity'
import ICommentRepository from '../../repositories/comment.repository'

export default class CommentService {
  constructor(private repo: ICommentRepository) {}

  async delete(id: number): Promise<IComment | undefined> {
    const comment = await this.repo.findUnique(id)

    if (!comment) {
      throw new Error('Comment not found')
    }

    return this.repo.deleteOne(id)
  }

  async findUnique(id: number): Promise<IComment | undefined> {
    return await this.repo.findUnique(id)
  }

  async findMany(): Promise<{ comments: IComment[] }> {
    const comments = await this.repo.findMany()

    return {
      comments,
    }
  }

  async sendComment({ message, postId, userId }): Promise<IComment | undefined> {
    return await this.repo.create({
      message,
      postId,
      userId,
    })
  }

  async update({ id, message, postId, userId }): Promise<IComment | undefined> {
    return await this.repo.update({ id, message, postId, userId })
  }
}
