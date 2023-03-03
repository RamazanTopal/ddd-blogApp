import { Request, Response, NextFunction } from 'express'
import PostService from '../../../domain/services/post/post.service'

export default class PostController {
  constructor(private postService: PostService) {}

  async getPosts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { posts } = await this.postService.findMany()

      return res.json({ posts })
    } catch (error) {
      next(error)
    }
  }

  async getPost(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = req.params.id
      const post = await this.postService.findUnique(Number(id))

      return res.json({ post })
    } catch (error) {
      next(error)
    }
  }

  async deletePost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const id = req.params.id
      const post = await this.postService.delete(Number(id))

      return res.json({ post })
    } catch (error) {
      next(error)
    }
  }

  async createPost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { title, content, authorId } = req.body

      const post = await this.postService.create({
        title,
        content,
        authorId,
      })

      return res.json({ post })
    } catch (error) {
      next(error)
    }
  }

  async updatePost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { title, content, authorId } = req.body
      const { id } = req.params

      const post = await this.postService.update({
        id,
        title,
        content,
        authorId,
      })

      return res.json({ post })
    } catch (error) {
      next(error)
    }
  }
}
