import {api} from '../common/client'
import {Tool} from '../../type/interfaces'
export const createTool = (tool: string, id:number) =>  {
    return api.post<{tool: Tool}>('/tools' , 
    {
        name: tool,
        task_id: id
    }
    )}
