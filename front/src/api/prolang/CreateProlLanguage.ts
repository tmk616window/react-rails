import { api } from "../../contexts/api";
import { ProlLanguage } from "../../type/interfaces";

export const createProLanguage = (language: string, taskId: number) => {
  return api.post<{ pro_Language: ProlLanguage }>("/api/pro_languages", {
    language: language,
    task_id: taskId,
  });
};
