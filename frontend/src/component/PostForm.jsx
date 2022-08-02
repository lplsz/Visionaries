import * as React from 'react';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
const PostForm = () => {
  const categories = ['Career Advice', 'Covid-19', 'Mental Health Amid', 'Study From Home', 'Vaccinations', 'Others'];
  const [questionName, setQuestionName] = React.useState('');
  const [questionCategory, setQuestionCategory] = React.useState('');
  const [questionDescription, setQuestionDescription] = React.useState('');
  return (
    <div>
      <div style={{ marginRight: '0px', padding: '10px', margin: '10px', width: '350px', color: 'black', border: '1px solid black', borderRadius: '10px' }}>
        <div style={{}}>
          <div>
            Question Name:
          </div>
          <TextField
            required
            id="recipeName"
            name="recipeName"
            fullWidth={true}
            variant="standard"
            value={questionName}
            onChange={e => { setQuestionName(e.target.value) }}
          />
        </div>
        <div style={{ display: 'flex', marginTop: '5px' }}>
          <div>
            Question Category:
          </div>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={categories}
            sx={{ width: 150, marginLeft: '10px' }}
            value={questionCategory}
            renderInput={(params) => <TextField {...params} label="Type" />}
            onChange={(e) => setQuestionCategory(categories[e.target.getAttribute("data-option-index")])}
          />
        </div>
        <div>
          <div>
            Description:
          </div>
          <TextField
            required
            id="recipeName"
            name="recipeName"
            label="Enhancement your detail question description here"
            fullWidth={true}
            variant="standard"
            value={questionDescription}
            onChange={e => { setQuestionDescription(e.target.value) }}
          />
        </div>
        <button onClick={() => { console.log(questionDescription); setQuestionCategory(''); setQuestionName(''); setQuestionDescription("") }}>Submit</button>
      </div>

    </div >

  )
}
export default PostForm;