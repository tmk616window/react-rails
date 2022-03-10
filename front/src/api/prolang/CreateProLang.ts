import {api} from '../common/client'
import axios from 'axios'
import {ProLang} from '../../type/interfaces'

export const createProLang = (lange:string, id:number) =>  {
    return api.post<{prolong: ProLang}>('/prolongs' , 
    {
        lange: lange,
        task_id: id
    }
    )}
