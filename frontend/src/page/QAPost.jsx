import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import StudentHeader from '../component/StudentHeader';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const QAPost = () => {
    return (
        <div style = {{backgroundSize: '100% 100%'}}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <StudentHeader />
            <Container maxWidth="md" component="main"  sx={{paddingTop: '20px'}}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }}} 
                    style={{ 
                        backgroundColor: '#ffffff', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.1)', 
                        borderTop: '1px solid rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(30px)', 
                        boxShadow: '0 15px 25px rgba(0,0,0,0.1)', marginBottom: '10px'}}>
                    <Typography component="h1" variant="h4" align="center">
                        Create Your Question Here
                    </Typography>
                    <React.Fragment>
                        <Grid container spacing={6}>
                            <Typography variant="h6" gutterBottom>
                                Recipe Name
                            </Typography>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="img_src"
                                    label="Enhancement Video URL Here"
                                    fullWidth
                                    variant="standard"
                                    // onChange={e => {props.setVideoURL(e.target.value); setURL(e.target.value)}}
                                />
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </Paper>
            </Container>
        </div>
    );
    
}
export default QAPost;