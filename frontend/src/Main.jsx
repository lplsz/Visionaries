/*
 * @Author: Echooooo-zhn haonanZHONG17@outlook.com
 * @Date: 2022-06-24 11:37:55
 * @LastEditors: Echooooo-zhn haonanZHONG17@outlook.com
 * @LastEditTime: 2022-06-24 11:38:37
 * @FilePath: \Visionaries\frontend\src\Main.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable quote-props */
/* eslint-disable eol-last */
/* eslint-disable indent */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const apiCall = async (path, method, body) => {
  console.log(body)
  const token = localStorage.getItem('uid');
  const url = 'http://127.0.0.1:5000/' + path;
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
        Visionaries
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
