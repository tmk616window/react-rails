import {api} from '../../contexts/api'
import {Like} from '../../type/interfaces'

export const deleteLike =  (id: number | undefined) => {
  return api.delete<{like: Like}>("/api/likes/" + id) 
}
