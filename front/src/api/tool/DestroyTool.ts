import {api} from '../../contexts/api'
import {Tool} from '../../type/interfaces'

export const destroyTool = (taskId:number) =>  {
  return api.delete<{tool: Tool}>('/api/tools/' + taskId )
}
