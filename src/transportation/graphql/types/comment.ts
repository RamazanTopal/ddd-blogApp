import { objectType } from 'nexus'
import { User } from './user'
import { Post } from './post'
export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nullable.int('id')
    t.nullable.string('message')
    t.nullable.int('postId')
    t.nullable.int('userId')
    t.nullable.int('commentParentId')
    t.nullable.field('user', {
      type: User,
      async resolve(root, args, ctx) {
        let user
        if (root.userId) {
          user = await ctx.userService.findUnique(root.userId)
          return user
        }

        throw new Error('User cannot be found')
      },
    })
    t.nullable.field('post', {
      type: Post,
      async resolve(root, args, ctx) {
        let post
        if (root.postId) {
          post = await ctx.postService.findUnique(root.postId)
          return post
        }

        throw new Error('Post cannot be found')
      },
    })
  },
})
