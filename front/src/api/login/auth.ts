import { api, tokenApi } from "../../contexts/api";
import axios from "axios";
import {
  SignUpParams,
  SignInParams,
  currentUser,
  User,
  Token,
} from "../../type/interfaces";

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return axios.post<{ token: Token; errors: string }>(
    "http://localhost:8080/api/users",
    params
  );
};

// サインイン（ログイン）
export const signIn = (params: SignInParams) => {
  return api.post<{ token: Token }>("/api/session", params);
};

// サインイン（ゲストログイン）
export const gustSignIn = () => {
  return api.post<{ token: Token }>("/api/session", {
    email: "test1234@example.com",
    password: "test1234test1234",
  });
};

// サインアウト（ログアウト）
export const signOut = () => {
  return tokenApi().delete("/api/session");
};

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  return tokenApi().get<{ current_user: User }>("/api/session");
};
