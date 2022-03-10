import {api} from '../common/client'

export const getUserMessage =  (id: number) => {
    return api.get("/posts/" + id)
  }
