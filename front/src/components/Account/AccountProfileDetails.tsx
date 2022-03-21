import { useState, useCallback } from "react";
import { User } from "../../type/interfaces";
import { updateUser } from "../../api/user/UpdateUser";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";

interface UserProfile {
  profileUser: User | undefined;
  setProfileUser: any;
  setEdit: any;
}

const AccountProfileDetails: React.FC<UserProfile> = ({
  profileUser,
  setProfileUser,
  setEdit,
}) => {
  const [image, setImage] = useState<File>();
  const [values, setValues] = useState<any>({
    name: profileUser?.name,
    email: profileUser?.email,
    live: profileUser?.live,
    details: profileUser?.details,
    age: profileUser?.age,
  });

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("live", values.live);
    formData.append("details", values.details);
    formData.append("age", values.age);
    if (image) formData.append("image", image);
    return formData;
  };

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);

  const patchUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = createFormData();
    console.log(data);
    await updateUser(Number(profileUser?.id), data).then((res) => {
      setProfileUser(res.data.user);
      setEdit(true);
    });
  };

  return (
    <div className="profile-details">
      <Card>
        <form noValidate onSubmit={patchUser}>
          <CardHeader title="プロフィール" />
          <Divider />
          <CardContent>
            <Grid item md={12} xs={12}>
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  uploadImage(e);
                }}
              />
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="名前"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="メールアドレス"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="年齢"
                  name="age"
                  onChange={handleChange}
                  type="number"
                  value={values.age}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="都道府県"
                  name="live"
                  onChange={handleChange}
                  required
                  value={values.live}
                  variant="outlined"
                ></TextField>
              </Grid>
              <Grid item lg={12} md={12} xs={12}></Grid>

              <Grid item lg={12} md={12} xs={12}>
                <p>詳細プロフィール</p>
                <TextareaAutosize
                  name="details"
                  minRows={7}
                  value={values.details}
                  style={{ width: "100%" }}
                  onChange={handleChange}
                />
              </Grid>
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
    </div>
  );
};

export default AccountProfileDetails;
