import {
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    Divider,
    TextareaAutosize,
    Button
  } from '@material-ui/core';
import {getRoom} from '../src/api/chat/room/GetRoom'
import {getMessage} from '../src/api/chat/message/GetMessage'
import {useEffect, useState} from 'react'
import Link from 'next/link'
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from '@material-ui/icons/Delete';
import Cookies from 'js-cookie'
import {createMessage} from '../src/api/chat/message/CreateMessage'

  //サーバーサイドレンダリング
  export async function getServerSideProps(context:any) {
    const id = context.query.id;
    const room = (await getRoom(id)).data
    const messages = (await getMessage(id)).data
    return {
      props: {
        id: id,
        room:room,
        messages:messages                
      }
    }
  }
  
  
  const ChatRoom =(props:any) => {
    const messages = props.messages.messages
    const id = Number(props.id)
    const chatId = Number(props.room.rooms.chat_id)
    const _uid = String(Cookies.get("_uid"))
    const currentId = Number(Cookies.get("id"))
    const userId = Number(props.room.rooms.user)
    const [form, setForm] = useState<string>("")
    const [ms, setMs] = useState<any[]>(messages)
    useEffect(() => {
      console.log("aaaaa",props.room.rooms.user)
    }, [])

    const addMessage = async () => {
      if(currentId != chatId) {
        const message = (await createMessage(id, form, currentId, chatId)).data.message
        setMs([...ms, message]);
        console.log(message)
        setForm("")  
      } else {
        const message = (await createMessage(id, form, currentId, userId)).data.message
        setMs([...ms, message]);
        console.log(message)
        setForm("")  
      }
      };
  


    const commentForm = () => {
        return (
          <>
          <br/>
            <h3>メッセージ</h3>
            <TextareaAutosize
              name="コンテンツ"
                minRows={7}
                value={form}
                style={{ width: "100%" }}
                onChange={(e) => setForm(e.target.value)}
              />
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
              onClick={addMessage}
            >
              投稿
            </Button>
          </Box>
        </>
        );
    };              
  


    return (
    <>
  <Container maxWidth="lg">
    {commentForm()}
          {ms.map((message:any, index:number) =>
                    <div key={index}>
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
                    {/* {message.user.email === _uid
                      ? < IconButton ><DeleteIcon fontSize="small"/></IconButton>
                      : <div className='normalButtonInner'></div>
                    } */}
                    
                      </CardContent>
                    </Card>
                    <br/>
                  </div>
          )}   
      </Container>
    </>
  );
  }
  
  export default ChatRoom
  