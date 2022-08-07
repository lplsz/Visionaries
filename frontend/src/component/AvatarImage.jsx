import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

function stringAvatar(name) {
  if (name.split(' ').length === 2) {
    return {
      sx: { fontSize: '15px', height: '30px' },

      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  } else {
    return {
      sx: { fontSize: '15px', height: '30px' },

      children: `${name[0]}${name[1]}`,
    };
  }
}

const Input = styled('input')({
  display: 'none',
});

const AvatarImage = (props) => {

  if (props.type !== undefined) {
    if (props.profileImageSrc === "") {
      return (<Avatar
        {...stringAvatar(props.name)}
        sx={{ m: 1, bgcolor: 'primary.main', backgroundColor: '#000000', color: 'white', height: '30px', width: '30px', fontSize: '25px' }}
      >
      </Avatar>)
    } else {

      return (<Avatar
        src={props.profileImageSrc}
        sx={{ m: 1, bgcolor: 'primary.main', backgroundColor: '#000000', color: 'white', height: '30px', width: '30px', fontSize: '25px' }}
      >
      </Avatar>)
    }
  } else {
    if (props.profileImageSrc === "") {
      return (<Avatar
        {...stringAvatar(props.name)}
        sx={{ m: 1, bgcolor: 'primary.main', backgroundColor: '#000000', color: 'white', height: '80px', width: '80px', fontSize: '25px' }}
      >
      </Avatar>)
    } else {

      return (<Avatar
        src={props.profileImageSrc}
        sx={{ m: 1, bgcolor: 'primary.main', backgroundColor: '#000000', color: 'white', height: '80px', width: '80px', fontSize: '25px' }}
      >
      </Avatar>)
    }
  }






}
export default AvatarImage;