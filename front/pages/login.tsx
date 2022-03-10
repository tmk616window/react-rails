import * as Yup from 'yup';
import Image from 'next/image'
import { Formik } from 'formik';
import LogIn from '../img/login.png'
import Cookies from "js-cookie"
import { signIn, gustSignIn } from "../src/api/login/auth";
import { AuthContext } from "./_app"
import React, { useContext } from "react"
import { useRouter } from 'next/router'


import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
let style = {
  margin: "100px 0px 0px 0px",
};


const Login: React.FC = () => {
  const router = useRouter()
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const handleSubmit = async (params:any) => {
    console.log(params)

    try {
      const res = await signIn(params)
      console.log(res.data.token)

      if (res.status === 200) {
        Cookies.set("_access_token", res.data.token)    
        setIsSignedIn(true)
        setCurrentUser(res.data)
        router.push({ pathname: '/tasks'})
        console.log("Signed in successfully!")
      }
    } catch (err) {
      console.log(err)
      alert("パスワードとメールアドレスが一致していない可能性があります")
    }

  }

  const handleGustSubmit = async () => {
    const res = await gustSignIn()
    console.log(res.data)
    // Cookies.set("_access_token", res.data.data.token)
    // Cookies.set("_client", res.headers["client"])
    // Cookies.set("_uid", res.headers["uid"])
    // Cookies.set("id", res.data.data.id)
    // router.push({ pathname: '/profile', query: { id: res.data.data.id } })
  }



  return (
    <div>
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('メールアドレスを入力してください').max(255).required('メールアドレスを入力してください'),
              password: Yup.string().max(255).required('パスワードを入力してください')
            })}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h3"
                  >
                    ログイン
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                  </Typography>
                </Box>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    <Image alt="login" src={LogIn} width="100" height="100"/>
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="メールアドレス"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="パスワード"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="secondary"
                    // disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    ログイン
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              
              // disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={()=>handleGustSubmit()}
            >
              ゲストログイン
            </Button>
          </Box>
        </Container>
      </Box>
    </>
    </div>
  );
};

export default Login