import {api} from '../common/client'
import {User} from '../../type/interfaces'

export const getPrefectures = () => {
    return api.get("http://geoapi.heartrails.com/api/json?method=getPrefectures")
  }
