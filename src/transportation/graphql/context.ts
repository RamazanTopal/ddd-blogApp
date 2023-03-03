import { BaseContext } from '@apollo/server'

import UserService from '../../domain/services/user/user.service'
import PostService from '../../domain/services/post/post.service'

export interface Context extends BaseContext {
  userService: UserService
  postService: PostService
}
