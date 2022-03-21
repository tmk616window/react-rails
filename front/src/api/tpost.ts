import { client } from "./common/client";

export const createPost = (data: FormData) => {
  return client.post("/tposts", data);
};
