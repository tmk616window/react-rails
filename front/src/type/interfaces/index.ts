// サインアップ
export interface SignUpParams {
  token: string
  id: number
  }
  
  // サインイン
  export interface SignInParams {
    email: string
    password: string
    user: User
    data: any
  }
  
  export interface currentUser {
    user: User
    isLogin: boolean
  }
  

  // ユーザー
  export interface User {
    id: number
    uid: string
    email: string
    name: string
    image?: {
      url: string
    }
    details: string
    live:string
    age: number
  }
  

  export interface Task {
    id: number
    title: string
    details: string
    logoImage?: {
      url: string
    }
    url: string
    user_id: number
    pro_languages: ProlLanguage[]
    user: User
    tools: Tool[]
    likes: Like[]
    contents: Content[]
    comments: Comment[]
  }

  export interface Tool {
    id: number
    name: string
    task_id: number
  }

  export interface ProlLanguage {
    id: number
    language: string
    task_id: number
  }

  export interface Comment{
    id: number,
    text: string,
    user: User,
    task_id: number,
    user_id: number,
  }

  export interface Content{
    id?: number
    title: string,
    text: string,
    task_id?: number,
  }

export interface Token {
    token: string
}

export interface Like {
  id: number
  task_id: number
  user_id: number
}

export interface Room {
  id: number
  user: any
  chat_id: number
}

export interface Message {
  id: number
  text:string
  message_id: number
  chat_id: number
  user_id:number
  user: User
}
