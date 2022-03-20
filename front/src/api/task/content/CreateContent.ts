import {api} from '../../../contexts/api'
import {Content} from '../../../type/interfaces'


export const createContent = (title: string, text:string, taskId:any) =>  {
  return api.post<{content: Content}>('/api/contents' , 
    {
			title: title,
			text: text,
			task_id: taskId
    }
)}
