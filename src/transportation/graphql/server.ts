import { ApolloServer } from '@apollo/server'
import { unwrapResolverError } from '@apollo/server/errors'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'

import { ResourceNotFoundError, NotAuthorizedError } from '../http/errors/index'
import { Context } from './context'
import schema from './schema'

const isProduction = process.env.NODE_ENV === 'production'

export default function createGraphqlServer(): ApolloServer<Context> {
  return new ApolloServer<Context>({
    schema,
    introspection: true,
    plugins: isProduction ? [ApolloServerPluginLandingPageDisabled()] : [],
    formatError(formattedError, error) {
      const originalError = unwrapResolverError(error)

      if (originalError instanceof NotAuthorizedError) {
        return {
          message: 'Not authorized',
        }
      }

      if (originalError instanceof ResourceNotFoundError) {
        return {
          message: 'Resource not found',
        }
      }

      return formattedError
    },
  })
}
