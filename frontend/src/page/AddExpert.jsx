import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { apiCall } from '../Main';



const theme = createTheme();

export default function AddExpert() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const interested_category_ids = categories.filter((category, i) => { return category.checked }).map((categorie) => { return categorie.id });
    const body = ({
      username: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      interested_category_ids: interested_category_ids

    });
    const data2 = await apiCall('/register_expert_account', 'POST', body);
  };
  const setChecked = (value, index) => {
    categories[index].checked = value;
  }
  const [categories, setCategories] = React.useState([]);
  const getCategories = async () => {
    const data = await apiCall('/categories', 'GET');
    data.categories.map((categorie, i) => { categorie.checked = false; return categorie });
    setCategories(data.categories);
  };
  const [i, setI] = React.useState(1);
  if (i === 1) {
    getCategories();
    setI(i + 1);
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Expert
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <div>
              {
                categories.map((category, i) => {
                  return (<FormControlLabel
                    key={i}
                    control={<Checkbox value="remember" color="primary" onClick={(e) => { setChecked(e.target.checked, i); }} />}
                    label={category.category_name}
                  />)
                })
              }
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}