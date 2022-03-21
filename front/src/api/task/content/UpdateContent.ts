import { api } from "../../../contexts/api";
import { Content } from "../../../type/interfaces";

export const updateContent = (
  title: string,
  text: string,
  taskId: number | undefined,
  id: number
) => {
  return api.patch<{ content: Content }>("/api/contents/" + id, {
    title: title,
    text: text,
    task_id: taskId,
  });
};
