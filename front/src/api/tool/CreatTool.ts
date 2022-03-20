import {api} from '../../contexts/api'
import {Tool} from '../../type/interfaces'
export const createTool = (tool: string, taskId:string | string[] | undefined) =>  {
  return api.post<{tool: Tool}>('/api/tools' , 
    {
      name: tool,
      task_id: taskId
    }
)}
