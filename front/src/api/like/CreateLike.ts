import {api} from '../common/client'

export const createLike =  (taskId: number, userId:any) => {
    return api.post("/likes" , 
    {
        // task_id: taskId,
        // user_id: userId,
        task_id: taskId,
        user_id: userId,

    }
    )}
