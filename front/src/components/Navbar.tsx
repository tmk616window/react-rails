import React, { useContext, useEffect } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Link from 'next/link'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { signOut } from "../api/login/auth"
import Cookies from "js-cookie"
import { AuthContext } from "../../pages/_app"
// import TemporaryDrawer from './Drawer'
import SwipeableTemporaryDrawer from './Drawer1'
import { useRouter } from 'next/router'
// import api from "../contexts/api"
import Axios from 'axios'


 const Navbar = () => {
  const router = useRouter()    
    const useStyles = makeStyles((theme: Theme) => ({
      nabvarBottom: {
        
      },

      iconButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        textDecoration: "none",
        color: "inherit"
      },
      linkBtn: {
        textTransform: "none"
      }
    }))
    

    const { isSignedIn, setIsSignedIn } = useContext(AuthContext)
    const classes = useStyles()


  const handleSignOut = async () => {
    const token = Cookies.get('token')

    const api = Axios.create({
        baseURL: 'http://localhost:3000/',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });
    


    console.log("aaaaaa")
    api.delete('/api/session')
    .then( () => {
      Cookies.remove("token")
      setIsSignedIn(false)
      // location.reload();
      router.push("/")
      console.log("Succeeded in sign out")
    })
    .catch( () => {
      console.log("Failed in sign out")
    })
  }


  return (
  <>
    <AppBar position="absolute" className={classes.nabvarBottom}>
      <Toolbar>   
        <Typography
          // component={Link}
          // to="/"
          variant="h6"
          className={classes.title}
        >
          エンジョブ
        </Typography>
        
        <SwipeableTemporaryDrawer handleSignOut={handleSignOut}/>
      </Toolbar>
    </AppBar>
  </>
  )
}

export default Navbar