import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Divider
} from '@material-ui/core';
import AccountProfile from '../src/components/Account/AccountProfile';
import AccountProfileDetails from '../src/components/Account/AccountProfileDetails';
import EditAccountProfileDetails from '../src/components/Account/EditAccountProfileDetails';
import {getUser} from '../src/api/user/GetUser'
import {useEffect, useState} from 'react'
import Link from 'next/link'
import {getProLangs} from '../src/api/prolang/GetProLang'
import {Task, Message} from '../src/type/interfaces'
import {getUserMessage} from '../src/api/chat/GetUserMessage'
import {getRooms} from '../src/api/chat/room/GetRooms'
import Cookies from 'js-cookie'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  customButton: {
    cursor:"pointer"
  },
})


//サーバーサイドレンダリング
export async function getServerSideProps(context:any) {
  const id = context.query.id;
  const user = (await getUser(id)).data
  const p = (await getProLangs(id)).data
  const userMessage = (await getUserMessage(id)).data
  const rooms = (await getRooms()).data

  return {
    props: {
      user: user,
      p: p,
      id: id,
      userMessage:userMessage,
      rooms:rooms                
    }
  }
}


const ProfilePage =(props:any) => {
  const [edit, setEdit] = useState<boolean>(true)
  const u = props.user.user.user
  const t = props.user.user.task
  const userMessage = props.userMessage.messages
  const[user, setUser] = useState(u)
  const rooms = props.rooms.rooms
  const currentId = Number(Cookies.get("id"))
  const classes = useStyles()

  
  useEffect(() => {
    console.log(currentId, user.id)
  }, [])

  return (
<>
  <Box
    sx={{
      minHeight: '100%',
      py: 3
    }}
  >
    <Container maxWidth="lg">
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          lg={4}
          md={6}
          xs={12}
        >
          <AccountProfile user={user} rooms={rooms}/>
          <br/>
          <Card>
            <CardContent>
            <h2>投稿したポートフォリオ</h2>
            <Divider />
            <br/>
              {t.map((task:Task, index:number) =>
              <div key={index}>
                  <Link href={{ pathname: '/task', query: { id: task.id } }} >{task.title}</Link>
                  <br/>
              </div>
              )}
            </CardContent>    
          </Card>
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xs={12}
        >
          {edit
                ? <EditAccountProfileDetails user={user} userMessage={userMessage} setEdit={setEdit} />

                
                  : <AccountProfileDetails user={user} setEdit={setEdit} setUser={setUser}/>
              }
          
          <h2>メッセージ一覧</h2>
          {(() => {
                  if (currentId === user.id) {
                    return (
                      <>
          {userMessage.map((message:Message, index:number) =>
                              <Link href={{ pathname: '/chatroom', query: { id: message.message_id } }} >
                                    <div key={index} className={classes.customButton}>
                                    <Card>
                                    <CardContent>
                                    <p >{message.text}</p>
                                    <Box
                                    sx={{
                                      display: 'flex',
                                      justifyContent: 'flex-end',
                                      p: 2
                                    }}
                                    >    
                                      ユーザー：<Link href={{ pathname: '/profile', query: { id: message.user_id } }}>{message.user.email}</Link>
                                    </Box>
                                    
                                      </CardContent>
                                    </Card>
                                    <br/>
                                  </div>
                                </Link>
                                )}
                      </>
                    )
                  } 
                })()}
        </Grid>
      </Grid>
      <Grid
          spacing={3}
          lg={4}
          md={6}
          xs={12}
        >
      </Grid>
    </Container>
  </Box>
</>
);
}

export default ProfilePage
