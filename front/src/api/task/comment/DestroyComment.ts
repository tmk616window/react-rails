import {api} from '../../common/client'

export const destroyComment = (id: number) =>  {
    return api.delete('/comments/' + id )}
