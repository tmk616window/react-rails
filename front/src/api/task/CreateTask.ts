import {api} from '../common/client'
import {Task} from '../../type/interfaces'

export const createTask = (data:FormData) =>  {
    return api.post<{task: Task}>('/tasks' , data)}
