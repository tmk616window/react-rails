import {api} from '../common/client'
import axios from 'axios'

export const destroyProLang = (id: number) =>  {
    return api.delete<{prolong: any}>('/prolongs/' + id )}
