import {api} from '../../common/client'
import {Room} from '../../../type/interfaces'

export const createRoom= (currentid:number, userId:number ) => {
    return api.post<{room: Room}>("/rooms" , 
    {
        user: currentid,
        chat_id: userId,
    }
    )}
