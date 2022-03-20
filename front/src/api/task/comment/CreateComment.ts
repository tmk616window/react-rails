import {api} from '../../../contexts/api'
import {Comment} from '../../../type/interfaces'

export const createComment = (text:string, taskId:number, userId:number | undefined) =>  {
  return api.post<{comment: Comment}>('/api/comments' , 
  {
    text: text,
    task_id: taskId,
    user_id: userId
  }
)}
