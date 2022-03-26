import Axios from "axios";
import Cookies from "js-cookie";
import { parseCookies, setCookie } from "nookies";
import { NextPageContext } from "next";
import { useContext } from "react";
import { AuthContext } from "../../pages/_app";
// cookie取得
import axios, { AxiosInstance } from "axios";

export const getCookie: any = (token: string) => {
  return Cookies.set("token", token);
};

export const api = Axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
});

export const tokenApi = () => {
  const token = Cookies.get("_access_token");
  return axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
