import {client} from './common/client'
import axios from 'axios' 
import {Task} from '../type/interfaces'

export const execTest = () => {
    return client.get<{tasks: Task[]}>("test")
  }
  