import { useState, useEffect } from 'react';
import Logo from '../../../img/logo.png'
import Image from 'next/image'
import {Task, Content, User} from '../../type/interfaces'
import {displayImage} from '../../api/common/DisplayImage'
import Cookies from 'js-cookie'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

interface TaskItem {
  task: Task
  setEdit: any
  contents: Content[]
  user :User
}


 const TaskDetails:React.FC<TaskItem> = ({task, setEdit, contents, user}) => {
  const _uid = Cookies.get("_uid")
  // useEffect(() => {
  //   console.log("task.logoImage?.url", _uid, user.email)
  // }, [])
  const[pcontests, setPContents] = useState(contents)
  
  const patchButton = () => {
    if (user.email === _uid) {
      return (
        <>
        <Button
          color="secondary"
          variant="contained"
          onClick={()=>{setEdit(false)}}
        >
          編集
        </Button>
      </>
      );
    } 
  };



  return (
      <Card>
        <CardHeader
          title={task.title}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <img alt="logo" src={displayImage(`https://enjob.work/${task.logoImage?.url}`)} height="400px" width="100%"/>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >

            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <h3>ポートフォリオURL</h3>
                <a href={task.purl}>{task.purl}</a>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <h3>ポートフォリオ概要</h3>
                <p>{task.description}</p>
            </Grid>
          </Grid>
          <Grid
              item
              md={12}
              xs={12}
            >
            <br/>
            <br/>
            <br/>
            <br/>
            {pcontests.map((content:Content, index:number) =>
                  <div className="content" key={index}>
                    <h3>{content.title}</h3>
                    <Divider />
                    <p >{content.text}</p>
                  </div>
                  )}
          </Grid>
          <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2
                }}
              >
                {patchButton()}
              </Box>

          <Grid>
          </Grid>
        </CardContent>
      </Card>
  );
};

export default TaskDetails