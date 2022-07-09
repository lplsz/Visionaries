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
import Box from '@mui/material/Box';
const ExpertAva = () => {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const minDate = new Date('2022-01-01T00:00:00.000');
  const maxDate = new Date('2024-01-01T00:00:00.000');
  const time = ['9:00am-10:00am', '10:00am-11:00am', '11:00am-12:00pm', '12:00pm-1:00am', '9:00am-10:00am', '10:00am-11:00am', '11:00am-12:00pm', '12:00pm-1:00am'];
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleChangeTime = (newValue) => {
    setValue(newValue);
  };
  const TimeList = () => {
    return (
      time.map((value, i) => {
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
      }))
  }

  return (
    <div>
      <ExpertHeader />
      <div style={{ display: 'flex', marginLeft: '200px', marginTop: '40px' }}>

      </div>
      <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 8, pb: 6, paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
        <div style={{ display: 'flex', width: '100%', backgroundColor: '#ffffff', borderRadius: '10px', marginBottom: '10px' }}>
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
              height: '530px'
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
                  minDate={minDate}
                  maxDate={maxDate}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
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
              width: '100%',
              paddingTop: '0px',
              paddingLeft: '40px',
              paddingRight: '40px',
              height: '530px'
            }}
          >
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <TimeList />
            </List>

          </Box>
        </div>
      </Container>


    </div>


  )

}
export default ExpertAva;