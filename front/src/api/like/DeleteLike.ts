import {api} from '../common/client'
import {Task} from '../../type/interfaces/task'

export const deleteLike =  (id: number) => {
    return api.delete("/likes/" + id)
  }
