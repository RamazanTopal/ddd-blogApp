import { BaseContext } from '@apollo/server'

import UserService from '../../domain/services/user/user.service'
import PostService from '../../domain/services/post/post.service'
import CommentService from '../../domain/services/comment/comment.service'

export interface Context extends BaseContext {
  userService: UserService
  postService: PostService
  commentService: CommentService
}
