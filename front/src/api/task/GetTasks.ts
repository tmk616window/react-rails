import { Task } from "../../type/interfaces/task";
import { api, tokenApi } from "../../contexts/api";
import axios, { AxiosInstance } from "axios";
import { User, Token } from "../../type/interfaces";
import Cookies from "js-cookie";
const token = Cookies.get("_access_token");

export const getTasks = () => {
  return tokenApi(String(token))
    .get<{ tasks: Task[] }>("/api/tasks")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
