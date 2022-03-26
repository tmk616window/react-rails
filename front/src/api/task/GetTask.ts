import { Task } from "../../type/interfaces";
import Cookies from "js-cookie";
import { api, tokenApi } from "../../contexts/api";
const token = Cookies.get("_access_token");

export const getTask = (id: any) => {
  return tokenApi().get<{ task: Task }>("/api/tasks/" + id);
};
