import { api } from "../contexts/api";
import axios from "axios";
import { Task } from "../type/interfaces";

export const getTaskRanking = () => {
  return api.get<{ tasks: Task[] }>("/api/ranking");
};
