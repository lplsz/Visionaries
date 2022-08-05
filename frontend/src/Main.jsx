/* eslint-disable quote-props */
/* eslint-disable eol-last */
/* eslint-disable indent */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const apiCall = async (path, method, body) => {
  console.log(body)
  const token = localStorage.getItem('token');
  const url = 'http://127.0.0.1:5000/' + path;
  const init = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': (path === 'login' || path === 'expert_register' || path === 'student_register') ? undefined : `Bearer ${token}`,
    },
    body: method === 'GET' ? undefined : JSON.stringify(body),
  };
  console.log(init)
  try {
    const response = await fetch(url, init);
    if (response.status !== 200 && response.status !== 201) {
      const data = await response.json()
      console.log(data);
      return `${response.status}` + data.message;
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
        Visionaries
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}