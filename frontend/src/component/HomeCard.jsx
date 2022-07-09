/* eslint-disable react/prop-types */
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import LoginIcon from './img/FindRecipe.png';
import AssignmentIndIcon from './img/bakery+svg+flat+mixer-1319964822900284815.png';
const HomeCard = (props) => {
  return (
    <Grid
      item
      key={props.tier.title}
      xs={12}
      sm={6}
      md={6}
    >
      <Card sx={{backgroundColor: 'rgba(255,255,255)'}}>
      <CardHeader
        title={props.tier.title}
        titleTypographyProps={{ align: 'center', variant: "h4" }}
        subheaderTypographyProps={{ align: 'center' }}
      />
      <Typography variant="h3" align="center">
      {props.tier.title === 'Explorer'? <img
                  style={{ width:'125px', height:'120px' , marginRight:'15px'}}
                  src={AssignmentIndIcon}
                  alt='ingred'
                />  : 
                <img
                  style={{ width:'125px', height:'120px' , marginRight:'15px'}}
                  src={LoginIcon}
                  alt='ingred'
                /> }
    
      </Typography>
      <div style={{margin: '10px'}}>
      <div style={{marginBottom: '5px'}}>
          <Button fullWidth variant={props.tier.buttonVariant} onClick={() => { props.navigate(props.tier.navigator1) }}>
            {props.tier.buttonText1}
            </Button> 
          </div>
            
        <div>
        <Button fullWidth variant={props.tier.buttonVariant} onClick={() => { props.navigate(props.tier.navigator2) }}>
            {props.tier.buttonText2}
            </Button>
        </div>

      </div>
         
          
      </Card>
    </Grid>
  )
}

export default HomeCard;
