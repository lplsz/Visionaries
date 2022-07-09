/* eslint-disable no-unused-vars */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import StudentHeader from '../component/StudentHeader';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useNavigate } from 'react-router-dom';
import QACard from '../component/QACard';

const categories = [
    {
      icon: <LoginIcon fontSize="large" color="success"/>,
      title: 'Student',
      buttonText1: 'Sign up your account',
      buttonText2: 'Register for free',
      buttonVariant: 'outlined',
      navigator1: '/student_login',
      navigator2: '/student_register'
    },
    {
      icon: <AssignmentIndIcon fontSize="large" color="secondary"/>,
      title: 'Expert',
      buttonText1: 'Sign up your account',
      buttonText2: 'Register for free',
      buttonVariant: 'outlined',
      navigator1: '/Expert_login',
      navigator2: '/Expert_register'
    },
  ];

const StudentMain = () => {

    const navigate = useNavigate();

    const CategoryCard = () => {
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
                <QACard quizz={qProp} key={i}></QACard>
            )
        });
        return (
            <Grid container spacing={5}>
                {cards}
            </Grid>
        )
    }

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
                {/* <Container sx={{ py: 8 }}></Container> */}
                <CategoryCard />
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