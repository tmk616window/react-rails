import { Task } from "../../type/interfaces/task";
import { api, tokenApi } from "../../contexts/api";

export const getTasks = () => {
  return tokenApi().get<{ tasks: Task[] }>("/api/tasks");
};
