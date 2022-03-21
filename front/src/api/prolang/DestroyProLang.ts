import { api } from "../../contexts/api";
import { ProlLanguage } from "../../type/interfaces";

export const destroyProLanguage = (id: number) => {
  return api.delete<{ pro_Languages: ProlLanguage }>(
    "/api/pro_languages/" + id
  );
};
