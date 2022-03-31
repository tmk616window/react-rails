import { api } from "../contexts/api";
import { Task } from "../type/interfaces";

export const getTaskRanking = () => {
  return api.get<{ tasks: Task[] }>("/api/ranking");
};
