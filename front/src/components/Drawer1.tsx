import * as React from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer
} from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu"
import Link from 'next/link'
import Cookies from 'js-cookie'
import  { useContext, useEffect } from "react"
import { AuthContext } from "../../pages/_app"

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const SwipeableTemporaryDrawer = ({handleSignOut}: any) => {
  const {currentUser} = useContext(AuthContext)
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const [state, setState] = React.useState({
    right: false,
  });

  const signInMenu = [
    {
      title: "トップ",
      href: "/"
    },
    {
      title: "新規登録",
      href: "/register"
    },
    {
      title: "ログイン",
      href: "/login"
    },
    {
      title: "一覧",
      href: "/tasks"
    },
  ]
  
  const signOutMenu = [
    {
      title: "トップ",
      href: "/"
    },
    {
      title: "一覧",
      href: "/tasks"
    },
    {
      title: "投稿",
      href: "/task/new"
    },
    {
      title: "プロフィール",
      href: { pathname: '/profile', query: { id: currentUser?.id } }
    },
  ]
  

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => {
    


    return(

    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      {
        (() => {
          if (isSignedIn) {
            return ( 
              <List>
              {signOutMenu.map((text, index) => (
                <Link href={text.href}>
                  <ListItem button key={index}>
                    <ListItemText primary={text.title} />
                  </ListItem>
                </Link>
              ))}
              <ListItem button onClick={handleSignOut}>
                <ListItemText primary={"ログアウト"} />
              </ListItem>
            </List>  
             )
          } else {
             return( 
              <List>
              {signInMenu.map((text, index) => (
                <Link href={text.href}>
                  <ListItem button key={index}>
                    <ListItemText primary={text.title} />
                  </ListItem>
                </Link>
              ))}
            </List>      
             )
          }
        })()
      }




    </Box>
    )
  };

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon color="inherit"/></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
          
        </React.Fragment>
      ))}
    </div>
  );
}

export default SwipeableTemporaryDrawer