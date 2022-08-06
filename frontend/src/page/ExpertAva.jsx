/* eslint-disable no-unused-vars */
import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import ExpertHeader from "../component/ExpertHeader";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const ExpertAva = () => {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const minDate = new Date('2022-01-01T00:00:00.000');
  const maxDate = new Date('2024-01-01T00:00:00.000');
  const time = ['09:00am-9:30am', '09:30am-10:00am', '10:00am-10:30am', '10:30am-11:00am', '11:00am-11:30am', '01:00pm-1:30am', '01:30pm-02:00pm', '02:00pm-02:30am', '02:30pm-03:00pm', '03:00pm-03:30am', '03:30pm-04:00pm', '04:00pm-04:30am', '04:30pm-05:00pm'];
  const bookedTime = ['09:00am-9:30am', '11:00am-11:30am'];
  const [checked, setChecked] = React.useState([]);
  const [checkedId, setCheckedId] = React.useState([]);
  console.log(checked);
  console.log(checkedId);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const newCheckedId = [...checkedId];

    if (currentIndex === -1) {
      newChecked.push(value);
      newCheckedId.push(time.indexOf(value) + 1);
    } else {
      newChecked.splice(currentIndex, 1);
      newCheckedId.splice(currentIndex, 1);
    }
    setCheckedId(newCheckedId);
    setChecked(newChecked);
  };

  const handleChangeTime = (newValue) => {
    setValue(newValue);
  };
  const TimeList = () => {
    return (
      time.map((value, i) => {
        if (bookedTime.indexOf(value) === -1) {
          const labelId = `checkbox-list-secondary-label-${i}`;
          return (
            <ListItem
              key={i}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        } else {
          const labelId = `checkbox-list-secondary-label-${i}`;
          return (
            <ListItem
              key={i}
              secondaryAction={
                <Checkbox
                  disabled
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        }

      }))
  }

  Date.prototype.Format = function (fmt) {
    var o = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'H+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'S+': this.getMilliseconds()
    };

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(String(o[k]).length)));
      }
    }
    return fmt;
  };

  const handleSubmit = () => {
    const l = []

    for (const id of checkedId) {
      const now = new Date(value);
      const datevalue = now.Format('yyyy-MM-dd');
      l.push({
        date: datevalue,
        expert_id: localStorage.getItem('id'),
        meeting_metadata: null,
        status: "available",
        student_id: null,
        time_range_id: id
      })
    }
    console.log(l);
  }


  return (
    <div>
      <ExpertHeader />
      <div style={{ display: 'flex', marginLeft: '220px', marginTop: '10px' }}>
        <Typography variant="h3" sx={{ padding: 0, margin: 0 }}>Availability</Typography>
      </div>

      <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 6, pb: 6, paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
        <div style={{ display: 'flex', width: '100%', backgroundColor: '#ffffff', borderRadius: '10px' }}>
          <Box
            sx={{
              alignItems: 'center',
              margin: 'auto',
              flex: 2,
              width: '100%',
              paddingTop: '0px',
              paddingBottom: '40px',
              borderRight: '2.0px solid rgb(230, 230, 230)',
              paddingLeft: '40px',
              paddingRight: '40px',
              height: '500px'
            }}
          >
            <div style={{ marginTop: '40px', width: '200px' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  orientation="portrait"
                  openTo="day"
                  value={value}
                  onChange={handleChangeTime}
                  disablePast
                  maxDate={maxDate}
                  renderInput={(params) => <TextField {...params} />}
                  onAccept={() => { console.log('hehe') }}
                  closeOnSelect={false}
                />
              </LocalizationProvider>
            </div>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              margin: 'auto',
              flex: 3,
              display: 'flex',
              width: '100%',
              paddingTop: '0px',
              paddingLeft: '80px',
              height: '500px'
            }}
          >
            <div style={{ margin: 'auto', flex: 3 }}>
              <Typography variant="h5">Available Time</Typography>
              <List dense sx={{ width: '90%', bgcolor: 'background.paper' }}>
                <TimeList />
              </List>
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
              <Button sx={{ margin: 0, borderColor: 'gray', height: '55px', background: 'white', color: 'black' }} variant="outlined" onClick={handleSubmit}> Submit </Button>
            </div>
          </Box>
        </div>
      </Container >


    </div >


  )

}
export default ExpertAva;