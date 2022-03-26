import { Content } from "../../../type/interfaces";
import Cookies from "js-cookie";
import { tokenApi } from "../../../contexts/api";
const token = Cookies.get("_access_token");

export const createContent = (title: string, text: string, taskId: any) => {
  return tokenApi(String(token)).post<{ content: Content }>("/api/contents", {
    title: title,
    text: text,
    task_id: taskId,
  });
};
