import {api} from '../../common/client'
import {Room} from '../../../type/interfaces'


export const getRoom =  (id:number) => {
    return api.get<{room: Room}>("/rooms/" + id)
  }