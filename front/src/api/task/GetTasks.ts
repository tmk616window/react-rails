import { Task } from "../../type/interfaces/task";
import { api } from "../../contexts/api";

export const getTasks = () => {
  return api.get<{ tasks: Task[] }>("/api/tasks");
};
