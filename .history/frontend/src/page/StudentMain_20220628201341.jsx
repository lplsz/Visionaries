/* eslint-disable no-unused-vars */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import background from './img/create_recipe_bg.jpg';
import ContributorHeader from '../component/ContributorHeader';
import GlobalStyles from '@mui/material/GlobalStyles';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ContributorHomeCard from '../component/ContributorHomeCard';
import { useNavigate } from 'react-router-dom';
import ContributorHomeButton from '../component/ContributorHomeButton';
import setIcon from '../page/img/table.jpg';
import addIcon from '../page/img/create_recipe_bg.jpg';
const StudentMain = () => {
    const navigate = useNavigate();
    return (
        // <div style = {{backgroundImage: `url(${background})`, backgroundSize: '100% 100%'}}>
        <div style = {{backgroundColor: '#FCF8E8', backgroundSize: '100% 100%'}}>
          <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
          <CssBaseline />
          <ContributorHeader />
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
              {tiers.map((tier, index) => <ContributorHomeCard key={index} tier={tier} navigate={navigate} />)}
            </Grid> */}
            <Grid container spacing={5} alignItems="flex-end">
              <ContributorHomeButton url={setIcon} content={"Menage Your Recipes"} navigate={navigate} router={'/add_recipe'}/>
              <ContributorHomeButton url={addIcon} content={"Creat New Recipe"} navigate={navigate} router={'/add_recipe'}/>
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
export default StudentMain;