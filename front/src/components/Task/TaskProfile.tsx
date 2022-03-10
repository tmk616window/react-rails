import Link from 'next/link'
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@material-ui/core';
import {User} from '../../type/interfaces'
import {displayImage} from '../../api/common/DisplayImage'
interface UserParams{
  user: User
}

  
 const TaskProfile = ({user}: UserParams) => {


   return (
    <>
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >

        <Avatar 
        src={displayImage(`https://enjob.work/${user.image?.url}`)}
        />
        
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            <Link href={{ pathname: '/profile', query: { id: user.id } }}>{user.email}</Link>
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      
    </Card>
    </>
  );
}
  export default TaskProfile
  