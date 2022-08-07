import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import React from 'react';

// The button used to navigate to the provided address
const PageReturnButton = (props) => {
  const navigate = useNavigate();
  return (
    <div style={{display:'flex', alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom:'10px'}}>
      <Button onClick={()=>{navigate(props.address)}} style={{color:'white'}}>RETURN</Button>
    </div>
  )
}
export default PageReturnButton;