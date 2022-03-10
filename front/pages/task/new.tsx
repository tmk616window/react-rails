import {
    Box,
    Container,
    Grid
  } from '@material-ui/core';
  import NewTaskDetails from '../../src/components/Task/NewTaskDetails';
  import TaskProlangs from '../../src/components/Task/TaskProlangs'
  import TaskTools from '../../src/components/Task/TaskTools'


  export default function Task() {

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
                lg={1}
                md={1}
                xs={12}
              >
              </Grid>
              <Grid
                item
                lg={10}
                md={10}
                xs={12}
              >
                <NewTaskDetails />
              </Grid>
              <Grid
                item
                lg={1}
                md={1}
                xs={12}
              >
                <br/>
              </Grid>
            </Grid>

          </Container>
        </Box>
      </>  
    )
  };
  
  