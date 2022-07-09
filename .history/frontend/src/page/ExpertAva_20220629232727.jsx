import { CalendarPicker } from '@mui/x-date-pickers';
import * as React from 'react';

const ExpertAva = () => {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const handleChangeTime = (newValue) => {
    setValue(newValue);
  };
  return (
    <CalendarPicker onChange={handleChangeTime} />
  )

}
export default ExpertAva;