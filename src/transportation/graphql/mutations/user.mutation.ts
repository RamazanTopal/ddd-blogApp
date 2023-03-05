import { intArg, mutationField, nonNull, inputObjectType } from 'nexus'
import { GraphqlResourceNotFoundError } from '../errors'

export const RegisterUserInput = inputObjectType({
  name: 'RegisterUserInput',
  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.string('phone')
    t.nonNull.string('password')
  },
})

export const LoginUserInput = inputObjectType({
  name: 'LoginUserInput',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.string('password')
  },
})

export const UserUpdateInputType = inputObjectType({
  name: 'UserUpdateInputType',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.string('phone')
  },
})

export const deleteUser = mutationField('deleteUser', {
  type: 'User',
  args: {
    id: nonNull(intArg()),
  },
  async resolve(_parent, { id }, ctx) {
    const user = await ctx.userService.delete(id)

    if (user) return user

    throw new GraphqlResourceNotFoundError('User is not found')
  },
})

export const registerUser = mutationField('registerUser', {
  type: 'User',
  args: {
    data: RegisterUserInput,
  },
  async resolve(_parent, { data }, ctx) {
    const user = await ctx.userService.register({
      name: data?.name,
      phone: data?.phone,
      email: data?.email,
      password: data?.password,
    })

    if (user) return user

    throw new GraphqlResourceNotFoundError('User is not found')
  },
})

export const updateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    data: UserUpdateInputType,
  },
  async resolve(_parent, { data }, ctx) {
    const machine = await ctx.userService.update({
      id: data?.id,
      name: data?.name,
      phone: data?.phone,
      email: data?.email,
    })

    if (machine) return machine

    throw new GraphqlResourceNotFoundError('User is not found')
  },
})

export const loginUser = mutationField('loginUser', {
  type: 'User',
  args: {
    data: LoginUserInput,
  },
  async resolve(_parent, { data }, ctx) {
    const user = await ctx.userService.login({
      email: data?.email,
      password: data?.password,
    })

    if (user) return user

    throw new GraphqlResourceNotFoundError('User is not found')
  },
})
