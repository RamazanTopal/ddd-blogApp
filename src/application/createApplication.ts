import { PrismaClient } from '@prisma/client'
import UserController from '../transportation/http/controllers/user.controller'
import UserService from '../domain/services/user/user.service'
import PrismaUserRepository from '../infrastructure/repositories/prisma/user/index'
import PostController from '../transportation/http/controllers/post.controller'
import PostService from '../domain/services/post/post.service'
import PrismaPostRepository from '../infrastructure/repositories/prisma/post/index'

export default function createApplication() {
  const prisma = new PrismaClient()
  const prismaUserRepository = new PrismaUserRepository(prisma)
  const userService = new UserService(prismaUserRepository)
  const userController = new UserController(userService)

  const prismaPostRepository = new PrismaPostRepository(prisma)
  const postService = new PostService(prismaPostRepository)
  const postController = new PostController(postService)

  return {
    userController,
    userService,
    postController,
    postService,
  }
}
