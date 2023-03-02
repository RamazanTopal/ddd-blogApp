import { BaseContext } from '@apollo/server'

import UserService from '../../domain/services/user/user.service'

export interface Context extends BaseContext {
  userService: UserService
}
