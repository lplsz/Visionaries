import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import ExpertHeader from "../component/ExpertHeader";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
const ExpertAva = () => {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const handleChangeTime = (newValue) => {
    setValue(newValue);
  };
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
                  disablePast
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  showToolbar={false}

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
          ></Box>
        </div>
      </Container>


    </div>


  )

}
export default ExpertAva;