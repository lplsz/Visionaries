import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StudentHeader from "../component/StudentHeader";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import UploadImageChoice from '../component/UploadImageChoice';
import { IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  components: {
    MuiButton: {
      Paper: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          backGround: 'rgba(255, 255, 255, 0.1)',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 15px 25px rgba(0,0,0,0.1)',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#D82148'
    }
  },
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -23,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
function stringAvatar(name) {
  return {
    sx: { fontSize: '15px', height: '40px' },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
export default function StudentQuestionThread() {
  const me = 'Rhea Chang';
  const [value, setValue] = React.useState(0);
  const [qaList, setQaList] = React.useState([
    { name: 'Rhea Chang', time: '04/09/2022', question: 'Why do I need two vaccines?', category: 'vacation', discription: 'According to the current recommendation, why do I need two caccines? Does two vaccines can protect me from attacking by COVID-19.', new: 1, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go and get another booster' }, { name: 'Rhea Chang', time: '2022/7/5 22:31', body: 'Thanks a lot, but can I take it in UNSW?' }, { name: 'Rhea Chang', time: '2022/7/5 22:32', body: 'Do I need to book 1?' }, { name: 'Jimmy Oliver', time: '2022/7/5 22:32', body: 'Yes, you should do on hotdoc' }, { name: 'Rhea Chang', time: '2022/7/5 22:30', body: 'Thanks' }, { name: 'Rhea Chang', time: '2022/7/5 22:32', body: 'byebye' }, { name: 'Jimmy Oliver', time: '2022/7/5 22:32', body: 'byebye' }] },
    { name: 'Echo', time: '10/09/2022', question: 'Worried about sharing your concerns?', category: 'mentor', discription: 'All information we gather is completely confidential. Your personal information will not be shared with anyo ', new: 0, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }, { name: 'Rhea Chang', time: '2022/7/5 22:31', body: 'Hi I think you should go too' }, { name: 'Rhea Chang', time: '2022/7/5 22:32', body: 'byebye' }, { name: 'Jimmy Oliver', time: '2022/7/5 22:32', body: 'byebye' }] },
    { name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', discription: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work', new: 0, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }, { name: 'Rhea Chang', time: '2022/7/5 22:31', body: 'Hi I think you should go too' }, { name: 'Rhea Chang', time: '2022/7/5 22:32', body: 'byebye' }, { name: 'Jimmy Oliver', time: '2022/7/5 22:32', body: 'byebye' }] },

  ])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const HandleReply = (props) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', height: '350px', width: '850px', overflow: 'hidden', overflowY: 'scroll' }}>
        {
          props.q.reply.map((r, i) => {

            if (r.name !== me) {
              return (
                <div>
                  <div style={{ display: 'flex', marginBottom: '3px', }}>
                    <div style={{ display: 'flex', flex: 1, alignContent: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }}><Avatar {...stringAvatar(r.name)} /></div>
                    <div style={{ flex: 8 }}>
                      <div style={{ borderRadius: '15px', background: '#F4F9F9', paddingLeft: '15px', paddingRight: '15px', paddingTop: '8px', paddingBottom: '8px' }}>{r.body}</div>
                    </div>
                    <div style={{ flex: 4, fontSize: '5px', color: 'gray', margin: '5px', marginTop: '0px' }}></div>
                  </div>
                  <div style={{ display: 'flex', marginBottom: '10px' }}>
                    <div style={{ flex: 1 }}></div>
                    <div style={{ marginLeft: '10px', display: 'flex', flex: 8, fontSize: '5px', color: 'gray', marginTop: '0px', alignContent: 'flex-end', justifyContent: 'flex-start' }}>{r.time}</div>
                    <div style={{ flex: 4 }}></div>
                  </div>
                </div>
              )
            } else {
              return (
                <div>
                  <div style={{ display: 'flex', marginBottom: '3px' }}>
                    <div style={{ display: 'flex', flex: 4 }}></div>
                    <div style={{ display: 'flex', flex: 8, alignContent: 'flex-end', justifyContent: 'flex-end' }}>
                      <div style={{ borderRadius: '15px', background: '#EFEFEF', paddingLeft: '15px', paddingRight: '15px', paddingTop: '8px', paddingBottom: '8px' }}>{r.body}</div>
                    </div>
                    <div style={{ display: 'flex', flex: 1, alignContent: 'flex-end', justifyContent: 'flex-start', marginLeft: '10px' }}><Avatar {...stringAvatar(r.name)} /></div>
                  </div>
                  <div style={{ display: 'flex', marginBottom: '10px' }}>
                    <div style={{ flex: 4 }}></div>
                    <div style={{ display: 'flex', flex: 8, fontSize: '5px', color: 'gray', marginRight: '10px', marginTop: '0px', alignContent: 'flex-end', justifyContent: 'flex-end' }}>{r.time}</div>
                    <div style={{ flex: 1 }}></div>
                  </div>
                </div>

              )
            }

          })
        }
      </div >
    )

  }

  const HandleThread = (props) => {
    return (
      <div>
        <div style={{ display: 'flex' }}><div style={{ fontWeight: 'bold', flex: 1 }}>Category: </div> <div style={{ flex: 6 }}>{props.q.category}</div></div>
        <div style={{ display: 'flex' }}> <div style={{ fontWeight: 'bold', flex: 1 }}>Discription: </div><div style={{ flex: 6 }}>{props.q.discription}</div></div>
        <div>
          <HandleReply q={props.q} />
        </div>
        <div style={{ display: 'flex', marginTop: '10px', background: '#F7F7F7', padding: '15px', borderRadius: '15px' }}>
          <div style={{ width: '700px', marginRight: '4px' }}>
            <TextField fullWidth size="small" id="fullWidth" />
          </div>
          <div style={{ width: '40px' }}>
            <IconButton><ArrowUpwardIcon></ArrowUpwardIcon></IconButton>
          </div>
          <div style={{ width: '40px' }}>
            <UploadImageChoice />
          </div>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>

      <StudentHeader />
      <div style={{ display: 'flex', marginLeft: '80px', marginTop: '40px' }}>
        <Typography variant="h3" sx={{ padding: 0, margin: 0 }}>Questions</Typography>
      </div>
      <div style={{ marginLeft: '80px', marginRight: '80px' }}>
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 524 }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1, borderColor: 'divider', minwidth: '450px', maxwidth: '450px', float: 'left',
            }}
          >
            {qaList.map((q, i) => {
              if (q.new !== 0) {
                return (
                  <Tab classes={{ wrapper: { textAlign: "right" } }} label={<StyledBadge color="secondary" badgeContent={q.new}><div style={{ textAlign: 'left', width: '100%' }}>{q.question}</div></StyledBadge>}{...a11yProps(i)} sx={{ minWidth: '450px', width: '450px', right: '0', alignItems: "flex-start", paddingRight: 5 }} />
                )
              } else {
                return (
                  <Tab classes={{ wrapper: { textAlign: "right" } }} label={<div style={{ textAlign: 'left' }}>{q.question}</div>}{...a11yProps(i)} sx={{ minWidth: '300px', width: '300px', right: '0', alignItems: "flex-start" }} />
                )
              }
            })}

          </Tabs>


          {qaList.map((q, i) => {
            return (
              <TabPanel value={value} index={i} sx={{ borderRight: 1, borderColor: 'divider', minwidth: '450px', maxwidth: '450px', float: 'left', }}>
                {< HandleThread q={q} />}
              </TabPanel>
            )
          })}

        </Box>
      </div>

    </ThemeProvider>

  );
}