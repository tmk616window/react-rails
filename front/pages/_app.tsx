import '../styles/globals.css'
import '../src/components/Task/task.css'
import type { AppProps } from 'next/app'
import Navbar from '../src/components/Navbar'
import React, { useState, useEffect, createContext } from "react"
import { User } from "../src/type/interfaces"
import {getCurrentUser} from '../src/api/login/auth'
import {useRouter} from 'next/router'
import Register from './register'
import Login from './login'
import {execTest} from '../src/api/test'
import Cookies from "js-cookie"
import {getTasks} from '../src/api/task/GetTasks'
import {Task} from '../src/type/interfaces/task'
import { parseCookies, setCookie } from 'nookies';
import { NextPageContext } from 'next';
import Axios from 'axios'


export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>
})


const MyApp = ({ Component, pageProps }: AppProps, ctx: NextPageContext) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)

  const api = Axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token'),
        'Content-Type': 'application/json'
    }
});

  const handleGetCurrentUser = async () => {
    api.get('/api/session')
    .then( (response) => {
      const{data: getCurrentUser}: any = response
      console.log(getCurrentUser);
      setIsSignedIn(true)
      setCurrentUser(getCurrentUser)  
    })
    .catch( (error) => {
      console.log(error);
      setIsSignedIn(false)
      setCurrentUser(undefined)
      Cookies.set('token', '')
    })
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, []);

  const component =
    typeof pageProps === 'undefined' ? null : <Component {...pageProps} />;
  return component;
};

MyApp.getInitialProps = async (appContext: any) => {
  const cookies = parseCookies(appContext.ctx);

  if(cookies.token === '') {
    if (
      appContext.ctx.pathname !== '/' &&
      appContext.ctx.pathname !== '/login' &&
      appContext.ctx.pathname !== '/register' &&
      appContext.ctx.pathname !== '/_error'
    ) {
      appContext.ctx.res.statusCode = 302;
      appContext.ctx.res.setHeader('Location', '/login');
    }
  } else {
    if (
      appContext.ctx.pathname !== '/' &&
      appContext.ctx.pathname !== '/tasks' &&
      appContext.ctx.pathname !== '/profile' &&
      appContext.ctx.pathname !== '/_error'
    ) {
      appContext.ctx.res.statusCode = 302;
      appContext.ctx.res.setHeader('Location', '/');
    }
  }
  return {
    pageProps: {
      ...(appContext.Component.getInitialProps
        ? await appContext.Component.getInitialProps(appContext.ctx)
        : {}),
      pathname: appContext.ctx.pathname,
    },
  };
};

export default MyApp;
