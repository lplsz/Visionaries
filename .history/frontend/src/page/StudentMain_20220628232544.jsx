/* eslint-disable no-unused-vars */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import StudentHeader from '../component/StudentHeader';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useNavigate } from 'react-router-dom';

const StudentMain = () => {

    const navigate = useNavigate();
    const QuizCard = () => {
        const cards = quizes.map((q, i) => {
          const qProp = {
            id: q.id,
            image: q.thumbnail,
            time: q.time,
            num: q.num,
            title: q.name,
            key: i
          };
          return (
            <GCard quizz={qProp} key={i}></GCard>
          )
        });
        return (
            <Grid container spacing={5}>
            {cards}
            </Grid>
        )
      }
    
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h4" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                BigBrain
              </Typography>
              <LogoutBtn />
            </Toolbar>
          </AppBar>
          <main>
            {/* Hero unit */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  BigBrain
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                  Add new games and have fun !!!
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <span>Quiz name: </span>
                  <input type="text" name='addGame' onChange={e => setName(e.target.value)} />
                  <Button id="addGameBtn" variant="contained" onClick={async () => {
                    if (name === '') {
                      alert('A new quiz required a name');
                    } else {
                      try {
                        const response = await apiCall('admin/quiz/new', 'POST', { name });
                        if (response.status === 400) {
                          console.log(await response.text());
                        }
                        alert('Success fully add');
                        navigate('/');
                        navigate('/quiz/new');
                      } catch (err) {
                        console.log(err);
                      }
                    }
                  }}>
                    Add a new quiz</Button>
                </Stack>
              </Container>
            </Box>
            <Container sx={{ py: 8 }}>
              <QuizCard />
            </Container>
          </main>
          {/* Footer */}
          <Copyright />
          {/* End footer */}
        </ThemeProvider>
    );

    return (
        <div style = {{backgroundColor: '#FCF8E8', backgroundSize: '100% 100%'}}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <StudentHeader />
            <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h2"
                    variant="h2"
                    align="center"
                    color="black"
                    fontWeight='bolder'
                    >
                    Thanks For Contribution!
                    </Typography>
            </Container>
            <Container maxWidth="md" component="main">
                {/* <Grid container spacing={5} alignItems="flex-end">
                <ContributorHomeButton url={setIcon} content={"Menage Your Recipes"} navigate={navigate} router={'/add_recipe'}/>
                <ContributorHomeButton url={addIcon} content={"Creat New Recipe"} navigate={navigate} router={'/add_recipe'}/>
                </Grid> */}
            </Container>
        
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                mt: 8,
                py: [3, 6],
                }}
            >
            </Container>
        </div>
    );
}
export default StudentMain;