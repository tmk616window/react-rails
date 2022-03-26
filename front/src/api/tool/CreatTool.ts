import { Tool } from "../../type/interfaces";
import Cookies from "js-cookie";
import { api, tokenApi } from "../../contexts/api";

export const createTool = (tool: string, taskId: number) => {
  return tokenApi().post<{ tool: Tool }>("/api/tools", {
    name: tool,
    task_id: taskId,
  });
};
