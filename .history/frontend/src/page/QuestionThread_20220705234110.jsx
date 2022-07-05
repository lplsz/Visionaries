import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ExpertHeader from "../component/ExpertHeader";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

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

export default function QuestionThread() {
  const [value, setValue] = React.useState(0);
  const [qaList, setQaList] = React.useState([
    { name: 'Rhea', time: '04/09/2022', question: 'How much does it cost?', category: 'vacation', discription: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.', new: 1, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }, { name: 'Rhea Riri', time: '2022/7/5 22:31', body: 'Hi I think you should go too' }, { name: 'Rhea Riri', time: '2022/7/5 22:32', body: 'byebye' }, { name: 'Jimmy Oliver', time: '2022/7/5 22:32', body: 'byebye' }] },
    { name: 'Echo', time: '10/09/2022', question: 'Worried about sharing your concerns?', category: 'mentor', discription: 'All information we gather is completely confidential. Your personal information will not be shared with anyo ', new: 2, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }, { name: 'Rhea Riri', time: '2022/7/5 22:31', body: 'Hi I think you should go too' }, { name: 'Rhea Riri', time: '2022/7/5 22:32', body: 'byebye' }, { name: 'Jimmy Oliver', time: '2022/7/5 22:32', body: 'byebye' }] },
    { name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', discription: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work', new: 0, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }, { name: 'Rhea Riri', time: '2022/7/5 22:31', body: 'Hi I think you should go too' }, { name: 'Rhea Riri', time: '2022/7/5 22:32', body: 'byebye' }, { name: 'Jimmy Oliver', time: '2022/7/5 22:32', body: 'byebye' }] },
    { name: 'Rhea', time: '04/09/2022', question: 'How much does it cost?', category: 'vacation', discription: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.', new: 0, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }, { name: 'Rhea Riri', time: '2022/7/5 22:31', body: 'Hi I think you should go too' }, { name: 'Rhea Riri', time: '2022/7/5 22:32', body: 'byebye' }, { name: 'Jimmy Oliver', time: '2022/7/5 22:32', body: 'byebye' }] },
    { name: 'Echo', time: '10/09/2022', question: 'Worried about sharing your concerns?', category: 'mentor', discription: 'All information we gather is completely confidential. Your personal information will not be shared with anyo ', new: 2, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }, { name: 'Rhea Riri', time: '2022/7/5 22:31', body: 'Hi I think you should go too' }, { name: 'Rhea Riri', time: '2022/7/5 22:32', body: 'byebye' }, { name: 'Jimmy Oliver', time: '2022/7/5 22:32', body: 'byebye' }] },
    { name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', discription: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work', new: 2, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }] },
    { name: 'Rhea', time: '04/09/2022', question: 'How much does it cost?', category: 'vacation', discription: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.', new: 2, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }] },
    { name: 'Echo', time: '10/09/2022', question: 'Worried about sharing your concerns?', category: 'mentor', discription: 'All information we gather is completely confidential. Your personal information will not be shared with anyo ', new: 2, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }] },
    { name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', discription: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work', new: 0, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }] },
    { name: 'Rhea', time: '04/09/2022', question: 'How much does it cost?', category: 'vacation', discription: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.', new: 2, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }] },
    { name: 'Echo', time: '10/09/2022', question: 'Worried about sharing your concerns?', category: 'mentor', discription: 'All information we gather is completely confidential. Your personal information will not be shared with anyo ', new: 1, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }] },
    { name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', discription: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work', new: 1, reply: [{ name: 'Jimmy Oliver', time: '2022/7/5 22:30', body: 'Hi I think you should go ' }] },
  ])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const HandleThread = (props) => {
    return (
      <div>
        <div style={{ display: 'flex' }}><div style={{ fontWeight: 'bold', flex: 1 }}>Category: </div> <div style={{ flex: 9 }}>{props.q.category}</div></div>
        <div style={{ display: 'flex' }}> <div style={{ fontWeight: 'bold', flex: 1 }}>Discription: </div><div style={{ flex: 9 }}>{props.q.discription}</div></div>
      </div>
    )
  }
  return (
    <div>
      <ExpertHeader />
      <div style={{ display: 'flex', marginLeft: '220px', marginTop: '40px' }}>
        <Typography variant="h3" sx={{ padding: 0, margin: 0 }}>Questions</Typography>
      </div>
      <div style={{ marginLeft: '80px' }}>
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
              borderRight: 1, borderColor: 'divider', width: '40%', float: 'left'
            }}
          >
            {qaList.map((q, i) => {
              if (q.new !== 0) {
                return (
                  <Tab classes={{ wrapper: { textAlign: "right" } }} label={<StyledBadge color="secondary" badgeContent={q.new}><div style={{ textAlign: 'left', width: '100%' }}>{q.question}</div></StyledBadge>}{...a11yProps(i)} sx={{ minWidth: '100%', width: '100%', right: '0', alignItems: "flex-start" }} />
                )
              } else {
                return (
                  <Tab classes={{ wrapper: { textAlign: "right" } }} label={<div style={{ textAlign: 'left' }}>{q.question}</div>}{...a11yProps(i)} sx={{ minWidth: '100%', width: '100%', right: '0', alignItems: "flex-start" }} />
                )
              }
            })}

          </Tabs>
          {qaList.map((q, i) => {
            return (
              <TabPanel value={value} index={i}>
                {<HandleThread q={q} />}
              </TabPanel>
            )
          })}

        </Box>
      </div>

    </div>

  );
}