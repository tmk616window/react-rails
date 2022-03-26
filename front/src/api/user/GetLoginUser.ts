import axios, { AxiosInstance } from "axios";
import { User, Token } from "../../type/interfaces";

const loginApi = (token: Token) => {
  return axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    responseType: "json",
  });
};

export const getLoginUser = (token: Token) => {
  return loginApi(token).get<{ current_user: User }>("/api/session");
};
