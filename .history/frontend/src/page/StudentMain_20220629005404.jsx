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
import CareerAdvice from './img/career_advice.jpg';
import COVID19 from './img/covid-19.jpg';
import MentalHealth from './img/mental_health_amid.jpg';
import Others from './img/others.jpg';
import StudyFromHome from './img/study_from_home.jpg';
import Vaccinations from './img/vaccinations.jpg';
import WellBeing from '../component/img/well_being.jpg';

const categories = [
    {
        id: 0,
        category_name: 'Career Advice',
        category_image_url: CareerAdvice,
        category_description: 'Career Advice',
    },
    {
        id: 1,
        category_name: 'Covid-19',
        category_image_url: COVID19,
        category_description: 'Covid-19',
    },
    {
        id: 2,
        category_name: 'Mental Health Amid',
        category_image_url: MentalHealth,
        category_description: 'Mental Health Amid',
    },
    {
        id: 3,
        category_name: 'Study From Home',
        category_image_url: StudyFromHome,
        category_description: 'Study From Home',
    },
    {
        id: 4,
        category_name: 'Vaccinations',
        category_image_url: Vaccinations,
        category_description: 'Vaccinations',
    },
    {
        id: 5,
        category_name: 'Others',
        category_image_url: Others,
        category_description: 'Others',
    },
];

const StudentMain = () => {

    const navigate = useNavigate();

    const CategoryCard = () => {
        const cards = categories.map((c, i) => {
            const cProp = {
                id: c.id,
                category_name: c.name,
                category_image_url: c.category_image_url,
                category_description: c.category_description,
                key: i
            };
            return (
                <QACard category={cProp} key={i}></QACard>
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
                {/* <CategoryCard /> */}
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