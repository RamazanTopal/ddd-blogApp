import { mutationField, inputObjectType, nonNull, intArg } from 'nexus'
import { GraphqlResourceNotFoundError } from '../errors'

export const createPostInput = inputObjectType({
  name: 'createPostInput',
  definition(t) {
    t.string('title'), t.string('content'), t.int('authorId')
  },
})

export const updatePostInput = inputObjectType({
  name: 'updatePostInput',
  definition(t) {
    t.string('title'), t.string('content'), t.boolean('published'), t.int('id')
  },
})

export const createPost = mutationField('createPost', {
  type: 'Post',
  args: {
    data: createPostInput,
  },
  async resolve(parent, { data }, context) {
    const post = await context.postService.create({ title: data?.title, content: data?.content, authorId: data?.authorId })

    if (post) return post

    throw new GraphqlResourceNotFoundError('Post is not found')
  },
})

export const updatePost = mutationField('updatePost', {
  type: 'Post',
  args: {
    data: updatePostInput,
  },
  async resolve(parent, { data }, context) {
    const post = await context.postService.update({ title: data?.title, content: data?.content, published: data?.published, id: data?.id })

    if (post) return post

    throw new GraphqlResourceNotFoundError('Post is not found')
  },
})

export const deletePost = mutationField('deletePost', {
  type: 'Post',
  args: {
    id: nonNull(intArg()),
  },
  async resolve(_parent, { id }, ctx) {
    const post = await ctx.postService.delete(id)

    if (post) return post

    throw new GraphqlResourceNotFoundError('Post is not found')
  },
})
