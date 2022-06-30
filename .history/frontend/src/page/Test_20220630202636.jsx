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
  const date = new Date('2022-06-30T00:00:00.000');
  const l = getDays(date)
  return (
    <div>
      <div> {getDays(date)}</div>
      <Grid container spacing={0} cent>
        <Grid item xs={2.4} sx={{ textAlign: 'center' }}>
          MON
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={2.4}>
          TUE
        </Grid>
        <Grid item xs={2.4}>
          WED
        </Grid>
        <Grid item xs={2.4}>
          THU
        </Grid>
        <Grid item xs={2.4}>
          FRI
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {l.map((d, i) => <Grid item xs={2.4}>{d}</Grid>)}
      </Grid>
    </div>

  );
}
export default Test;