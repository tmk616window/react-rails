import { api } from "../../common/client";
import axios from "axios";
import { Content } from "../../../type/interfaces";

export const getContents = (id: number) => {
  return api.get<{ contents: Content[] }>("/contents/" + id);
};
