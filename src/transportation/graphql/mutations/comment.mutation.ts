import { mutationField, inputObjectType, nonNull, intArg } from 'nexus'
import { GraphqlResourceNotFoundError } from '../errors'

export const createCommentInput = inputObjectType({
  name: 'createCommentInput',
  definition(t) {
    t.string('message'), t.int('postId'), t.int('userId'), t.int('commentParentId')
  },
})

export const updateCommentInput = inputObjectType({
  name: 'updateCommentInput',
  definition(t) {
    t.string('message'), t.int('id')
  },
})

export const createComment = mutationField('createComment', {
  type: 'Comment',
  args: {
    data: createCommentInput,
  },
  async resolve(parent, { data }, context) {
    const post = await context.commentService.createComment({
      message: data?.message,
      postId: data?.postId,
      userId: data?.userId,
      commentParentId: data?.commentParentId,
    })

    if (post) return post

    throw new GraphqlResourceNotFoundError('Comment is not found')
  },
})

export const updateComment = mutationField('updateComment', {
  type: 'Comment',
  args: {
    data: updateCommentInput,
  },
  async resolve(parent, { data }, context) {
    const comment = await context.commentService.update({ message: data?.message, id: data?.id })

    if (comment) return comment

    throw new GraphqlResourceNotFoundError('Comment is not found')
  },
})

export const deleteComment = mutationField('deleteComment', {
  type: 'Comment',
  args: {
    id: nonNull(intArg()),
  },
  async resolve(_parent, { id }, ctx) {
    const comment = await ctx.commentService.delete(id)

    if (comment) return comment

    throw new GraphqlResourceNotFoundError('Comment is not found')
  },
})
