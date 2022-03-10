import * as React from 'react';

import {
    Box,
    Drawer,
    Button,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton
  } from '@material-ui/core';
  import DeleteIcon from '@material-ui/icons/Delete';
  import MenuIcon from "@material-ui/icons/Menu"
  import Link from 'next/link'
import Cookies from 'js-cookie'


type Anchor = 'top' | 'bottom' | 'right';

const _access_token = Cookies.get("_access_token")


const TemporaryDrawer = ({handleSignOut}: any) => {
  const [state, setState] = React.useState({
    right: false,
  });

const signInList = (anchor: Anchor) => {
  return (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List>
        <Link href="/">
          <ListItem button>トップ</ListItem>
        </Link>
        <Link href="/tasks">
          <ListItem button >一覧</ListItem>
        </Link>
        <Link href="/task/new">
          <ListItem button >投稿</ListItem>
        </Link>
        <Link href={{ pathname: '/profile', query: { id: id } }}>
          <ListItem button >プロフィール</ListItem>
        </Link>
        <ListItem button onClick={handleSignOut}>
          ログアウト
        </ListItem>
    </List>
    </Box>
  )
}

const signOutList = (anchor: Anchor) => {
  return (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link href="/">
          <ListItem button >トップ</ListItem>
        </Link>
        <Link href="/register">
          <ListItem button >新規登録</ListItem>
        </Link>
        <Link href="/login">  
          <ListItem button href="/login">ログイン</ListItem>
        </Link>
    </List>
    </Box>
  )
}




  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const list = () => {
    return (
    <>
    {_access_token
      ? <Box>{signInList}</Box>
      : <Box>{signOutList}</Box>
    }
    </>
    )
  };

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}><MenuIcon color="inherit"/></IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default TemporaryDrawer