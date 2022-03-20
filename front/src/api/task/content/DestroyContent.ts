import {api} from '../../../contexts/api'
import {Content} from '../../../type/interfaces'

export const destroyContent = (id:number | undefined) =>  {
  return api.delete<{content: Content}>('/api/contents/' + id)
}
