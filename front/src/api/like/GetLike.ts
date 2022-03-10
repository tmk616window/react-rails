import {api} from '../common/client'
import {Task} from '../../type/interfaces/task'

export const getLike =  (id: number) => {
    return api.get("/likes/" + id)
  }
