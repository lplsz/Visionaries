/* eslint-disable no-unused-vars */
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { Copyright } from '../Main';
import HomeCard from '../component/HomeCard';
import LoginIcon from '@mui/icons-material/Login';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import background from './img/background.jpg'

const tiers = [
  {
    icon: <LoginIcon fontSize="large" color="success"/>,
    title: 'Explorer',
    buttonText1: 'Sign up your account',
    buttonText2: 'Register for free',
    buttonVariant: 'outlined',
    navigator1: '/explorer_login',
    navigator2: '/explorer_register'
  },
  {
    icon: <AssignmentIndIcon fontSize="large" color="secondary"/>,
    title: 'Contributor',
    buttonText1: 'Sign up your account',
    buttonText2: 'Register for free',
    buttonVariant: 'outlined',
    navigator1: '/contributor_login',
    navigator2: '/contributor_register'
  },
];

function HomePage () {
  const navigate = useNavigate();
  return (
    <div style = {{backgroundImage: `url(${background})`, backgroundSize: '100% 100%'}}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h1"
          align="center"
          color="white"
          gutterBottom
        >
          Welcome to Crazy Recipe!
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier, index) => <HomeCard key={index} tier={tier} navigate={navigate} />)}
        </Grid>
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

export default HomePage;
