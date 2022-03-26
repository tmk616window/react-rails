import { User } from "../../type/interfaces";
import { tokenApi } from "../../contexts/api";

export const getUser = (id: number) => {
  return tokenApi().get<{ user: User }>("/api/users/" + id);
};
