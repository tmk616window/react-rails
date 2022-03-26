import { ProlLanguage } from "../../type/interfaces";
import { api, tokenApi } from "../../contexts/api";

export const destroyProLanguage = (id: number) => {
  return tokenApi().delete<{ pro_Languages: ProlLanguage }>(
    "/api/pro_languages/" + id
  );
};
