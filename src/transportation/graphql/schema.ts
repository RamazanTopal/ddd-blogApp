import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './types'
import * as mutations from './mutations'

const schema = makeSchema({
  types: { types, mutations },
  outputs: {
    typegen: join(__dirname, 'nexus-typegen.ts'),
    schema: join(__dirname, 'schema.graphql'),
  },
  contextType: {
    module: require.resolve('./context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

export default schema
