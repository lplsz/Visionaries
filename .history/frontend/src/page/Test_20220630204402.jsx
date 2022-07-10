import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

function timeFormat(date) {
  if (!date || typeof (date) === "string") {
    this.error("参数异常，请检查...");
  }
  var y = date.getFullYear(); //年
  var m = date.getMonth() + 1; //月
  var d = date.getDate(); //日

  return m + "-" + d;
}

function getFirstDayOfWeek(date, i) {

  var weekday = date.getDay() || 7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7

  date.setDate(date.getDate() - weekday + i);//往前算（weekday-1）天，年份、月份会自动变化
  return timeFormat(date);
}
function getDays(date) {
  const l = []
  for (let i = 1; i < 6; i++) {
    l.push(getFirstDayOfWeek(date, i))
  }
  return l
}


const Test = () => {
  const [date, setDate] = React.useState(new Date('2022-06-30T00:00:00.000'));
  const [l, setL] = React.useState(getDays(date))
  const [i, setI] = React.useState(1)

  function getFirstDayOfNextWeek(date) {

    var weekday = date.getDay() || 7;

    date.setDate(date.getDate() - weekday + 8);
    setL(getDays(date))
    return date;
  }
  return (
    <div>
      <div style={{ width: '100%', display: 'flex' }}>

        <div style={{ flex: 1, textAlign: 'center' }}> <button onClick={() => { console.log('hehe'); setDate(getFirstDayOfNextWeek(date)); setI(i + 1) }}>{'<<'}</button></div>
        <div style={{ flex: 4, textAlign: 'center' }}> {'from' + l[0] + 'to' + l[4]}</div>
        <div style={{ flex: 1, textAlign: 'center' }}> <button>{'>>'}</button></div>
      </div>

      <Grid container spacing={0} cent>
        <Grid item xs={2.4} sx={{ textAlign: 'center' }}>
          MON
        </Grid>
        <Grid item xs={2.4} sx={{ textAlign: 'center' }}>
          TUE
        </Grid>
        <Grid item xs={2.4} sx={{ textAlign: 'center' }}>
          WED
        </Grid>
        <Grid item xs={2.4} sx={{ textAlign: 'center' }}>
          THU
        </Grid>
        <Grid item xs={2.4} sx={{ textAlign: 'center' }}>
          FRI
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        {l.map((d, i) => <Grid item xs={2.4} sx={{ textAlign: 'center' }}>{d}</Grid>)}
      </Grid>
    </div>

  );
}
export default Test;