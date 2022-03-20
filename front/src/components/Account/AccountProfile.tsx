import {User, Room} from '../../type/interfaces'
import {useEffect} from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  CardMedia,
  
} from '@material-ui/core';
import {displayImage} from '../../api/common/DisplayImage'
import Link from 'next/link'
import {createRoom} from '../../api/chat/room/CreateRoom'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

interface UserProfile {
  profileUser: User | undefined
}

 const AccountProfile:React.FC<UserProfile> = ({profileUser}) => {

  useEffect(() => {
  }, [])

  return (
  <>
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar 
        // src={displayImage(`https://enjob.work/${user.image?.url}`)}
        />
        <br/>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {profileUser?.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          <p>{profileUser?.email}</p>
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
        </Typography>
      </Box>
    </CardContent>
    <Divider />
  </Card>
  </>
  )
};


export default AccountProfile