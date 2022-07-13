import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ExpertHeader from '../component/ExpertHeader';
import Container from '@mui/material/Container';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from '@mui/material/Typography';
import DialogActions from "@mui/material/DialogActions";
import IconButton from '@mui/material/IconButton';
import PreviewIcon from '@mui/icons-material/Preview';
import ReactPlayer from 'react-player';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


export default function ExpertPostRecord() {
  const [checked, setChecked] = React.useState([]);
  const [pending, setPending] = React.useState([
    { name: 'Rhea', time: '04/09/2022', question: 'How much does it cost?', category: 'vacation', description: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.' },
    { name: 'Skylar', time: '04/06/2022', question: 'What can I expect if offered an appointment?', category: 'vacation', description: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work out what might help. We always work with you as an individual and will always treat you with respect.', video: 'https://youtu.be/wm5nhB0lYL8' },
  ])
  const [reviewed, setReviewed] = React.useState([]);
  const [currPost, setCurrPost] = React.useState({});
  const [currPostPending, setCurrPostPending] = React.useState(true);

  const pendingChecked = intersection(checked, pending);
  const reviewedChecked = intersection(checked, reviewed);

  function handleToggle(value) {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const pendingIndex = pending.indexOf(value);
    if (pendingIndex === -1) {
      setCurrPostPending(false);
    } else {
      setCurrPostPending(true);
    }

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedReviewed = () => {
    setReviewed(reviewed
      .concat(pendingChecked));
    setPending(not(pending, pendingChecked));
    setChecked(not(checked, pendingChecked));
  };

  const handleCheckedPending = () => {
    setPending(pending.concat(reviewedChecked));
    setReviewed(not(reviewed, reviewedChecked));
    setChecked(not(checked, reviewedChecked));
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 400,
          height: 300,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value, i) => {
          const labelId = `transfer-list-all-item-${i}-label`;
          const checkedIndex = checked.indexOf(value);
          let style = {borderRadius: '2px', border: '1px solid black', marginBottom:'2px'}
          if (checkedIndex !== -1) {
            style = {borderRadius: '2px', border: '1px solid black', marginBottom:'2px', backgroundColor: '#d8d8d5'}
          }
          return (
            <ListItem
              key={i}
              role="listitem"
              secondaryAction={
                <IconButton edge="end" aria-label="comments" onClick={()=> {setCurrPost(value); handleClickOpen()}}>
                  <PreviewIcon />
                </IconButton>
              }
              style={style}
            >
              <ListItemIcon>
                <ListItemText id={labelId} primary={`${value.question}`} style={{marginLeft:'10px', marginBottom:'10px'}}/>
              </ListItemIcon>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <div style = {{backgroundSize: '100% 100%'}}>
      <ExpertHeader />
      <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 8, pb: 6}}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>{customList('Pending Review', pending)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedReviewed}
                disabled={pendingChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedPending}
                disabled={reviewedChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Grid>
          </Grid>
          <Grid item>{customList('Reviewd QA Post', reviewed)}</Grid>
        </Grid>
        <div>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
              {currPost.question}
            </BootstrapDialogTitle>
            <DialogContent dividers>
              {currPost.video === undefined
                ? <></>
                : <ReactPlayer
                url={currPost.video}
                className='react-player'
                width='80%'
                height='300px'/>}
              <Typography gutterBottom style={{marginTop:'20px'}}>{currPost.description}</Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={()=> {handleToggle(currPost); handleClose();}}>
                {currPostPending === true ? "CONFIRM" : "REMOVE"}
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
      </Container>
    </div>
  );
}
