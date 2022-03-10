import {api} from '../../common/client'

export const getMessage =  (id: number) => {
    return api.get("/chat_messages/" + id)
  }
