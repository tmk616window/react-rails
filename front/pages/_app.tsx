import "../styles/globals.css";
import "../src/components/Task/task.css";
import type { AppProps } from "next/app";
import Navbar from "../src/components/Navbar";
import React, { useState, useEffect, createContext } from "react";
import { User } from "../src/type/interfaces";
import Cookies from "js-cookie";
import { parseCookies, setCookie } from "nookies";
import { NextPageContext } from "next";
import Axios from "axios";
import { api } from "../src/contexts/api";
import { useRouter } from "next/router";
import { signIn, gustSignIn } from "../src/api/login/auth";
import { getCurrentUser } from "../src/api/login/auth";

export const AuthContext = createContext(
  {} as {
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  }
);

const MyApp = ({ Component, pageProps }: AppProps, ctx: NextPageContext) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const router = useRouter();
  const handleGetCurrentUser = async () => {
    try {
      const user = (await getCurrentUser()).data.current_user;
      setIsSignedIn(true);
      setCurrentUser(user);
      // const _access_token = Cookies.get("_access_token");
      // // Cookies.set("token", String(_access_token));
    } catch (error) {
      console.log(error);
      setIsSignedIn(false);
      setCurrentUser(undefined);
      Cookies.set("_access_token", "");
    }
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{ isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}
      >
        <Navbar />
        <Component {...pageProps} />;
      </AuthContext.Provider>
    </>
  );
};

MyApp.getInitialProps = async (appContext: any) => {
  const cookies = parseCookies(appContext.ctx);

  if (cookies._access_token === "") {
    if (
      appContext.ctx.pathname !== "/" &&
      appContext.ctx.pathname !== "/login" &&
      appContext.ctx.pathname !== "/register" &&
      appContext.ctx.pathname !== "/_error"
    ) {
      const isServer = typeof window === "undefined";
      if (isServer) {
        console.log("in ServerSide");
        appContext.ctx.res.statusCode = 302;
        appContext.ctx.res.setHeader("Location", "/login");
      } else {
        console.log("in ClientSide");
      }
    }
  } else {
    if (
      appContext.ctx.pathname !== "/" &&
      appContext.ctx.pathname !== "/task/new" &&
      appContext.ctx.pathname !== "/tasks" &&
      appContext.ctx.pathname !== "/task" &&
      appContext.ctx.pathname !== "/profile" &&
      appContext.ctx.pathname !== "/_error"
    ) {
      const isServer = typeof window === "undefined";
      if (isServer) {
        console.log("in ServerSide");
        appContext.ctx.res.statusCode = 302;
        appContext.ctx.res.setHeader("Location", "/");
      } else {
        console.log("in ClientSide");
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
