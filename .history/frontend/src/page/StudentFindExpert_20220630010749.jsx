import * as React from 'react';
import StudentHeader from '../component/StudentHeader'
import Typography from '@mui/material/Typography';
import MAIN from './img/vaccinations.jpg';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const StudentFindExpert = () => {

  const category = 'Vaccinations'
  const FilterCategory = () => {
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[{ label: 'Breakfast' }, { label: 'Lunch' }, { label: 'dinner' }, { label: 'afternoon tea' }, { label: 'others' }]}

        renderInput={(params) => <TextField {...params} label="Category" />}
        size="small"
        sx={{ width: '300px' }}
      />
    );
  }
  return (
    <div>
      <StudentHeader />
      <div style={{ display: 'flex', marginLeft: '200px', marginTop: '40px' }}>
        <Typography variant="h2" sx={{ marginTop: '30px' }}>{category}</Typography>
        <img
          style={{ width: '100px', height: '100px' }}
          src={MAIN}
          alt='ingred'
        />
        <div style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          margin: 'auto',
          width: '100%',
          paddingLeft: '10px',
          paddingRight: '0px'
        }}>Catgory: <FilterCategory /></div>

      </div>
    </div>
  )
}
export default StudentFindExpert;