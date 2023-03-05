import { objectType } from 'nexus'
import { User } from './user'
import { Comment } from './comment'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nullable.int('id')
    t.nullable.string('title')
    t.nullable.string('content')
    t.nullable.boolean('published')
    t.nullable.int('authorId')
    t.nullable.field('author', {
      type: User,
      async resolve(root, args, ctx) {
        let author
        if (root.authorId) {
          author = await ctx.userService.findUnique(root.authorId)
          return author
        }

        throw new Error('Author cannot be found')
      },
    })
    t.nullable.list.field('comments', {
      type: Comment,
      async resolve(root, args, ctx, info) {
        const comments = await (await ctx.commentService.findManyByOptions({ where: { postId: root.id } })).comments

        return comments
      },
    })
  },
})
