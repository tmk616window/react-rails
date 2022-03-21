import { api } from "../common/client";
import { User } from "../../type/interfaces";

export const getUsers = () => {
  return api.get<{ user: User[] }>("/users");
};
