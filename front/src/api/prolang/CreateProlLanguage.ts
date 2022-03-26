import { ProlLanguage } from "../../type/interfaces";
import { api, tokenApi } from "../../contexts/api";

export const createProLanguage = (language: string, taskId: number) => {
  return tokenApi().post<{ pro_Language: ProlLanguage }>("/api/pro_languages", {
    language: language,
    task_id: taskId,
  });
};
