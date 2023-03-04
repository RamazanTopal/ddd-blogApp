import { Router } from 'express'
import CommentController from '../transportation/http/controllers/comment.controller'

export default class CommentRouter {
  public router: Router

  constructor(private commentController: CommentController) {
    this.router = Router()
  }

  getRoutes() {
    this.router.get('/', this.commentController.getComments.bind(this.commentController))

    this.router.post('/create', this.commentController.sendComment.bind(this.commentController))

    this.router.get('/:id', this.commentController.getComment.bind(this.commentController))

    this.router.delete('/:id', this.commentController.deleteComment.bind(this.commentController))

    this.router.put('/:id', this.commentController.updateComment.bind(this.commentController))

    return this.router
  }
}
