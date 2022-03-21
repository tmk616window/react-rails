import { useEffect, useState, useContext } from "react";
import { getTask } from "../src/api/task/GetTask";
import { getComments } from "../src/api/task/comment/GetComment";
import EditTaskDetails from "../src/components/Task/EditTaskDetails";
import TaskProfile from "../src/components/Task/TaskProfile";
import TaskDetails from "../src/components/Task/TaskDetails";
import TaskProlangs from "../src/components/Task/TaskProlangs";
import TaskTools from "../src/components/Task/TaskTools";
import TaskComment from "../src/components/Task/TaskComment";
import TaskLikes from "../src/components/Task/TaskLikes";
import { AuthContext } from "./_app";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { api } from "../src/contexts/api";
import {
  Task,
  ProlLanguage,
  Tool,
  Like,
  Content,
  Comment,
  User,
} from "../src/type/interfaces";
import { Box, Container, Grid } from "@material-ui/core";

const Tasks = () => {
  const router = useRouter();
  const taskId = Number(router.query.id);
  const { currentUser } = useContext(AuthContext);
  const [edit, setEdit] = useState<boolean>(true);
  const [task, setTask] = useState<Task | undefined>();
  const [proLanguages, setProLanguages] = useState<ProlLanguage[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [taskUser, setTaskUser] = useState<User | undefined>();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    (async () => {
      const gtask = await getTask(router.query.id);
      if (gtask.status == 200) {
        setTask(gtask.data.task);
        setProLanguages(gtask.data.task.pro_languages);
        setTools(gtask.data.task.tools);
        setLikes(gtask.data.task.likes);
        setContents(gtask.data.task.contents);
        setTaskUser(gtask.data.task.user);
        setComments(gtask.data.task.comments);
      }
    })();
  }, []);

  return (
    <>
      <Box
        sx={{
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={8} md={8} xs={12}>
              {edit ? (
                <TaskDetails
                  task={task}
                  taskUser={taskUser}
                  setEdit={setEdit}
                  currentUser={currentUser}
                />
              ) : (
                <EditTaskDetails
                  task={task}
                  setEdit={setEdit}
                  contents={contents}
                  setContents={setContents}
                  setTask={setTask}
                  taskId={taskId}
                />
              )}
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <TaskProlangs
                proLanguages={proLanguages}
                taskId={taskId}
                taskUser={taskUser}
                setProLanguages={setProLanguages}
                currentUser={currentUser}
              />
              <br />
              <TaskTools
                tools={tools}
                setTools={setTools}
                taskId={taskId}
                taskUser={taskUser}
                currentUser={currentUser}
              />
              <br />
              <TaskProfile taskUser={taskUser} />
            </Grid>
          </Grid>
          <TaskLikes
            likes={likes}
            setLikes={setLikes}
            currentUser={currentUser}
            taskId={taskId}
          />
          <Grid spacing={3} lg={10} md={10} xs={12}>
            <br />
            <TaskComment
              taskId={taskId}
              comments={comments}
              setComments={setComments}
              taskUser={taskUser}
              currentUser={currentUser}
            />
          </Grid>
          <Grid spacing={3} lg={10} md={10} xs={12}></Grid>
        </Container>
      </Box>
    </>
  );
};
export default Tasks;
