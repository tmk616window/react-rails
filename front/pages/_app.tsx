import '../styles/globals.css'
import '../src/components/Task/task.css'
import type { AppProps } from 'next/app'
import Navbar from '../src/components/Navbar'
import React, { useState, useEffect, createContext } from "react"
import { User } from "../src/type/interfaces"
import Cookies from "js-cookie"
import { parseCookies, setCookie } from 'nookies';
import { NextPageContext } from 'next';
import Axios from 'axios'
import  { api }  from '../src/contexts/api'


export const AuthContext = createContext({} as {
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: any
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>
})


const MyApp = ({ Component, pageProps }: AppProps, ctx: NextPageContext) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)


  const handleGetCurrentUser = async () => {
    api.get('/api/session')
    .then( (response) => {
      const user: any = response.data
      setIsSignedIn(true)
      setCurrentUser(user)
    })
    .catch( (error) => {
      console.log("error", error);
      setIsSignedIn(false)
      setCurrentUser(undefined)
      Cookies.set('token', '')
    })
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, []);


  return (
    <>
      <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
        <Navbar/>

        <Component {...pageProps} />;
      </AuthContext.Provider>
    </>
  )
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
      const isServer = typeof window === 'undefined';
      if (isServer) {
        console.log('in ServerSide');
        appContext.ctx.res.statusCode = 302;
        appContext.ctx.res.setHeader('Location', '/login');
      } else {
        console.log('in ClientSide');
      }
    }
  } else {
    if (
      appContext.ctx.pathname !== '/' &&
      appContext.ctx.pathname !== '/task/new' &&
      appContext.ctx.pathname !== '/tasks' &&
      appContext.ctx.pathname !== '/task' &&
      appContext.ctx.pathname !== '/profile' &&
      appContext.ctx.pathname !== '/_error'
    ) {
      const isServer = typeof window === 'undefined';
      if (isServer) {
        console.log('in ServerSide');
        appContext.ctx.res.statusCode = 302;
        appContext.ctx.res.setHeader('Location', '/');
      } else {
        console.log('in ClientSide');
      }
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
