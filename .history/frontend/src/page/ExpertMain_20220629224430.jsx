import * as React from 'react';
import ExpertHeader from "../component/ExpertHeader";
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import FeedbackIcon from '@mui/icons-material/Feedback';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import QAICON from './img/q&a.png'

const ExpertMain = () => {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [qaList, setQaList] = React.useState([
    { name: 'Rhea', time: '04/09/2022', question: 'How much does it cost?', category: 'vacation', answer: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.' },
    { name: 'Echo', time: '10/09/2022', question: 'Worried about sharing your concerns?', category: 'mentor', answer: 'All information we gather is completely confidential. Your personal information will not be shared with anyone without your consent, this includes your faculty or lecturers. For further information, see our privacy statement by clicking here. ' },
    { name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', answer: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work out what might help. We always work with you as an individual and will always treat you with respect.', video: 'https://youtu.be/wm5nhB0lYL8' },
    { name: 'Rhea', time: '04/09/2022', question: 'How much does it cost?', category: 'vacation', answer: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.' },
    { name: 'Echo', time: '10/09/2022', question: 'Worried about sharing your concerns?', category: 'mentor', answer: 'All information we gather is completely confidential. Your personal information will not be shared with anyone without your consent, this includes your faculty or lecturers. For further information, see our privacy statement by clicking here. ' },
    { name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', answer: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work out what might help. We always work with you as an individual and will always treat you with respect.', video: 'https://youtu.be/wm5nhB0lYL8' },
    { name: 'Rhea', time: '04/09/2022', question: 'How much does it cost?', category: 'vacation', answer: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.' },
    { name: 'Echo', time: '10/09/2022', question: 'Worried about sharing your concerns?', category: 'mentor', answer: 'All information we gather is completely confidential. Your personal information will not be shared with anyone without your consent, this includes your faculty or lecturers. For further information, see our privacy statement by clicking here. ' },
    { name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', answer: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work out what might help. We always work with you as an individual and will always treat you with respect.', video: 'https://youtu.be/wm5nhB0lYL8' },
    { name: 'Rhea', time: '04/09/2022', question: 'How much does it cost?', category: 'vacation', answer: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.' },
    { name: 'Echo', time: '10/09/2022', question: 'Worried about sharing your concerns?', category: 'mentor', answer: 'All information we gather is completely confidential. Your personal information will not be shared with anyone without your consent, this includes your faculty or lecturers. For further information, see our privacy statement by clicking here. ' },
    { name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', answer: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work out what might help. We always work with you as an individual and will always treat you with respect.', video: 'https://youtu.be/wm5nhB0lYL8' },
  ])


  const SingleQA = (props) => {

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '0px', marginBottom: '3px', marginRight: '10px' }}> <Typography sx={{ fontSize: '6px' }}>{props.data.time} </Typography></div>
        <div style={{ display: 'flex' }}>
          <div> <Typography >{props.data.name}: </Typography></div>
          <div>
            <Typography sx={{ marginLeft: '10px' }}>{props.data.answer} </Typography>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <IconButton
              size="middle"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => { }}
            >
              <EditIcon fontSize="middle" />
            </IconButton>

          </div>
        </div>
      </div>

    )
  }

  const PotantialQA = () => {
    return (
      <div>
        {qaList.map((data, i) => {
          return (
            <div key={i} style={{ marginTop: '5px', width: '100%', marginBottom: '5px' }}>
              <Accordion fullWidth expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
                <AccordionSummary

                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${i}bh-content`}
                  id={`panel${i}bh-header`}
                >
                  <Typography sx={{ flexShrink: 0 }}>
                    {data.question}
                  </Typography>
                  <div style={{ width: '100%', marginRight: '10px', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                    <Chip
                      label={data.category}
                      size="small"
                    />
                  </div>

                </AccordionSummary>
                <AccordionDetails>

                  <SingleQA data={data} />
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </div>
    );
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
              flex: 3,
              width: '100%',
              paddingTop: '0px',
              paddingBottom: '40px',
              borderRight: '2.0px solid rgb(230, 230, 230)',
              paddingLeft: '40px',
              paddingRight: '40px',
              height: '400px'
            }}
          >
            <Typography variant='h5'>Students' Question</Typography>
            <div style={{ width: '100%', height: '350px', overflow: 'hidden', overflowY: 'scroll' }}>
              <div style={{ paddingRight: '10px' }}>
                <PotantialQA />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyItems: 'center', marginTop: '20px' }}>
              <div style={{ borderRadius: '10px', background: '#f48fb1', padding: '5px', margin: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center' }}>
                <div>
                  <image style={{ width: '60px', height: '60px', margin: '10px' }} src={QAICON} alt={'image'} />
                </div>
                <Button sx={{ marginTop: '5px', borderColor: 'white', height: '55px', color: '#b25977', background: 'white' }} fullWidth variant="outlined">Schedule Meeting</Button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center' }}>
                <div><InterpreterModeIcon sx={{ margin: 'auto', fontSize: 60, color: '#f48fb1' }} /> </div>
                <Button sx={{ marginTop: '5px', borderColor: 'gray', height: '55px', color: '#b25977' }} fullWidth variant="outlined">Schedule Meeting</Button>
              </div>
            </div>

          </Box>
          <Box
            sx={{
              paddingLeft: '40px',
              paddingRight: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              verticalAlign: 'middle',
              flex: 1,
              borderRadius: '0px 10px 10px 0px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center' }}>
              <div><InterpreterModeIcon sx={{ margin: 'auto', fontSize: 60, color: '#f48fb1' }} /> </div>
              <Button sx={{ marginTop: '5px', borderColor: 'gray', height: '55px', color: '#b25977' }} fullWidth variant="outlined">Schedule Meeting</Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', justifyItems: 'center', marginTop: '85px' }}>
              <div><FeedbackIcon sx={{ margin: 'auto', fontSize: 60, color: '#74b2a4' }} /> </div>
              <Button sx={{ marginTop: '5px', borderColor: 'gray', height: '55px', color: '#74b2a4' }} fullWidth variant="outlined"> Post Your Question </Button>
            </div>
          </Box>
        </div>
      </Container>
    </div>
  );

}
export default ExpertMain;