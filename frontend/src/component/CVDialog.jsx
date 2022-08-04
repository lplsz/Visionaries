import * as React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import UPLOAD from '@mui/icons-material/UploadFile';
import IconButton from '@mui/material/IconButton';
import EXAMPLE from './img/card_example.png';
import { styled } from '@mui/material/styles';
import { apiCall } from '../Main';

const Input = styled('input')({
  display: 'none',
});


const CVDialog = (props) => {
  
  const [submit, setSubmit] = React.useState(false);
  const [zid, setZid] = React.useState("");
  const [name, setName] = React.useState("");
  const [accountType, setAccountType] = React.useState("student");
  const [imgSrc, setImgSrc] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState('');

  const getCardContext = async () => {
    const info = {
      base64url: imgSrc
    }
    const data = await apiCall('/card_recognition', 'POST', info);
    if (typeof (data) === 'string' && data.startsWith('501')) {
      setErrorMessage('No content found, try it again!');
    } else {
      setZid(data["id"]);
      setName(data["name"]);
      setAccountType(data["type"]);
    }
    setSubmit(true);
  }

  const handleImage = (target) => {
    if (target.value) {
      const file = target.files[0];
      const size = file.size;
      if (size >= 1 * 1024 * 1024) {
        alert('image over limit');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        alert('Not an image');
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
          const dataimg = e.target.result;
          setImgSrc(dataimg);
        }
      }
    }
  }
  
  const handleDialogClose = () => {
    props.setDiaOpen(false);
  };

  const CardTextDetectBox = () => {

    if (submit === false) {
      return (
        <div>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: '10px', fontWeight:'bold' }}>
            Choose Your ID Card Image Here
          </Typography>
          <Box sx={{height: '310px', borderStyle: 'dashed'}}>
            { imgSrc !== ""
              ? <img height="300px"
                src={imgSrc}
                alt={"card_image"} />
              
              : <span style={{display: 'flex'}}>
                  <img height="300px"
                    src={EXAMPLE}
                    alt={"card_example"} />
                  <h5 style={{fontWeight:'bold', alignSelf: 'center', marginLeft: '10px'}}>
                    Please following this template
                  </h5>
                </span> 
            }
          </Box>
          <Button variant="contained" style={{marginTop: '20px'}}>
            <label htmlFor="icon-button-file">
              From Device
              <Input accept="image/*" id="icon-button-file" type="file" onChange={(e) => {handleImage(e.target);} }/>
              <Tooltip
                title={'Upload your image'}
                placement="top"
              >
                <IconButton color="default" aria-label="upload picture" component="span">
                  <UPLOAD />
                </IconButton>
              </Tooltip>
            </label>
          </Button>
        </div>
      );
    }
    else {
      return (
        <div>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: '10px', fontWeight:'bold' }}>
            Welcom To Wellbeing Webstite!
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: '10px', fontWeight:'bold' }}>
            Hi, {accountType} {zid} -- {name}!
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', marginBottom: '10px', fontWeight:'bold' }}>
            Log in as this account?
          </Typography>
        </div>
      )
    }
  }
  
  
  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      open={props.dialogOpen}
      onClose={handleDialogClose}
    >
      <DialogContent sx={{ marginLeft: '5%', marginRight: '5%', marginTop: '10px', textAlign: 'center' }}>
      <CardTextDetectBox />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { handleDialogClose()}}>CANCLE</Button>
        <Button onClick={() => { getCardContext() }}>SUMBIT</Button>
      </DialogActions>
    </Dialog>  
  )
}
export default CVDialog;