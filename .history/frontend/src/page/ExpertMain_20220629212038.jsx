import * as React from 'react';
import ExpertHeader from "../component/ExpertHeader";
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ExpertMain = () => {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [qaList, setQaList] = React.useState([
    { question: 'How much does it cost?', answer: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.' },
    { question: 'Worried about sharing your concerns?', answer: 'All information we gather is completely confidential. Your personal information will not be shared with anyone without your consent, this includes your faculty or lecturers. For further information, see our privacy statement by clicking here. ' },
    { question: 'What can I expect if offered an appointment?', answer: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work out what might help. We always work with you as an individual and will always treat you with respect.', video: 'https://youtu.be/wm5nhB0lYL8' },
  ])


  const SingleQA = (props) => {
    const Video = () => {
      if (props.data.video !== undefined) {
        return (
          <ReactPlayer
            url={props.data.video}
            className='react-player'
            width='80%'
            height='300px' />

        )
      }
      return
    }
    return (
      <div>
        <Video />
        <Typography >{props.data.answer} </Typography>
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
                    Question {i}: {data.question}
                  </Typography>
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

      <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 8, pb: 6, padding: 0 }}>
        <div style={{ display: 'flex', width: '100%', backgroundColor: '#ffffff', borderRadius: '10px', marginBottom: '10px' }}>
          <Box
            sx={{
              alignItems: 'center',
              margin: 'auto',
              flex: 3,
              width: '100%',
              paddingTop: '40px',
              paddingBottom: '40px',
              borderRight: '2.0px solid rgb(230, 230, 230)',
              paddingLeft: '40px',
              paddingRight: '40px',
              height: '400px'
            }}
          >
            <div style={{ width: '100%' }}>
              <PotantialQA />
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
              <LocalizationProvider sx={{ borderColor: '#b25977' }} dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={handleChangeTime}
                  renderInput={(params) => <TextField  {...params} />}
                />
              </LocalizationProvider>
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