import {api} from '../common/client'
import {User} from '../../type/interfaces'

export const getUser = (id: number) => {
    return api.get<{user: User}>("/users/" + id)
  }
  