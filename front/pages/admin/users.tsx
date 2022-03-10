// import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import UserListResults from '../../src/components/Admin/UserListResults';
import UserListToolbar from '../../src/components/Admin/UserListToolbar';
// import users from '../../__mocks__/users';

const UserList = () => (
  <>

    {/* <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet> */}
      <Container maxWidth={false}>
        <UserListToolbar />
        <Box sx={{ pt: 3 }}>
          <UserListResults />
        </Box>
      </Container>
  </>
);

export default UserList;
