/* eslint-disable quote-props */
/* eslint-disable eol-last */
/* eslint-disable indent */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const apiCall = async (path, method, body) => {
  console.log(body)
  const token = localStorage.getItem('uid');
  const url = 'http://43.154.135.34:5000/' + path;
  const init = {
    method: method,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': (path === 'admin/auth/register' || path === 'admin/auth/login') ? undefined : `Bearer ${token}`,
    },
    body: method === 'GET' ? undefined : JSON.stringify(body),
  };
  console.log(init)
  try {
    const response = await fetch(url, init);
    if (response.status === 400) {
      const data = await response.json()
      console.log(data);
      return '400' + data.message;
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Crazy Recipe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
