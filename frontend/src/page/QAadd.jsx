import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './QAadd.css'
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { convertToRaw } from 'draft-js';
import Container from '@mui/material/Container';
import draftToHtml from 'draftjs-to-html';
import Typography from '@mui/material/Typography';
import DOMPurify from 'dompurify';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExpertHeader from "../component/ExpertHeader";
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { display } from '@mui/system';
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
function QAadd() {

  const [editorState, setEditorState] = useState(EditorState.createEmpty()) // ContentState JSON
  const categories = [
    {
      id: 0,
      category_name: 'Career Advice',
      category_description: 'Career Advice',
    },
    {
      id: 1,
      category_name: 'Covid-19',
      category_description: 'Covid-19',
    },
    {
      id: 2,
      category_name: 'Mental Health Amid',
      category_description: 'Mental Health Amid',
    },
    {
      id: 3,
      category_name: 'Study From Home',
      category_description: 'Study From Home',
    },
    {
      id: 4,
      category_name: 'Vaccinations',
      category_description: 'Vaccinations',
    },
    {
      id: 5,
      category_name: 'Others',
      category_description: 'Others',
    },
  ];
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const [value, setValue] = React.useState('Covid-19');
  const [description, setDescription] = React.useState('');
  const [video, setVideo] = React.useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [convertedContent, setConvertedContent] = useState(null);
  const convertContentToHTML = () => {
    console.log(editorState);
    let currentContentAsHTML = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(
      currentContentAsHTML,
    );
    setConvertedContent(markup);
  }

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }
  const RadioButtonsGroup = () => {
    return (
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Category</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {categories.map((cate, i) => {
            return <FormControlLabel value={cate.category_name} control={<Radio />} label={cate.category_name} />
          })}
        </RadioGroup>
      </FormControl>
    );
  }
  const CheckBoxButtonsGroup = () => {
    return (
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Category</FormLabel>

        {categories.map((cate, i) => {
          return <FormControlLabel value={cate.category_name} control={<Checkbox />} label={cate.category_name} />
        })}
      </FormControl>
    );
  }

  //<div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
  return (
    <ThemeProvider theme={theme}>
      <ExpertHeader />
      <div style={{ display: 'flex', marginLeft: '80px', marginTop: '40px' }}>
        <Typography variant="h3" sx={{ padding: 0, margin: 0 }}>Adding Q and A</Typography>
      </div>
      <div style={{ display: 'flex', marginLeft: '80px', marginRight: '80px', marginTop: '20px', marginBottom: '20px' }}>
        <div style={{ border: '1px solid gray', height: '700px', borderRadius: '30px', width: '100%', padding: '30px' }}>
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ flex: 1 }}><RadioButtonsGroup /></div>
            <div style={{ flex: 1 }}><CheckBoxButtonsGroup /></div>
            <div style={{ flex: 3, width: '100%' }}>
              <div style={{ marginRight: '15px', color: 'gray' }}>{"Q&A detail:"}</div>
              <div style={{ display: 'flex' }}>
                <div style={{ marginTop: '20px', marginRight: '15px', width: '100px' }}>Question:</div>
                <div style={{ width: '100%' }}>
                  <TextField
                    required
                    id="description"
                    name="description"
                    label="Question"
                    fullWidth
                    variant="standard"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: '15px' }}>
                <div style={{ marginTop: '0px', marginRight: '15px', width: '100px' }}>Youtube Video URL:</div>
                <div style={{ width: '100%' }}>
                  <TextField
                    required
                    id="description"
                    name="description"
                    label="Video"
                    fullWidth
                    variant="standard"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ marginTop: '15px', marginBottom: '5px' }}>Answer:</div>
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  image: { alt: { present: true, mandatory: true } },
                }}
              />
            </div>
          </div>
        </div>
      </div>


    </ThemeProvider >
  )
}
export default QAadd;