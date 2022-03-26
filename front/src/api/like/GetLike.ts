import { ResLike } from "../../type/interfaces";
import { tokenApi } from "../../contexts/api";

export const getLikes = (id: number) => {
  return tokenApi().get<{ current_user_like: number[] }>("/api/likes/" + id);
};
