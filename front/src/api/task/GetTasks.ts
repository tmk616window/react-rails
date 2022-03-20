// import {api} from '../common/client'
import {Task} from '../../type/interfaces/task'
import axios from 'axios'
import {api} from '../../contexts/api'


export const getTasks = () => {
  return api.get<{tasks: Task[]}>("/api/tasks")
}