import { Like, User } from "../../type/interfaces";
import { getLikes } from "../../api/like/GetLike";
import { createLike } from "../../api/like/CreateLike";
import { deleteLike } from "../../api/like/DeleteLike";
import { IconButton, Button } from "@material-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/Favorite";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { useState, useEffect } from "react";

interface LikesProps {
  likes: Like[];
  setLikes: any;
  currentUser: User | undefined;
  taskId: number;
}

const TaskLikes: React.FC<LikesProps> = ({
  likes,
  setLikes,
  currentUser,
  taskId,
}) => {
  const [isLike, setIsLike] = useState<boolean>();
  const [likeId, setLikeId] = useState<number[]>([]);
  const destroyLike = async (id: number | undefined) => {
    deleteLike(id);
    const gLikes = await getLikes(taskId);
    if (gLikes.status == 200) {
      console.log(gLikes.data);
      setLikeId([]);
    }
  };

  const postLike = async () => {
    const likeIs = (await createLike(taskId, currentUser?.id)).data.like.id;
    setLikeId([likeIs]);
  };

  useEffect(() => {
    (async () => {
      const gLikes = await getLikes(taskId);
      if (gLikes.status == 200) {
        setLikeId(gLikes.data.current_user_like);
      }
    })();
  }, []);

  const likeButton = () => {
    if (likeId.length !== 0) {
      return (
        <Button
          onClick={() => {
            destroyLike(likeId[0]);
          }}
        >
          <FavoriteBorderIcon color="error" fontSize="large" />
          いいね取り消し
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => {
            postLike();
          }}
        >
          <FavoriteBorderIcon fontSize="large" />
          いいね
        </Button>
      );
    }
  };

  return <>{likeButton()}</>;
};

export default TaskLikes;
