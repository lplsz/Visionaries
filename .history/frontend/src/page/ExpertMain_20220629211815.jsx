import ExpertHeader from "../component/ExpertHeader";
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ExpertMain = () => {
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