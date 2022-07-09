import * as React from 'react';
import StudentHeader from '../component/StudentHeader'
import Typography from '@mui/material/Typography';
import MAIN from './img/vaccinations.jpg';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Moment from 'react-moment';
import Grid from '@mui/material/Grid';
import D1 from './img/doctor-img2.png'
import D2 from './img/online-doctor-appointment.png'
const StudentFindExpert = () => {
  const experts = [{ img: D1, name: 'Dr Susan Hodgens', description: "General Practitioner, Female, MBChB, MRCGP, DRCOG, FRACGP \n MBChB, DRCOG, FRACGP, MRCGP \nDr Susan Hodgens qualified in Great Britain in 1990. After general training in medicine, surgery, obstetrics and gynaecology, casualty and paediatrics, she qualified as a GP in 1995. \nDr Hodgens works in all areas of family medicine and has special interests in Women's Health, Sexual Health, Skin Cancer Diagnosis and Surgery with Post Graduate Certificates in both. Dr Sue also performs mirena insertions." },
  { img: D2, name: 'Dr Htin Kyaw', description: 'General Practitioner, Male, DCH, MBBS, FRACGP \n MBBS, DCH, FRACGP \n Dr Htin Kyaw has been working as a Medical Practitioner since 2000. He has had clinical experiences in Myanmar (Burma), UK and Australia. Htin and his wife, Dr Khin migrated to Australia in 2006. Before joining the General Practice industry, he worked in various tertiary hospitals in the UK and in Australia in a range of specialities.' },
  { img: D1, name: 'Dr Hemangkumar Mahendra Mayatra', description: 'General Practitioner, Male, AMC \n MD Dr Hemang was born in India and studied his MD in Medicine in Russia. He has attained an AMC Certificate and is fluent in multiple languages including Hindi, Gujarati and Russian.' }]
  const category = 'Vaccinations'
  const FilterCategory = () => {
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[{ label: 'Breakfast' }, { label: 'Lunch' }, { label: 'dinner' }, { label: 'afternoon tea' }, { label: 'others' }]}

        renderInput={(params) => <TextField {...params} label="Category" />}
        size="small"
        sx={{ width: '250px', marginLeft: '5px' }}
      />
    );
  }
  const dateToFormat = new Date('1976-04-19T12:59-0500');

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
          paddingLeft: '40px',
          paddingTop: '40px',
          paddingRight: '0px'
        }}>Catgory: <FilterCategory /></div>

      </div>
      {experts.map((e, i) => {
        <div key={i}>
          dddddddddddddddddddddddddddd
          <Grid container spacing={0} cent>
            <Grid item xs={3} sx={{ background: '#aa9dcb', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
              <div>{e.name}</div>
              <image alt="docter" src={e.img} style={{ height: '200px', weight: '200px' }}></image>
            </Grid>
          </Grid>
        </div>
      })}
    </div>
  )
}
export default StudentFindExpert;