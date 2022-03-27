import { Like, User } from "../../type/interfaces";
import { getLikes } from "../../api/like/GetLike";
import { createLike } from "../../api/like/CreateLike";
import { deleteLike } from "../../api/like/DeleteLike";
import { Button } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/Favorite";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface LikesProps {
  likes: Like[];
  setLikes: any;
  currentUser: User | undefined;
  taskId: number;
}

const TaskLikes: React.FC<LikesProps> = ({ currentUser, taskId }) => {
  const router = useRouter();
  const [likeId, setLikeId] = useState<number[]>([]);
  const destroyLike = async (id: number | undefined) => {
    deleteLike(id);
    const gLikes = await getLikes(taskId);
    if (gLikes.status == 200) {
      setLikeId([]);
    }
  };

  const postLike = async () => {
    const likeIs = (await createLike(taskId, currentUser?.id)).data.like.id;
    setLikeId([likeIs]);
  };

  useEffect(() => {
    (async () => {
      try {
        const Likes = await getLikes(taskId);
        setLikeId(Likes.data.current_user_like);
      } catch (error) {
        console.log(error.response);
        router.push("/");
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
