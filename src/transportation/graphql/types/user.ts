import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nullable.int('id')
    t.nullable.string('name')
    t.nullable.string('email')
    t.nullable.string('phone')
  },
})
