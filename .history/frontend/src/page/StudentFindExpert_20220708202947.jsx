/*
 * @Author: Echooooo-zhn haonanZHONG17@outlook.com
 * @Date: 2022-07-08 13:25:29
 * @LastEditors: Echooooo-zhn haonanZHONG17@outlook.com
 * @LastEditTime: 2022-07-08 20:29:45
 * @FilePath: \Visionaries\frontend\src\page\StudentFindExpert.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from 'react';
import StudentHeader from '../component/StudentHeader'
import Typography from '@mui/material/Typography';
import MAIN from './img/vaccinations.jpg';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import D1 from './img/doctor-img2.png'
import D2 from './img/online-doctor-appointment.png'
import StudentBookingTime from '../component/StudentBookingTime';

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
      <div style={{ marginLeft: '100px', marginTop: '40px' }}>
        {experts.map((e, i) => {
          return (
            <div key={i} style={{ width: '100%' }}>
              <Grid container spacing={0} cent sx={{ width: '100%' }}>
                <Grid item xs={2} sx={{ fontWeight: 'bold', textAlign: 'center' }}>

                  <img alt="docter" src={e.img} style={{ height: '150px', weight: '150px' }}></img>
                  <div>{e.name}</div>
                </Grid>
                <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'center' }} >
                  <div>{e.description}</div>
                </Grid>
                <Grid item xs={5} >
                  <StudentBookingTime />
                </Grid>
              </Grid>
            </div>
          )
        })}
      </div>

    </div>
  )
}
export default StudentFindExpert;