import { IComment } from '../../entities/index.entity'
import ICommentRepository, { ComentFindAllOptions } from '../../repositories/comment.repository'

export default class CommentService {
  constructor(private repo: ICommentRepository) {}

  async delete(id: number): Promise<IComment | undefined> {
    const comment = await this.repo.findUnique(id)

    if (!comment) {
      throw new Error('Comment not found')
    }

    return await this.repo.deleteOne(id)
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

  async findManyByOptions(opts: ComentFindAllOptions): Promise<{ comments: IComment[] }> {
    const comments = await this.repo.findManyByOptions(opts)

    return {
      comments,
    }
  }

  async createComment({ message, postId, userId, commentParentId }): Promise<IComment | undefined> {
    return await this.repo.create({
      message,
      postId,
      userId,
      commentParentId,
    })
  }

  async update({ id, message }): Promise<IComment | undefined> {
    return await this.repo.update({ id, message })
  }
}
