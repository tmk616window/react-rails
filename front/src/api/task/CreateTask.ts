import { api } from "../../contexts/api";
import { Task } from "../../type/interfaces";

export const createTask = (data: FormData) => {
  return api.post<{ task: Task }>("/api/tasks", data);
};
