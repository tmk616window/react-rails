import {api} from '../../../contexts/api'
import {Comment} from '../../../type/interfaces'

export const destroyComment = (id: number) =>  {
  return api.delete<{comment: Comment}>('/api/comments/' + id )
}
