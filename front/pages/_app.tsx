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

export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>
})


function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const _access_token = Cookies.get("_access_token")
  const _client = Cookies.get("_client")
  const _uid = Cookies.get("_uid")



  const skipAuthPaths = [
    '/login',
    '/register',
    '/top'
  ]

  const AuthPaths = [
    '/login',
    '/register',
    '/top'
  ]

  const authPath = async () => {

  }


  const isPermitted = isSignedIn || skipAuthPaths.includes(router.asPath)

  // const handleGetCurrentUser = async () => {
    
  //   try {
  //     // const _access_token = Cookies.get("_access_token")
  //     // const _client = Cookies.get("_client")
  //     // const _uid = Cookies.get("_uid")
  //     const _access_token = localStorage.getItem("_access_token")
  //     const _client = localStorage.getItem("_client")
  //     const _uid = localStorage.getItem("_uid")
      

  //     console.log(_access_token,_client, _uid)
  //     const res = await getCurrentUser(_access_token, _client, _uid)
  //     console.log(res?.data.currentUser.isLogin)

  //     if (res?.data.currentUser.isLogin === true) {
  //       setIsSignedIn(true)
  //       setCurrentUser(res?.data.currentUser.user)

  //       console.log(res?.data.currentUser)
  //     } else {
  //       console.log("No current user")
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  //   setLoading(false)

  // }

  // useEffect(() => {
  //   execTest()
  //   console.log()
  //   handleGetCurrentUser()
  // }, [setCurrentUser])










  const handleGetCurrentUser = async () => {
    
    try {
      const _access_token = Cookies.get("_access_token")
      


      if (_access_token) {
        setIsSignedIn(true)
        console.log("current user")
      } else {
        setIsSignedIn(false)
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)

  }

  useEffect(() => {
    handleGetCurrentUser()
    console.log("isSignedIn", isSignedIn)
  }, [])




  const Private = ({ children }: any) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        return router.replace('/register') 
      }
    } else {
      return <></>
    }
  }



  return (
    <div className={"app"}>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
      <Navbar/>

      {/* { isPermitted
            ? <Component {...pageProps} />
            : <div>unauthorized<br/><br/><br/><br/><br/><br/><br/><br/><div>dwxswcdwcwqdw</div></div>
        } */}

{/* { isSignedIn && (
                    <Component {...pageProps} />
                )}
{ isSignedIn == false  && (
                    <div>unauthorized<br/><br/><br/><br/><br/><br/><br/><br/><div>dwxswcdwcwqdw</div></div>
                )} */}


            <Component {...pageProps} />


            <br/><br/><br/><br/><br/><br/><br/><br/>


      { isSignedIn
            ? <div>a{isSignedIn}</div>
            : <div>b{isSignedIn}</div>
        }


            
      </AuthContext.Provider>
    </div>
  )
}
export default MyApp
