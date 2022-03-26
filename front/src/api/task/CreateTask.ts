import { Task } from "../../type/interfaces";
import { tokenApi } from "../../contexts/api";

export const createTask = (data: FormData) => {
  return tokenApi().post<{ task: Task }>("/api/tasks", data);
};
