import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, alpha } from '@mui/material/styles';
import ReactPlayer from 'react-player';
import MAIN from './img/vaccinations.jpg';
import StudentHeader from '../component/StudentHeader'
import Button from '@mui/material/Button';
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import FeedbackIcon from '@mui/icons-material/Feedback';
// or for Day.js
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 0, 0, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '90%',
    transition: theme.transitions.create('width'),

  },
  width: '100%',
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid',
  borderColor: 'black',
  height: '35px',
  backgroundColor: alpha(theme.palette.common.white, 0.45),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.55),
  },
  marginRight: 0,
  marginLeft: 0,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  width: '100%',

}))

const QACategory = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const category = 'Vaccinations'
  const handleChangeTime = (newValue) => {
    setValue(newValue);
  };

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

  const FilterCategory = () => {
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[{ label: 'Breakfast' }, { label: 'Lunch' }, { label: 'dinner' }, { label: 'afternoon tea' }, { label: 'others' }]}

        renderInput={(params) => <TextField {...params} label="Category" />}
        size="small"
        fullWidth
      />
    );
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

  const solveSearch = (event) => {
    if (event.keyCode === 13) {
      let keyword = document.getElementById('searchInput').value;

      console.log(keyword);

      document.getElementById('searchInput').value = '';
    }
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
      </div>

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
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: 'auto',
              width: '100%'
            }}>
              <div style={{
                flex: 2,
                alignItems: 'center',
                margin: 'auto',
                paddingRight: '10px'
              }}
              >
                <Search >
                  <SearchIconWrapper>
                    <SearchIcon color='action' />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    id="searchInput"
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyUp={(event) => { solveSearch(event); }}
                  />
                </Search>
              </div>
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', justifyItems: 'center', marginTop: '50px' }}>
              <div><FeedbackIcon sx={{ margin: 'auto', fontSize: 60, color: '#74b2a4' }} /> </div>
              <Button sx={{ marginTop: '5px', borderColor: '#74b2a4', color: '#74b2a4' }} fullWidth variant="outlined"> Post Your Question </Button>
            </div>
          </Box>
        </div>
      </Container>
    </div>
  );
}
export default QACategory;
