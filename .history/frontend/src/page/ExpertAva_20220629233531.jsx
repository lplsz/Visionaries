import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import ExpertHeader from "../component/ExpertHeader";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';

const ExpertAva = () => {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const handleChangeTime = (newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <ExpertHeader />
      <div style={{ marginTop: '40px', width: '300px' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker date={value} onChange={(newDate) => handleChangeTime(newDate)} />
        </LocalizationProvider>
      </div>
    </div>


  )

}
export default ExpertAva;