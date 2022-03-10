import {api} from '../../common/client'
import {Content} from '../../../type/interfaces'

export const updateContent = (title: string, text:string, taskId:number, id:number) =>  {
    return api.patch<{content: Content}>('/contents/' + id,
    {
        title: title,
        text: text,
        task_id: taskId,
    }
    )}
