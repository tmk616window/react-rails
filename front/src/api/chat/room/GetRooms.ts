import {api} from '../../common/client'
import {Room} from '../../../type/interfaces'


export const getRooms =  () => {
    return api.get<{room: Room[]}>("/rooms/")
  }