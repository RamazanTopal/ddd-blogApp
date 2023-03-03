import { IPost } from '../../entities/index.entity'
import IPostRepository from '../../repositories/post.repository'

export default class PostService {
  constructor(private repo: IPostRepository) {}

  async delete(id: number): Promise<IPost | undefined> {
    const post = await this.repo.findUnique(id)

    if (!post) {
      throw new Error('Post not found')
    }

    return this.repo.deleteOne(id)
  }

  async findUnique(id: number): Promise<IPost | undefined> {
    return await this.repo.findUnique(id)
  }

  async findMany(): Promise<{ posts: IPost[] }> {
    const posts = await this.repo.findMany()

    return {
      posts,
    }
  }

  async create({ title, content, authorId }): Promise<IPost | undefined> {
    return await this.repo.create({
      title,
      content,
      authorId,
    })
  }

  async update({ id, title, content, authorId }): Promise<IPost | undefined> {
    return await this.repo.update({ id, title, content, authorId })
  }
}
