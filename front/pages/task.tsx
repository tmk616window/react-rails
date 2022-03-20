import {useEffect, useState, useContext} from 'react'
import {getTask} from '../src/api/task/GetTask'
import {getComments} from '../src/api/task/comment/GetComment'
import EditTaskDetails from '../src/components/Task/EditTaskDetails'
import TaskProfile from '../src/components/Task/TaskProfile';
import TaskDetails from '../src/components/Task/TaskDetails';
import TaskProlangs from '../src/components/Task/TaskProlangs'
import TaskTools from '../src/components/Task/TaskTools'
import TaskComment from '../src/components/Task/TaskComment'
import TaskLikes from '../src/components/Task/TaskLikes'
import {AuthContext}from './_app'
import Cookies from 'js-cookie'
import { useRouter } from "next/router";
import  {api}  from '../src/contexts/api'
import {Task, ProlLanguage, Tool, Like, Content, User} from '../src/type/interfaces'
import {
  Box,
  Container,
  Grid,
} from '@material-ui/core';



const Tasks = () => {
  const router = useRouter();
  const {taskrId}:any = router.query.id
  const {currentUser} = useContext(AuthContext)
  const[edit, setEdit] = useState<boolean>(true)
  const[task, setTask] = useState<Task | undefined>()
  const[proLanguages, setProLanguages] = useState<ProlLanguage[]>([])
  const[tools, setTools] = useState<Tool[]>([])
  const[likes, setLikes] = useState<Like[]>([])
  const[content, setContent] = useState<Content[]>([])
  const[taskUser, setTaskUser] = useState<User | undefined>()

  useEffect( () => {
    (async() => {
      const gtask = await getTask(router.query.id)
      if(gtask.status == 200) {
        setTask(gtask.data.task)
        setProLanguages(gtask.data.task.pro_languages)
        setTools(gtask.data.task.tools)
        setLikes(gtask.data.task.likes)
        setContent(gtask.data.task.contents)
        setTaskUser(gtask.data.task.user)
      }
    })()
  }, []);

  return(
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
              lg={8}
              md={8}
              xs={12}
            >
            {edit
              ? <TaskDetails task={task} setEdit={setEdit}/>
                : <p>aaaa</p>
            }
            </Grid>
            <Grid
              item
              lg={4}
              md={4}
              xs={12}
            >
              <TaskProlangs proLanguages={proLanguages} taskId={taskrId} taskUser={taskUser} setProLanguages={setProLanguages} currentUser={currentUser}/>
              <br/>
              {/* <TaskTools  tools={tools} setTools={setTools} taskId={taskrId} taskUser={taskUser} />
              <br/>
              <TaskProfile taskUser={taskUser}/> */}
            </Grid>
          </Grid>
          {/* <TaskLikes likes={likes} setLikes={setLikes} currentId={currentId} taskId={pTask.id}/> */}
          {/* <Grid
            spacing={3}
            lg={10}
            md={10}
            xs={12}
          >
            <br/>
            <TaskComment id={pTask.id} comments={comments} user={user}/>
          </Grid> */}
          <Grid
              spacing={3}
              lg={10}
              md={10}
              xs={12}
            >
          </Grid>
        </Container>
      </Box>
    </>  
  )
};
export default Tasks
  