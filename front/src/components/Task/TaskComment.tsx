import React, { useEffect, useState } from "react";
import Image from 'next/image'
import Logo from '../img/logo.png'
import Link from 'next/link'
import {
  Button,
  TextareaAutosize,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton
  } from '@material-ui/core';
import {createComment} from '../../api/task/comment/CreateComment'
import {Comment, User} from '../../type/interfaces'
import DeleteIcon from '@material-ui/icons/Delete';
import {destroyComment} from '../../api/task/comment/DestroyComment'
import Cookies from 'js-cookie'

interface CommentParam{
  comments: Comment[]
  id: number
  user: User
}

const TaskComment:React.FC<CommentParam> = ({comments, id, user}) => {
  
  const[comment, setComment] = useState<string[]>([])
  const [form, setForm] = useState<string>("")
  const _uid = Cookies.get("_uid")
  const currentId = Number(Cookies.get("id"))

  const addContent = () => {
    setComment([...comment, form]);
    console.log(comment)
    createComment(form, id, currentId)
    setForm("")
    location.reload();
    };

  const deleteComment = (index:number) => {
    destroyComment(comments[index].id)
    location.reload();
  }
  
  const commentForm = () => {
    if (user.email !== _uid) {
      return (
        <>
          <h3>コメント</h3>
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
            onClick={addContent}
          >
            投稿
          </Button>
        </Box>
      </>
      );
    } 
  };              


    return (
        <>
            <Grid
                spacing={3}
                lg={10}
                md={10}
                xs={12}
              >
              <br/>
              <h3>コメント一覧</h3>     
              {comments.map((comment:Comment, index:number) =>
                <div key={index}>
                <Card>
                <CardContent>
                <p >{comment.text}</p>
                <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2
                }}
                >    
                  ユーザー：<Link href={{ pathname: '/profile', query: { id: comment.user_id } }}>{comment.user.email}</Link>
                </Box>
                {comment.user.email === _uid
                  ? < IconButton onClick={() =>deleteComment(index)}><DeleteIcon fontSize="small"/></IconButton>
                  : <div className='normalButtonInner'></div>
                }
                
                  </CardContent>
                </Card>
                <br/>
              </div>
              )}
            </Grid>
            {commentForm()}
        </>
    );
  }

  export default TaskComment