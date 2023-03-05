import { extendType, nonNull, intArg } from 'nexus'
import { GraphqlResourceNotFoundError } from '../../errors/index'

export const users = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      async resolve(_parent, _args, ctx) {
        const { users } = await ctx.userService.findMany()

        return users
      },
    })
  },
})

export const user = extendType({
  type: 'Query',
  definition(t) {
    t.field('user', {
      type: 'User',
      args: { id: nonNull(intArg()) },
      async resolve(_parent, { id }, ctx) {
        const user = await ctx.userService.findUnique(id)

        if (user) return user

        throw new GraphqlResourceNotFoundError('User not found')
      },
    })
  },
})
