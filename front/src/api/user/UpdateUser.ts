import { User } from "../../type/interfaces";
import { tokenApi } from "../../contexts/api";

export const updateUser = (id: number, data: FormData) => {
  return tokenApi().patch<{ user: User }>("/api/users/" + id, data);
};
