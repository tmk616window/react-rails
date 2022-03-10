import {api} from '../common/client'
import {Task} from '../../type/interfaces'

export const getTask =  (id: any) => {
    return api.get<{task: Task}>("/tasks/" + id)
  }
