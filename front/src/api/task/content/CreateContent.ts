import {api} from '../../common/client'
import {Content} from '../../../type/interfaces'


export const createContent = (title: string, text:string, taskId:any) =>  {
    return api.post<{content: Content}>('/contents' , 
    {
        title: title,
        text: text,
        task_id: taskId
    }
    )}
