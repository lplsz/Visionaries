// import React, { useState } from 'react';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

function timeFormat(date) {
  if (!date || typeof (date) === "string") {
    this.error("参数异常，请检查...");
  }
  var y = date.getFullYear(); //年
  var m = date.getMonth() + 1; //月
  var d = date.getDate(); //日

  return m + "/" + d;
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Test = () => {
  const time = ['09:00am', '09:30am', '10:00am', '10:30am', '11:00am', '01:00pm', '01:30pm', '02:00pm', '02:30pm', '03:00pm', '03:30pm', '04:00pm', '04:30pm'];
  const [date, setDate] = React.useState(new Date('2022-06-30T00:00:00.000'));
  const [l, setL] = React.useState(getDays(date))
  const [i, setI] = React.useState(1)
  const timeTable = [
    [true, false, true, false, false, false, false, true, true, true, false, false, false],
    [true, true, true, true, false, true, false, false, false, false, false, false, false],
    [true, false, false, false, true, true, true, false, false, false, true, false, false],
    [true, false, false, false, true, true, true, false, false, true, false, false, false],
    [true, false, false, false, false, true, false, false, true, true, false, false, false],
  ]
  const week = ['#ebb6b6', '#f7dbbe', '#fcecbf', '#c4d8db', '#beb6d2']
  const week2 = ['#f7dddd', '#f9e9d8', '#fff5d9', '#d8e4e6', '#eee8ff']
  const [selectTime, setSelectTime] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  function getFirstDayOfNextWeek(date) {

    var weekday = date.getDay() || 7;

    date.setDate(date.getDate() - weekday + 8);
    setL(getDays(date))
    return date;
  }
  function getFirstDayOfLastWeek(date) {

    var weekday = date.getDay() || 7;

    date.setDate(date.getDate() - weekday - 6);
    setL(getDays(date))
    return date;
  }


  function SimpleDialog(props) {
    const { onClose, open } = props;
    const handleClose = () => {
      onClose();
    };
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Make sure to book the meeting?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {selectTime}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    );
  }


  const TimeTables = () => {
    const ll = []
    for (let j = 0; j < 13; j++) {
      const lll = []
      for (let z = 0; z < 5; z++) {
        lll.push(timeTable[z][j])
      }
      ll.push(lll)
    }
    return ll.map((lls, x) => {
      return (
        <Grid container spacing={0}>
          {lls.map((bo, y) => {
            if (bo) {
              return (
                <Grid item xs={2.4} sx={{ display: 'flex', height: '20px', background: week2[y] }}> <button onClick={() => { setSelectTime(x.toString() + time[x]); setOpen(true) }} style={{ border: 'none', borderRadius: '8px', margin: 'auto', height: '90%', width: '90%', background: week[y], fontWeight: 'bold', color: 'black', fontSize: '6px', textAlign: 'center' }}>{time[x]}</button></Grid>
              )

            } else {
              return (<Grid item xs={2.4} sx={{ background: week2[y] }} > </Grid>)
            }

          })}
        </Grid >
      )
    })
  }
  return (
    <div style={{ width: '400px', height: '300px' }} >
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ flex: 1, textAlign: 'center' }}> <IconButton size='small' onClick={() => { console.log('hehe'); setDate(getFirstDayOfLastWeek(date)); setI(i + 1) }}><KeyboardDoubleArrowLeftIcon size='small' /></IconButton></div>
        <div style={{ flex: 12, textAlign: 'center' }}> <Grid container spacing={0} cent>
          <Grid item xs={2.4} sx={{ background: '#ea9999', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            MON
          </Grid>
          <Grid item xs={2.4} sx={{ background: '#f9cb9c', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            TUE
          </Grid>
          <Grid item xs={2.4} sx={{ background: '#ffe599', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            WED
          </Grid>
          <Grid item xs={2.4} sx={{ background: '#a2c4c9', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            THU
          </Grid>
          <Grid item xs={2.4} sx={{ background: '#aa9dcb', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            FRI
          </Grid>
        </Grid>
          <Grid container spacing={0}>
            {l.map((d, i) => <Grid item xs={2.4} sx={{ background: week[i], fontWeight: 'bold', color: 'white', fontSize: '12px', textAlign: 'center' }}>{d}</Grid>)}
          </Grid>
          <TimeTables></TimeTables></div>
        <div style={{ flex: 1, textAlign: 'center' }}> <IconButton size='small' onClick={() => { console.log('hehe'); setDate(getFirstDayOfNextWeek(date)); setI(i + 1) }}><KeyboardDoubleArrowRightIcon size='small' /></IconButton></div>
      </div>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />

    </div >

  );
}
export default Test;