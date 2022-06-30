import * as React from 'react';
import StudentHeader from '../component/StudentHeader'
import Typography from '@mui/material/Typography';
import MAIN from './img/vaccinations.jpg';
const StudentFindExpert = () => {


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
      </div>
    </div>
  )
}
export default StudentFindExpert;