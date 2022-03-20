import { useState, useEffect } from 'react';
import Logo from '../../../img/logo.png'
import Image from 'next/image'
import {User, Message} from '../../type/interfaces'
import {updateUser} from '../../api/user/UpdateUser'
import Cookies from 'js-cookie'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  TextareaAutosize
} from '@material-ui/core';

interface UserProfile {
  profileUser: User | undefined
  currentUser: User | undefined
  setEdit: any
}

 const EditAccountProfileDetails:React.FC<UserProfile> = ({profileUser, currentUser, setEdit}) => {

  useEffect(() => {
  }, [])

  const [values, setValues] = useState<any>({
    name: profileUser?.name,
    email: profileUser?.email,
    // live: profileUser?.live,
    // details: profileUser.details,
    // age: user.age
  });
  
  const patchButton = () => {
    if(profileUser?.email === currentUser?.email) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={() =>{setEdit(false)}}
          >
            編集
          </Button>
        </Box>  
      )
    }
  };



  const handleChange = (event: any) => {    
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  return (
    <div className="profile-details">
      <Card>
        <CardHeader
          title="プロフィール"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <p>{profileUser?.name}</p>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <p>メールアドレス：{profileUser?.email}</p>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {/* <p>年齢：{user.age}歳</p> */}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {/* <p>居住都道府県：{user.live}</p> */}
            </Grid>
            <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
          </Grid>
            <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <p>詳細プロフィール</p>
            {/* <p>{user.details}</p> */}
          </Grid>

          </Grid>
          <Grid>
          </Grid>
        </CardContent>
        <Divider />
        {patchButton()}

      </Card>
      </div>
  );
};

export default EditAccountProfileDetails