import {api} from '../../common/client'
import axios from 'axios'
import {Comment} from '../../../type/interfaces'

export const getComments =  (id: number) => {
    return api.get<{comments: Comment[]}>("/comments/" + id)
  }