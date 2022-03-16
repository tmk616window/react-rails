import Axios from "axios";
import Cookies from "js-cookie"
import { parseCookies, setCookie } from 'nookies';


const token = Cookies.get('token')
const api = Axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':"*"
    },
    responseType: 'json'
});



export default api;
