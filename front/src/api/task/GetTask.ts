import {api} from '../../contexts/api'
import {Task} from '../../type/interfaces'

export const getTask =  (id: any) => {
    return api.get<{task: Task}>("/api/tasks/" + id)
  }
