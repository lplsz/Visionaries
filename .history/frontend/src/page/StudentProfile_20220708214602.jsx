/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import StudentHeader from '../component/StudentHeader';
import { apiCall, Copyright } from '../Main';
import ErrorSnackbar from '../component/ErrorSnackBar';
import SuccessSnackbar from '../component/SuccessSnackBar';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/ArrowCircleLeft';

export default function StudentProfile () {
    const navigate = useNavigate();

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [gender, setGender] = React.useState('Others');
    const [weight, setWeight] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [calories, setCalories] = React.useState(0);
    const [newpassword, setNewPassword] = React.useState('');
    const [confirm_password, setConfirmPassword] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [open2,setOpen2] = React.useState(false);

    // React.useEffect(() =>{
    //   getUserInfo();
    // },[]);

    //get user default information
    // const getUserInfo = async() => {
    //   const userId = localStorage.getItem('uid');
    //   const info = await apiCall('user?id='+ userId, 'GET');
    //   if (typeof (info) === 'string' && info.startsWith('400')) {
    //   setErrorMessage(info.slice(6, info.length - 4));
    //   setOpen(true);
    //   } else {
    //       const userInfo = info.explorer;
    //       setName(userInfo.name);
    //       setEmail(userInfo.email);
    //       setCalories(userInfo.calorie);
    //       setWeight(userInfo.weight);
    //       setHeight(userInfo.height);
    //       if (userInfo.gender === "OTHERS") {
    //         setGender("Others");
    //       } else {
    //         setGender(userInfo.gender);
    //       }
          
    //   } 
    // }

    const changePassword = async () => {
      const userId = localStorage.getItem('uid'); 
      if (newpassword === '' || confirm_password === ' ') {
        setErrorMessage('Password should not be none');
        setOpen(true);
        setNewPassword('');
        setConfirmPassword('');
      } else if (newpassword !== confirm_password ) {
          setErrorMessage('The two passwords are not the same');
          setOpen(true);
          setNewPassword('');
          setConfirmPassword('');
      } 
      
      else {
        const user = {
          id: userId,
          password: confirm_password,
        }
        const data = await apiCall('user', 'POST', user);
        if (typeof (data) === 'string' && data.startsWith('400')) {
          setErrorMessage(data.slice(6, data.length - 4));
          setOpen(true);
          setNewPassword('');
          setConfirmPassword('');
        } else {
          setOpen2(true);
          setNewPassword('');
          setConfirmPassword('');
          navigate('/explorer_profile');
        }
        
      }
    }

    const update = async () => {
      // eslint-disable-next-line prefer-regex-literals
      const reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
      const userId = localStorage.getItem('uid');
      if (email === '') {
        setErrorMessage('Email should not be none');
        setOpen(true);
      }
  
      else if (!(reg.test(email))) {
        setErrorMessage('Not a vaild email');
        setOpen(true);
      } else if (name === '') {
        setErrorMessage('Name should not be none');
        setOpen(true);
      }else if (weight <= 0) {
        setErrorMessage('Invalid weight');
        setOpen(true);
      }else if (height <= 0) {
        setErrorMessage('Invalid height');
        setOpen(true);
      }
      else {
        const user = {
          id: userId,
          name: name,
          email: email,
          gender: gender,
          weight: weight,
          height: height,
          calories: calories,
        }
        const data = await apiCall('user', 'POST', user);
        if (typeof (data) === 'string' && data.startsWith('400')) {
          setErrorMessage(data.slice(3, data.length - 1));
          setOpen(true);
        } 
        else {
          setOpen2(true);
          navigate('/explorer_profile');
        }
      }
    }


    
    return (
        <div style = {{backgroundSize: '100% 100%'}}>
          <StudentHeader />
          <ErrorSnackbar open={open} setOpen={setOpen} message={errorMessage}/>
          <SuccessSnackbar open={open2} setOpen={setOpen2} message={'You have successfully update your profile'}></SuccessSnackbar>
          <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 8, pb: 6 }}>
              <div style={{display:'flex',width:'100%', backgroundColor: '#ffffff', borderRadius: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(30px)', boxShadow: '0 15px 25px rgba(0,0,0,0.1)', marginBottom: '10px'}}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin:'auto',
                    flex:2,
                    paddingTop:'40px',
                    paddingBottom:'40px',
                    borderRight: '1.5px solid rgb(230, 230, 230)'
                    
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'primary.main', backgroundColor:'#000000',color:'white' }}>
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    My profile
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 2, width:'60%' }} style={{}}>

                    <div style={{marginRight:'5%', paddingRight: '5%'}}>
                      <Box sx={{ width: '100%',display: 'flex', alignItems: 'flex-end', marginBottom:'15px'}}>
                        <Grid container spacing={0}>
                        <Grid item xs={3}>
                          <Typography component="h1" variant="h5">
                            Name: 
                          </Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <TextField label="Enter Name Here" fullWidth variant="standard" size="medium"  onChange = {e => setName(e.target.value)} value={name}/>
                          </Grid>
                          </Grid>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom:'15px'}}>
                      <Grid container spacing={0}>
                      <Grid item xs={3}>
                        <Typography component="h1" variant="h5">
                          Email: 
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <TextField fullWidth label="Enter Email Here" variant="standard" size="medium" style={{}} onChange = {e => setEmail(e.target.value)} value={email}/>
                        </Grid>
                      </Grid>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' , marginBottom:'15px'}}>
                        <Grid container spacing={0}>
                        <Grid item xs={3}>
                        <Typography component="h1" variant="h5">
                          Contact:
                        </Typography>
                        </Grid>
                        <Grid item xs={9}>
                        <TextField fullWidth label="Enter Contact Number Here" variant="standard" size="medium" onChange = {e => setWeight(e.target.value)} value={weight}/>
                      </Grid>
                      </Grid>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' , marginBottom:'15px'}}>
                      <Grid container spacing={0}>
                        <Grid item xs={3}>
                        <Typography component="h1" variant="h5">
                          {"Height: "}
                        </Typography>
                        </Grid>
                        <Grid item xs={9}>
                        <TextField fullWidth label="Enter Height (cm) Here" variant="standard" size="medium"  onChange = {e => setHeight(e.target.value)} value={height}/>
                      </Grid>
                      </Grid>
                      </Box>
                      {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' , marginBottom:'15px'}}>
                          <Typography component="h1" variant="h5">
                            {`Calories: ${calories}`}
                          </Typography>
                      </Box> */}
                      <Typography component="h6" variant="h6" style={{marginTop: '30px'}}>
                        {"Choose Your Gender Here: "}
                      </Typography>
                      <FormControl sx={{width: '100%'}}>
                      <InputLabel id="gender">Gender</InputLabel>
                      <Select
                        labelId="gender"
                        id="gender"
                        label="Gender"
                        onChange={e => setGender(e.target.value)}
                        value={gender}
                    
                      >
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Others"}>Others</MenuItem>
                      </Select>
                      </FormControl>
                      <Button
                        fullWidth
                        id="submit_Login"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor:'#000000',color:'white' }}
                        onClick={update}
                      >
                        UPDATE
                      </Button>
                    </div>
                  </Box>
                </Box>

                <Box
                  sx={{
                    paddingLeft: '40px',
                    paddingRight:'40px',
                    paddingTop:'80px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    verticalAlign: 'middle',
                    flex:1,
                    backgroundColor: 'rgb(240,240,240)',
                    borderRadius: '0px 10px 10px 0px'
                  }}
                >
                  <Typography component="h1" variant="h5" style={{paddingTop: '30%'}}>
                    Change Password
                  </Typography>
                  <div style={{alignItems: 'center', flexDirection: 'column'}}>
                    
                    <Box component="form" noValidate sx={{ mt: 1 }}>

                      <TextField
                        margin="normal"
                        fullWidth
                        id="newPassword"
                        label="new password"
                        name="new password"
                        autoComplete="new password"
                        value={newpassword}
                        onChange = {e => setNewPassword(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        fullWidth
                        id="newPasswordConfirm"
                        label="re-enter new password"
                        name="re-enter new password"
                        autoComplete="new password"
                        value={confirm_password}
                        onChange = {e => setConfirmPassword(e.target.value)}
                      />
                      <Button
                        fullWidth
                        id="submit_Login"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor:'#000000',color:'white' }}
                        onClick={changePassword}
                      >
                        CONFIRM
                      </Button>
                    </Box>
                  </div>
            </Box>
          </div>
            <div style={{display:'flex', justifyContent: 'flex-end' , alignItems: 'flex-end', marginTop: '40px'}}>
              <Button size="large"  sx={{backgroundColor:'#000000',color:'white'}} onClick={(event) => {navigate('/explorer_main') }} endIcon={<KeyboardReturnOutlinedIcon size="large" />} >Return</Button>
            </div>
            </Container>
        </div>
      );
}