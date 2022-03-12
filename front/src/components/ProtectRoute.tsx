import Router from "next/router";

export const ProtectRoute = ({ children }:any) => {
  if (false) {
    if (typeof window !== "undefined") {
      Router.push("/");
    }
  }
  return children;
};
