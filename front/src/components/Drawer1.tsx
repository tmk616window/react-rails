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

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const id = Cookies.get("id")


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
  }
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
    href: { pathname: '/profile', query: { id: id } }
  },
]



const SwipeableTemporaryDrawer = ({handleSignOut}: any) => {
  const _access_token = Cookies.get("_access_token")
  const _client = Cookies.get("_client")
  const _uid = Cookies.get("_uid")
  const id = Cookies.get("id")



  const [state, setState] = React.useState({
    right: false,
  });

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
          if (_access_token && _client && _uid && id) {
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