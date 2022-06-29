import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../Main';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LoginIcon from '@mui/icons-material/Login';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Photo from './img/contributor_main_page_bg.jpg'
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';

const theme = createTheme();

const StudentRegister = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const value = 1;
    const register = async () => {
    // eslint-disable-next-line prefer-regex-literals
        if (email === '') {
            setErrorMessage('Email should not be none');
            setOpen(true);
        } else if (password === '') {
            setErrorMessage('Password should not be none');
            setOpen(true);
        } else if (name === '') {
            setErrorMessage('Name should not be none');
            setOpen(true);
        }  else {
            const user = {
                email: email,
                password: password,
                name: name,
            }
            const data = await apiCall('user/register', 'POST', user);
            if (typeof (data) === 'string' && data.startsWith('400')) {
                setErrorMessage(data.slice(6, data.length - 4));
                setOpen(true);
            } else {
                localStorage.setItem('uid', data.id);
                navigate('/explorer_main');
            }
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" sx={{ width:'50%' }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 },display:'flex'}} style={{ backgroundColor: '#ffffff', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.1)', borderTop: '1px solid rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(30px)', boxShadow: '0 15px 25px rgba(0,0,0,0.1)', marginBottom: '10px'}}>
                    <CardMedia
                        component="img"
                        sx={{ height:'500px', width:'50%'}}
                        image={Photo}
                    />
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    marginLeft:3,
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                    <Alert
                        severity="error"
                        action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                            setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {errorMessage}
                    </Alert>
                    </Collapse>
                </Box>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Explorer Register
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            autoComplete="name"
                            name="Name"
                            required
                            fullWidth
                            id="Name"
                            label="Name"
                            autoFocus
                            onChange={e => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                        <Button
                        fullWidth
                        id="submit_Register"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={register}>
                        Sign Up
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    if (newValue === 0) {
                        navigate('/explorer_login');
                    } 
                }}
            >
                <BottomNavigationAction label="Login" icon={<LoginIcon />} />
                <BottomNavigationAction label="Register" icon={<AssignmentIndIcon />} />
            </BottomNavigation>
        </Container>
    </ThemeProvider>
  );
}
export default StudentRegister;