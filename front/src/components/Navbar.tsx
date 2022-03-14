import React, { useContext, useEffect, useState } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { signOut } from "../api/login/auth"
import Cookies from "js-cookie"
import { AuthContext } from "../../pages/_app"
import SwipeableTemporaryDrawer from './Drawer1'
import { useRouter } from 'next/router'
import Axios from 'axios'


 const Navbar = () => {
  const router = useRouter()    
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext)
  const [user, setUser] = useState(currentUser)
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
      Cookies.set("token", "")
      setIsSignedIn(false)
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