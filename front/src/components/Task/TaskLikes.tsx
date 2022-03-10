import {Like} from '../../type/interfaces'
import {getTask} from '../../api/task/GetTask'
import {createLike} from '../../api/like/CreateLike'
import {deleteLike} from '../../api/like/DeleteLike'
import {
    IconButton,
    Button
  } from '@material-ui/core';
  import Favorite from '@material-ui/icons/Favorite';
  import FavoriteBorderIcon from '@material-ui/icons/Favorite';
  import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import {useState, useEffect} from 'react'

  interface LikesParams{
    likes : Like[]
    currentId: number
    taskId: number
    setLikes: any
  }

 const TaskLikes:React.FC<LikesParams> = ({likes, currentId, taskId, setLikes}) => {
  const [slike, setSlike] = useState<number>()

  const destroyLike = async (id:number) => {
    deleteLike(id)
    const {data} = await getTask(taskId)
    setLikes(data.task.likes)
    setSlike(0)
  }

  const postLike = async () => {
    createLike(taskId,currentId)
    const {data} = await getTask(taskId)
    setLikes(data.task.likes)
    console.log("create", data)
    data.task.likes.filter(likes => {
      if(likes.user_id === currentId) {
        setSlike(likes.id)
      }
    })
  }

  useEffect(() => {
    console.log("swqdwdqaaaaaa")
    likes.filter(likes => {
      if(likes.user_id === currentId) {
        setSlike(likes.id)
      }
    })
  }, [])

  const likeButton = () => {
    if(slike) {
      return <Button onClick={() => {destroyLike(slike)}}><FavoriteBorderIcon color="error" fontSize="large"/>いいね取り消し</Button>
    } else {
      return <Button onClick={() => {postLike()}}><FavoriteBorderIcon  fontSize="large"/>いいね</Button>
    }
  }

  return (
    <>
    {likeButton()}
    </>
  )
};
  
export default TaskLikes
  