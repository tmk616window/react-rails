import { useState, useEffect, useCallback } from 'react';
import {createContent} from '../../api/task/content/CreateContent'
import {Task, Content} from '../../type/interfaces'
import {updateTask} from '../../api/task/UpdateTask'
import {updateContent} from '../../api/task/content/UpdateContent'
import { useRouter } from 'next/router';
import {destroyContent} from '../../api/task/content/DestroyContent'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextareaAutosize,
  TextField
} from '@material-ui/core';


interface TaskItem {
  task: Task
  setEdit: any
  id :number
  propsContents: Content[]
  setTask: any
  setContent: any
}



 const EditTaskDetails:React.FC<TaskItem> = ({task, setEdit, propsContents, id, setTask, setContent}) => {
  const router = useRouter();
  const [contents, setContents] = useState<Content[]>(propsContents)
  const [title, setTitle] = useState<string>(task.title)
  const [desc, setDesc] = useState<string>(task.description)
  const [purl, setPurl] = useState<string>(task.purl)
  const [image, setImage] = useState<File>()
  const addContent = () => {
        setContents([...contents, {title:"", text:""}]);
    console.log(contents)
    };

    useEffect(() => {
      console.log("task", task.title)
    },[]) 



    const changeHandle = (key: string, value: string, index:number) => {
      const _contents = [...contents]
      _contents[index] = {...contents[index], [key]: value}
      setContents(_contents)
    }
  

  const deleteContent = (id:number) => {
    if(contents[id].id != null) {
      destroyContent(contents[id].id)
    } 
    setContents(contents.filter((_, i) => i !== id))
  }


  const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

const patchContent = async () => {
  const c:Content[] = []
  for (const content of contents) {
    if(content.id) {
      const a = (await updateContent(content['title'], content['text'], task.id, content.id)).data.content
      c.push(a)
    } else {
      const b = (await createContent(content['title'], content['text'], task.id)).data.content
      c.push(b)
    }
  }
  console.log("c", c)
  setContents(c)
  setContent(c)
  return c
  
}


  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()
    formData.append("title", title)
    formData.append("purl", purl)
    formData.append("description", desc)
    if (image) formData.append("logoImage", image)

    return formData
  }


const patchTask = async () => {
  const uData = createFormData()
  setEdit(true)
  const { data }  = await updateTask(id, uData)
  const pc = patchContent()
  console.log("patchContent()", pc)
  setTask(data.task)
  location.reload()
  // const content = (await getTask(id)).data
  // setContent(content.task.contents)
  
}

  return (
      <Card>
        <form  noValidate onSubmit={patchTask}>
        <Divider />
        <CardContent>
        <Grid
            item
            md={12}
            xs={12}
        >
        <TextField
            fullWidth
            label="タイトル"
            name="タイトル"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
        />
        </Grid>
        <br/>
          <Grid
            container
            spacing={3}
          >

            <Grid
              item
              md={12}
              xs={12}
            >

              <Button
                  component="label"
                >
                <input
              accept="image/*"
              id="icon-button-file" 
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadImage(e)
              }}
            />
              </Button>
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <p>作品URL</p>
              <TextField
                fullWidth
                label="作品URL"
                name="作品URL"
                required
                value={purl}
                onChange={(e) => setPurl(e.target.value)}
                variant="outlined"
              />

            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <p>ポートフォリオ概要</p>
              <TextareaAutosize
                minRows={7}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ width: "100%" }}
              />
            </Grid>
    
                <Button onClick={addContent}>追加</Button>
                {contents.map((content:Content, index:number) => (
                    <Grid
                        key={index}
                        item
                        md={12}
                        xs={12}
                    >
                        <Button onClick={()=>deleteContent(index)}>削除</Button>
                        <TextField
                            fullWidth
                            label="サブタイトル"
                            name="サブタイトル"
                            required
                            onChange={(event) => {
                              　      changeHandle("title", event.target.value, index);
                              　    }}
                            value={content.title}
                            variant="outlined"
                            />
                        <br/>
                        <br/>

                        <TextareaAutosize
                        // label="コンテンツ"
                        name="コンテンツ"
                        onChange={(event) => {
                          　      changeHandle("text", event.target.value, index);
                          　    }}
                          value={content.text}
                          minRows={7}
                          style={{ width: "100%" }}
                        />
                    </Grid>
                ))}
          </Grid>
          <Grid>
          </Grid>
        </CardContent>
        <Divider />
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
            type="submit"
          >
            保存
          </Button>
        </Box>
        </form>
      </Card>
  );
};

export default EditTaskDetails