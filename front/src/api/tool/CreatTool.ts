import {api} from '../../contexts/api'
import {Tool} from '../../type/interfaces'
export const createTool = (tool: string, taskId:number) =>  {
  return api.post<{tool: Tool}>('/api/tools' , 
    {
      name: tool,
      task_id: taskId
    }
)}
