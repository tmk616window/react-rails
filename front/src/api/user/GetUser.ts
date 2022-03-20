import {api} from '../../contexts/api'
import {User} from '../../type/interfaces'

export const getUser = (id: number) => {
  return api.get<{user: User}>("/api/users/" + id)
}
