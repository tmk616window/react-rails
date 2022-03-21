import { api } from "../../contexts/api";
import { Like } from "../../type/interfaces";

export const createLike = (taskId: number, userId: any) => {
  return api.post<{ like: Like }>("/api/likes", {
    task_id: taskId,
    user_id: userId,
  });
};
