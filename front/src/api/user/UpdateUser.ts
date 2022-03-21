import { api } from "../../contexts/api";
import { User } from "../../type/interfaces";

export const updateUser = (id: number, data: FormData) => {
  return api.patch<{ user: User }>("/api/users/" + id, data);
};
