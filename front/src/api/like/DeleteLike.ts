import { api } from "../../contexts/api";
import { Like } from "../../type/interfaces";
import { tokenApi } from "../../contexts/api";

export const deleteLike = (id: number | undefined) => {
  return tokenApi().delete<{ like: Like }>("/api/likes/" + id);
};
