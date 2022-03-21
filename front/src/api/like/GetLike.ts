import { api } from "../../contexts/api";
import { ResLike } from "../../type/interfaces";

export const getLikes = (id: number) => {
  return api.get<{ is_like: boolean }>("/api/likes/" + id);
};
