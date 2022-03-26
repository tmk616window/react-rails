import { Like } from "../../type/interfaces";
import { tokenApi } from "../../contexts/api";

export const createLike = (taskId: number, userId: any) => {
  return tokenApi().post<{ like: Like }>("/api/likes", {
    task_id: taskId,
    user_id: userId,
  });
};
