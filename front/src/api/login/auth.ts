import {client} from "../common/client"
import Cookies from "js-cookie"
import axios from 'axios'
import { SignUpParams, SignInParams, currentUser,User, SignIn } from "../../type/interfaces"

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return axios.post<{data: SignIn}>("http://localhost:3000/api/user", params)
}

// サインイン（ログイン）
export const signIn = (params: SignInParams)  => {
  return axios.post<{data: SignIn}>("http://localhost:3000/api/session", params)
}

// サインイン（ゲストログイン）
export const gustSignIn = ()  => {
  return client.post<{data: SignIn}>("auth/sign_in", {email:"test1234@example.com", password:"test1234test1234"})
}

// サインアウト（ログアウト）
export const signOut = (params:any) => {
  return axios.delete<{success: boolean}>("https://enjob.work/api/v1/auth/sign_out", {headers: params})  
}

// 認証済みのユーザーを取得
export const getCurrentUser = (token:any, client:any, uid:any) => {
  if (!token || !client || !uid) return
  return axios.get<{currentUser: currentUser}>("https://enjob.work/api/v1/auth/sessions", {
    headers: {
      "access-token": token,
      "client": client,
      "uid": uid
    }
  })
}
