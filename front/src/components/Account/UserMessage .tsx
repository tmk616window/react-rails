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
  user: User
  rooms: Room[]
}

 const UserMessage:React.FC<UserProfile> = ({user, rooms}) => {
  const currentId = Number(Cookies.get("id"))
  const router = useRouter()

  const room = rooms.filter(room => {
    return room.user === currentId 
  })



  useEffect(() => {
    console.log("usexswxswcxwxcwr", "room,rooms")
  }, [])

  const postRoom = async () => {
    const room = (await createRoom(currentId, user.id)).data
    console.log(room,"dataa")
    // router.push("/")
    router.push({ pathname: '/chatroom', query: { id: room.room.id } })
  }

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
        src={displayImage(`https://enjob.work/${user.image?.url}`)}
        />
        <br/>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {user.name}
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
          <p>{user.email}</p>
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
        </Typography>




      </Box>
    </CardContent>
    <Divider />


    <CardActions>
    {(() => {
        if (currentId !== user.id && room.length == 0) {
          return (
            <Button
            color="secondary"
            fullWidth
            variant="text"
            onClick={postRoom}
          >
              メッセージを送る
          </Button>    
          )
        } 
      })()}
    </CardActions>
  </Card>
  </>
  )
};


export default UserMessage