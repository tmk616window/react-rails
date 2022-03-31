import { api } from "../common/client";
import axios from "axios";

export const createTool = (tool: string, taskId: number) => {
  return api.post("/tools", {
    name: tool,
    task_id: taskId,
  });
};
