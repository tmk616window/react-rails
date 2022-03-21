import { api } from "../../contexts/api";
import { Task } from "../../type/interfaces";

export const updateTask = (id: number | undefined, data: FormData) => {
  return api.patch<{ task: Task }>("/api/tasks/" + id, data);
};
