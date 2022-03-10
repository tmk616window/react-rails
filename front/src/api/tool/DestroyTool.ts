import {api} from '../common/client'
import {Tool} from '../../type/interfaces'

export const destroyTool = (id: number) =>  {
    return api.delete<{tool: Tool}>('/tools/' + id )}
