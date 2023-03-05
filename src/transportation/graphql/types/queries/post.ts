import { extendType, nonNull, intArg } from 'nexus'
import { GraphqlResourceNotFoundError } from '../../errors/index'

export const posts = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('posts', {
      type: 'Post',
      async resolve(_parent, _args, ctx) {
        const { posts } = await ctx.postService.findMany()

        return posts
      },
    })
  },
})

export const post = extendType({
  type: 'Query',
  definition(t) {
    t.field('post', {
      type: 'Post',
      args: { id: nonNull(intArg()) },
      async resolve(_parent, { id }, ctx) {
        const post = await ctx.postService.findUnique(id)

        if (post) return post

        throw new GraphqlResourceNotFoundError('Post not found')
      },
    })
  },
})
