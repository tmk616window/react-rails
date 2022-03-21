import Axios from "axios";
import Cookies from "js-cookie";
import { parseCookies, setCookie } from "nookies";
import { NextPageContext } from "next";

const token = Cookies.get("token");
export const api = Axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
});

// cookie取得
const getCookie = (ctx?: NextPageContext) => {
  return parseCookies(ctx).token;
};

export const serverApi = Axios.create({
  baseURL: "http://nginx/",
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + getCookie(),
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
});
