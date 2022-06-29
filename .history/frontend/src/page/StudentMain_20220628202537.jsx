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