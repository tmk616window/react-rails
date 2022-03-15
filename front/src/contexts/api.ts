import Axios from "axios";
import Cookies from "js-cookie"

const token = Cookies.get('token')

let urls = {
    test: `http://localhost:3334`,
    development: 'http://localhost/',
    production: 'https://your-production-url.com/'
}
const api = Axios.create({
    baseURL: 'http://localhost/',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':"*"
    }
});


export default api;
