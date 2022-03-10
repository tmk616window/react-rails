import { useState, useCallback } from 'react';
import Image from 'next/image'
import {createTask} from '../../api/task/CreateTask'
import {createContent} from '../../api/task/content/CreateContent'
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
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

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

type content = {
    title :string,
    text: string
}

 const NewTaskDetails = () => {
  const router = useRouter();
  const [contents, setContents] = useState<content[]>([{title:"", text:""}])
  const [title, setTitle] = useState<string>("")
  const [desc, setDesc] = useState<string>("")
  const [purl, setPurl] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const currentId = Cookies.get("id")
  const [cid, setCId] = useState<any>(currentId)
  const addContent = () => {
    setContents([...contents, {title:"", text:""}]);
    console.log(contents)
    };

    const changeHandle = (key: string, value: string, index:number) => {
      const _contents = [...contents]
      _contents[index] = {...contents[index], [key]: value}
      setContents(_contents)
    }
  

  const deleteContent = (id:number) => {
    setContents(contents.filter((_, i) => i !== id))
  }

  const [values, setValues] = useState({
    email: 'demo@devias.io',
    country: 'USA'
  });


const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };



  const handleImageChange = (event: any) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImage(imageUrl)
 }

 const postContent = (id: number) => {
  for (const content of contents) {
    createContent(content['title'], content['text'], id)
  }
}



  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()
    formData.append("title", title)
    if (image) formData.append("logoImage", image)
    formData.append("purl", purl)
    formData.append("description", desc)
    formData.append("user_id", cid)


    return formData
  }

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])


 const postTask = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  const data = createFormData()
  const taskPesp = (await createTask(data)).data.task
  postContent(taskPesp.id)
  router.push({
    pathname:"/task",       
    query: {id : taskPesp.id} 
  });

}

  return (
      <Card>
        <form  noValidate onSubmit={postTask}>
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
                ロゴ画像を貼ってください
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      uploadImage(e)
                    }}
                  />
              </Button>
              {/* <Image alt="admin" src={image} height="450" width="100%"/> */}
              {/* <Image src={image} height="800"/> */}
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
                {contents.map((c:{title:string, text:string}, index:number) => (
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
                            value={c.title}
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
                          value={c.text}
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

export default NewTaskDetails