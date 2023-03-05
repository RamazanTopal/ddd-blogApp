import { Request, Response, NextFunction } from 'express'
import CommentService from '../../../domain/services/comment/comment.service'

export default class CommentController {
  constructor(private commentService: CommentService) {}

  async getComments(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { comments } = await this.commentService.findMany()

      return res.json({ comments })
    } catch (error) {
      next(error)
    }
  }

  async getComment(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = req.params.id
      const comment = await this.commentService.findUnique(Number(id))

      return res.json({ comment })
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = req.params.id
      const comment = await this.commentService.delete(Number(id))

      return res.json({ comment })
    } catch (error) {
      next(error)
    }
  }

  async sendComment(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { message, postId, userId, commentParentId } = req.body

      const comment = await this.commentService.createComment({
        message,
        postId,
        userId,
        commentParentId,
      })

      return res.json({ comment })
    } catch (error) {
      next(error)
    }
  }

  async updateComment(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { message } = req.body
      const { id } = req.params

      const comment = await this.commentService.update({
        id,
        message,
      })

      return res.json({ comment })
    } catch (error) {
      next(error)
    }
  }
}
