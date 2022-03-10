import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie'


const env = 0

export const api: AxiosInstance = axios.create({
  baseURL: 'https://enjob.work/api/v1/',
  headers: {'Content-Type': 'application/json'},
  responseType: 'json',
});


export const client: AxiosInstance = axios.create({
    baseURL: 'https://enjob.work/api/v1/',
    headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':"*" },
    responseType: 'json',
  });

