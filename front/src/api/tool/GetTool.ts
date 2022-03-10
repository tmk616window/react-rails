import {api} from '../common/client'
import axios from 'axios'
import {Tool} from '../../type/interfaces'

export const getTools =  (id: number) => {
    return api.get<{tools: Tool[]}>("/tools/" + id)
  }
  