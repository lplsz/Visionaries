/* eslint-disable no-unused-vars */
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from '@mui/material/Grid';
import PotentialQA from '../component/PotentialQA';
import { apiCall } from '../Main';
import { useNavigate, useLocation } from 'react-router-dom';

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
  height: '37px',
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
  // const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [category, setCategory] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const categories = ['Career Advice', 'Covid-19', 'Mental Health Amid', 'Study From Home', 'Vaccinations', 'Others'];
  const [questionName, setQuestionName] = React.useState('');
  const [questionCategory, setQuestionCategory] = React.useState('');
  const [questionDescription, setQuestionDescription] = React.useState('');
  const [qaList, setQAList] = React.useState([]);
  const { state } = useLocation();

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChangeTime = (newValue) => {
    setValue(newValue);
  };

  const getQADetail = async (id) => {
    const data = await apiCall(`qas?category_ids=${id}`, 'GET');
    setQAList(data.qas);
    setCategory(data.qas[0].category.category_name);
  }

  React.useEffect(() => {
    
    if (state !== null) {
      getQADetail(state.id);
    }
  }, [])

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

  const solveSearch = (event) => {
    if (event.keyCode === 13) {
      let keyword = document.getElementById('searchInput').value;

      console.log(keyword);

      document.getElementById('searchInput').value = '';
    }
  }

  const handleSubmit = () => {
    const info = {
      question_name: questionName,
      question_category: questionCategory,
      question_description: questionDescription,
    }
    console.log(info);
    handleClose();
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
              {/* <PotantialQA /> */}
              <PotentialQA qaList={qaList}/>
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
              <Button sx={{ marginTop: '5px', borderColor: 'gray', height: '55px', color: '#74b2a4' }} fullWidth variant="outlined" onClick={handleClickOpen}> Post Your Question </Button>
              <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={open}
                onClose={handleClose}
              >
                  <DialogContent sx={{marginLeft:'5%', marginRight: '5%', marginTop: '10px'}}>
                    <Typography variant="h3" gutterBottom sx={{textAlign: 'center', marginBottom: '50px'}}>
                      Create Your Question Here:
                    </Typography>
                    <div>
                      <Grid container spacing={3}>
                        <Grid item xs={8}>
                          <Typography variant="h6" gutterBottom>
                            Question Name:
                          </Typography>
                          <TextField
                            required
                            id="recipeName"
                            name="recipeName"
                            label="Enhancement your question name here"
                            fullWidth={true}
                            variant="standard"
                            onChange={e => {setQuestionName(e.target.value)}}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography gutterBottom>
                              Choose Question Category:
                          </Typography>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={categories}
                            sx={{ width: 200, marginLeft: '10px' }}
                            renderInput={(params) => <TextField {...params} label="Type" />}
                            onChange={(e) => setQuestionCategory(categories[e.target.getAttribute("data-option-index")])}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            Question Description:
                          </Typography>
                          <TextField
                            required
                            id="recipeName"
                            name="recipeName"
                            label="Enhancement your detail question description here"
                            fullWidth={true}
                            variant="standard"
                            onChange={e => {setQuestionDescription(e.target.value)}}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>CANCLE</Button>
                    <Button onClick={handleSubmit}>SUMBIT</Button>
                  </DialogActions>
              </Dialog>
            </div>
          </Box>
        </div>
      </Container>
    </div>
  );
}
export default QACategory;
