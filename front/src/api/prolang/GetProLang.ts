import { api } from "../common/client";
import { ProlLanguage } from "../../type/interfaces";

export const getProLangs = (id: number) => {
  return api.get<{ prolangs: ProlLanguage[] }>("/prolongs/" + id);
};
