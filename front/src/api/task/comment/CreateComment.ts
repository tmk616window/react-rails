import {api} from '../../common/client'

export const createComment = (text:string, taskId:number, userId:number) =>  {
    return api.post('/comments' , 
    {
        text: text,
        task_id: taskId,
        user_id: userId
    }
    )}
