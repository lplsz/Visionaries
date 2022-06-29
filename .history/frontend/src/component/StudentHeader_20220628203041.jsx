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
import StarIcon from '@mui/icons-material/Star';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../Main';

const theme = createTheme({
  palette: {
    primary: {
      light: '#33ab9f',
      main: '#e57373',
      dark: '#00695f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ffea00',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },

});

export default function ExplorerHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl); 
  const navigate = useNavigate();
  const uid = localStorage.getItem('uid');
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
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
      <MenuItem onClick={()=>{navigate('/explorer_profile'); handleMenuClose();}}>My Profile</MenuItem>
      <Divider />
      <MenuItem onClick={()=>{
        apiCall('user/logout', 'POST', {id: uid});
        localStorage.removeItem('uid');
        navigate('/'); handleMenuClose()}}>Logout</MenuItem>
    </Menu>
  );

  
    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={
            { backgroundColor:'#A25B5B', position:'relative',borderBottom: (t) => `1px solid ${t.palette.divider}`}}>
          <Toolbar>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                Crazy Recipe
            </Typography>
            {/* <CardMedia
            component="img"
            sx={{ width: 40 , margin:'10px'}}
            image={MainIcon}
            /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <AssignmentIcon fontSize="middle"/>
              </IconButton>
              <IconButton
                size="large"
                color='secondary'
              >
                  <StarIcon fontSize="middle" />
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
    </ThemeProvider>
)
}