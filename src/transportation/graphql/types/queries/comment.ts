import { extendType, nonNull, intArg } from 'nexus'
import { GraphqlResourceNotFoundError } from '../../errors/index'

export const comment = extendType({
  type: 'Query',
  definition(t) {
    t.field('comment', {
      type: 'Comment',
      args: {
        id: nonNull(intArg()),
      },
      async resolve(parent, { id }, context) {
        const comment = await context.commentService.findUnique(id)

        if (comment) return comment

        throw new GraphqlResourceNotFoundError('Comment not found')
      },
    })
  },
})

export const comments = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('comments', {
      type: 'Comment',
      async resolve(parent, args, context) {
        const { comments } = await context.commentService.findMany()
        return comments
      },
    })
  },
})
