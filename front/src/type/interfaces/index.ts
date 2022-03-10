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
    description: string
    logoImage?: {
      url: string
    }
    purl: string
    user_id: number
    prolongs: ProLang[]
    user: User
    tools: Tool[]
    likes: Like[]
    contents: Content[]
  }

  export interface Tool {
    id: number
    name: string
    task_id: number
  }

  export interface ProLang {
    id: number
    lange: string
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

export interface SignIn {
    token: string
    id: any
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
