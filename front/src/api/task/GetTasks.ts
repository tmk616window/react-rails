import { Task } from "../../type/interfaces/task";
import { api } from "../../contexts/api";

import axios, { AxiosInstance } from "axios";
import { User, Token } from "../../type/interfaces";

export const getTasks = () => {
  return api.get<{ tasks: Task[] }>("/api/tasks");
};
