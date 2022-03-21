import { useState, useEffect, useCallback } from "react";
import { createContent } from "../../api/task/content/CreateContent";
import { Task, Content } from "../../type/interfaces";
import { updateTask } from "../../api/task/UpdateTask";
import { updateContent } from "../../api/task/content/UpdateContent";
import { useRouter } from "next/router";
import { destroyContent } from "../../api/task/content/DestroyContent";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";

interface EditTaskProps {
  task: Task | undefined;
  contents: Content[];
  setTask: any;
  setContents: any;
  setEdit: any;
  taskId: number;
}

const EditTaskDetails: React.FC<EditTaskProps> = ({
  task,
  contents,
  setTask,
  setContents,
  setEdit,
  taskId,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState<any>(task?.title);
  const [details, setDetails] = useState<any>(task?.details);
  const [url, setUrl] = useState<any>(task?.url);
  const [image, setImage] = useState<File>();

  const addContent = () => {
    setContents([...contents, { title: "", text: "" }]);
  };

  useEffect(() => {}, []);

  const changeHandle = (key: string, value: string, index: number) => {
    const _contents = [...contents];
    _contents[index] = { ...contents[index], [key]: value };
    setContents(_contents);
  };

  const deleteContent = (id: number) => {
    if (contents[id].id != null) {
      destroyContent(contents[id].id);
    }
    setContents(contents.filter((_, i) => i !== id));
  };

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);

  const patchContent = async () => {
    const c: Content[] = [];
    for (const content of contents) {
      if (content.id) {
        const a = (
          await updateContent(
            content["title"],
            content["text"],
            taskId,
            content.id
          )
        ).data.content;
        c.push(a);
      } else {
        const b = (
          await createContent(content["title"], content["text"], taskId)
        ).data.content;
        c.push(b);
      }
    }
    return c;
  };

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("url", url);
    formData.append("details", details);
    if (image) formData.append("image", image);
    return formData;
  };

  const patchTask = async () => {
    const Data = createFormData();
    setEdit(true);
    const patchContents = await patchContent();
    const task = (await updateTask(taskId, Data)).data.task;
    task.contents = patchContents;
    setTask(task);
  };

  return (
    <Card>
      <form noValidate onSubmit={patchTask}>
        <Divider />
        <CardContent>
          <Grid item md={12} xs={12}>
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
          <br />
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Button component="label">
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    uploadImage(e);
                  }}
                />
              </Button>
            </Grid>
            <Grid item md={12} xs={12}>
              <p>作品URL</p>
              <TextField
                fullWidth
                label="作品URL"
                name="作品URL"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <p>ポートフォリオ概要</p>
              <TextareaAutosize
                minRows={7}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                style={{ width: "100%" }}
              />
            </Grid>
            <Button onClick={addContent}>追加</Button>
            {contents.map((content: Content, index: number) => (
              <Grid key={index} item md={12} xs={12}>
                <Button onClick={() => deleteContent(index)}>削除</Button>
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
                <br />
                <br />
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
          <Grid></Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="secondary" variant="contained" type="submit">
            保存
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default EditTaskDetails;
