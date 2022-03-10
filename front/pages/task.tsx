import {useEffect, useState} from 'react'
import {getTask} from '../src/api/task/GetTask'
import {getComments} from '../src/api/task/comment/GetComment'
import EditTaskDetails from '../src/components/Task/EditTaskDetails'
import {
    Box,
    Container,
    Grid,
  } from '@material-ui/core';
  import TaskProfile from '../src/components/Task/TaskProfile';
  import TaskDetails from '../src/components/Task/TaskDetails';
  import TaskProlangs from '../src/components/Task/TaskProlangs'
  import TaskTools from '../src/components/Task/TaskTools'
  import TaskComment from '../src/components/Task/TaskComment'
  import TaskLikes from '../src/components/Task/TaskLikes'
  import Cookies from 'js-cookie'

  //サーバーサイドレンダリング
  export async function getServerSideProps(context:any) {
    const id = context.query.id;
    const task = (await getTask(id)).data
    const comments = (await getComments(id)).data

    return {
      props: {
        id: id,
        task: task,
        comments: comments
      }
    }
  }

  const Tasks = (props:any) => {
    const currentId = Number(Cookies.get("id"))
    const pTask = props.task.task.task
    const user = props.task.task.user
    const cTask = props.task.task
    const comments = props.comments.comments
    const pLikes = props.task.task.likes
    const[edit, setEdit] = useState<boolean>(true)
    const[task, setTask] = useState<any>(pTask)
    const[prolangs, setProlangs] = useState<any>(cTask.prolongs)
    const[ptools, setPtools] = useState<any>(cTask.tools)
    const[likes, setLikes] = useState<any>(pLikes)
    const[content, setContent] = useState<any>(cTask.contents)

    useEffect(() => {
      console.log("user", props.task.task.likes)
    }) 
    
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
                  ? <TaskDetails task={task} setEdit={setEdit} contents={cTask.contents} user={user}/>
                    : <EditTaskDetails  task={task} setEdit={setEdit} id={pTask.id} propsContents={content} setContent={setContent} setTask={setTask}/>
                }
              </Grid>
              <Grid
                item
                lg={4}
                md={4}
                xs={12}
              >
                <TaskProlangs proL={prolangs} id={pTask.id} user={user} setProlangs={setProlangs}/>
                <br/>
                <TaskTools  tls={ptools} id={pTask.id} user={user} setPtools={setPtools}/>
                <br/>
                <TaskProfile user={cTask.user}/>
              </Grid>
            </Grid>
            <TaskLikes likes={likes} setLikes={setLikes} currentId={currentId} taskId={pTask.id}/>
            <Grid
                spacing={3}
                lg={10}
                md={10}
                xs={12}
              >
              <br/>
              <TaskComment id={pTask.id} comments={comments} user={user}/>
            </Grid>
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
  