import { PrismaClient } from '@prisma/client'
import UserController from '../transportation/http/controllers/user.controller'
import UserService from '../domain/services/user/user.service'
import PrismaUserRepository from '../infrastructure/repositories/prisma/user/index'
import PostController from '../transportation/http/controllers/post.controller'
import PostService from '../domain/services/post/post.service'
import PrismaPostRepository from '../infrastructure/repositories/prisma/post/index'
import CommentController from '../transportation/http/controllers/comment.controller'
import CommentService from '../domain/services/comment/comment.service'
import PrismaCommentRepository from '../infrastructure/repositories/prisma/comment/index'

export default function createApplication() {
  const prisma = new PrismaClient()
  const prismaUserRepository = new PrismaUserRepository(prisma)
  const userService = new UserService(prismaUserRepository)
  const userController = new UserController(userService)

  const prismaPostRepository = new PrismaPostRepository(prisma)
  const postService = new PostService(prismaPostRepository)
  const postController = new PostController(postService)

  const prismaCommentRepository = new PrismaCommentRepository(prisma)
  const commentService = new CommentService(prismaCommentRepository)
  const commentController = new CommentController(commentService)

  return {
    userController,
    userService,
    postController,
    postService,
    commentController,
    commentService,
  }
}
