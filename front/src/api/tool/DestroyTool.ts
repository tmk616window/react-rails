import { Tool } from "../../type/interfaces";
import { api, tokenApi } from "../../contexts/api";

export const destroyTool = (taskId: number) => {
  return tokenApi().delete<{ tool: Tool }>("/api/tools/" + taskId);
};
