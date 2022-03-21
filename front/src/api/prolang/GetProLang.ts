import { api } from "../common/client";
import { ProLang } from "../../type/interfaces";

export const getProLangs = (id: number) => {
  return api.get<{ prolangs: ProLang[] }>("/prolongs/" + id);
};
