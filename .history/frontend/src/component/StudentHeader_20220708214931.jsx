/* eslint-disable no-unused-vars */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../Main';
import CardMedia from '@mui/material/CardMedia';
import MAIN from './img/student_header.png'

const theme = createTheme({
  palette: {
    primary: {
      light: '#000000',
      main: '#000000',
      dark: '#000000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#000000',
      main: '#000000',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },

});

export default function StudentHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl); 
  const navigate = useNavigate();
  const sid = localStorage.getItem('sid');
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const RenderMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={()=>{navigate('/student_profile'); handleMenuClose();}}>My Profile</MenuItem>
        <Divider />
        <MenuItem onClick={()=>{
          apiCall('student/logout', 'POST', {id: sid});
          localStorage.removeItem('sid');
          navigate('/'); handleMenuClose()}}>Logout</MenuItem>
      </Menu>
    );
  }
  
    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={
            { backgroundColor:'#ffd40b', position:'relative',borderBottom: (t) => `1px solid ${t.palette.divider}`}}>
          <Toolbar>
            <CardMedia
              component="img"
              sx={{ width: 540, height: '40%', margin: '10px' }}
              image={MAIN}
            />
            
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {sid == null 
              ? <IconButton 
                size="large" 
                aria-label="show 4 new mails" 
                color="primary"
                onClick={()=>{navigate('/student_login')}}
              >
                <AssignmentIcon fontSize="middle"/>
              </IconButton> 
              : <IconButton 
                size="large" 
                aria-label="show 4 new mails" 
                color="primary"
                onClick={()=>{navigate('/student_QA_list')}}
              >
              <AssignmentIcon fontSize="middle"/>
            </IconButton>  }
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="primary"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <RenderMenu/>
      </Box>
    </ThemeProvider>
  )
}