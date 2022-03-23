import Axios from "axios";
import Cookies from "js-cookie";
import { parseCookies, setCookie } from "nookies";
import { NextPageContext } from "next";

// cookie取得
export const getCookie: any = (token: string) => {
  return Cookies.set("token", token);
};

// const tokenApi = Cookies.get("token");
export const api = Axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + Cookies.get("token"),
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
});

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
