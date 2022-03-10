import {api} from '../common/client'
import {Task} from '../../type/interfaces/task'
import axios from 'axios'

export const getTasks =  () => {
    return axios.get<{tasks: Task[]}>("https://enjob.work//api/v1/tasks")
  }
  