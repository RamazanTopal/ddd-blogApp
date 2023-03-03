import { Router } from 'express'
import PostController from '../transportation/http/controllers/post.controller'

export default class PostRouter {
  public router: Router

  constructor(private postController: PostController) {
    this.router = Router()
  }

  getRoutes() {
    this.router.get('/', this.postController.getPosts.bind(this.postController))

    this.router.post(
      '/create',
      this.postController.createPost.bind(this.postController)
    )

    this.router.get(
      '/:id',
      this.postController.getPost.bind(this.postController)
    )

    this.router.delete(
      '/:id',
      this.postController.deletePost.bind(this.postController)
    )

    this.router.put(
      '/:id',
      this.postController.updatePost.bind(this.postController)
    )

    return this.router
  }
}
