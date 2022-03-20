import {Like, User} from '../../type/interfaces'
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

  interface LikesProps{
    likes : Like[]
    setLikes: any
    currentUser: User | undefined
    taskId: number
  }

 const TaskLikes:React.FC<LikesProps> = ({likes, setLikes, currentUser, taskId }) => {
  const [isLike, setIsLike] = useState<boolean>()
  const destroyLike = async (id:number) => {
    deleteLike(id)
    console.log(like)
    setIsLike(like)
  }

  const postLike = async () => {
    const like = (await createLike(taskId, currentUser?.id)).data.is_like
    console.log(like)
    setIsLike(like)
  }

  useEffect(() => {

    setIsLike()
  }, [])

  useEffect(() => {
  }, [postLike, destroyLike])


  const likeButton = () => {
    if(isLike) {
      return <Button onClick={() => {destroyLike()}}><FavoriteBorderIcon color="error" fontSize="large"/>いいね取り消し</Button>
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
  