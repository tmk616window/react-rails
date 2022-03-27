import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@material-ui/core";
import AccountProfile from "../src/components/Account/AccountProfile";
import AccountProfileDetails from "../src/components/Account/AccountProfileDetails";
import EditAccountProfileDetails from "../src/components/Account/EditAccountProfileDetails";
import { getUser } from "../src/api/user/GetUser";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { getRooms } from "../src/api/chat/room/GetRooms";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "./_app";
import { useRouter } from "next/router";
import { User, Task } from "../src/type/interfaces";

const useStyles = makeStyles({
  customButton: {
    cursor: "pointer",
  },
});

const ProfilePage = () => {
  const router = useRouter();
  const userId = Number(router.query.id);
  const { currentUser } = useContext(AuthContext);
  const [edit, setEdit] = useState<boolean>(true);
  const [profileUser, setProfileUser] = useState<User | undefined>();
  const [profileUserTasks, setProfileUserTasks] = useState<Task[]>([]);

  useEffect(() => {
    console.log(router);
    (async () => {
      try {
        const user = await getUser(userId);
        setProfileUser(user.data.user);
        setProfileUserTasks(user.data.user.tasks);
      } catch (error) {
        console.log(error.response);
        router.push("/");
        location.reload();
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
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile profileUser={profileUser} />
              <br />
              <Card>
                <CardContent>
                  <h2>投稿したポートフォリオ</h2>
                  <Divider />
                  <br />
                  {profileUserTasks?.map((task: Task, index: number) => (
                    <div key={index}>
                      <Link
                        href={{ pathname: "/task", query: { id: task.id } }}
                      >
                        {task.title}
                      </Link>
                      <br />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              {edit ? (
                <EditAccountProfileDetails
                  profileUser={profileUser}
                  currentUser={currentUser}
                  setEdit={setEdit}
                />
              ) : (
                <AccountProfileDetails
                  profileUser={profileUser}
                  setProfileUser={setProfileUser}
                  setEdit={setEdit}
                />
              )}
            </Grid>
          </Grid>
          <Grid spacing={3} lg={4} md={6} xs={12}></Grid>
        </Container>
      </Box>
    </>
  );
};

export default ProfilePage;
