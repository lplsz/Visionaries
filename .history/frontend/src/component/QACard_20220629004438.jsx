/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import QuestionBtn from './QuestionBtn';
import InsiderQuestionOrText from './InsiderQuestionOrText';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import BootstrapDialog from './BootstrapDialog';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from '@mui/material/Tooltip';
import { apiCall } from '../Main';
import defaultJpg from './well-being.jpg';

const QACard = (props) => {

    const navigate = useNavigate();
    const id = props.category.id;

    return (
        <Grid item className="GC" key={quizz.quizz.key} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                { quizz.quizz.image === null
                ? <CardMedia
                    componnet="img"
                    sx={{
                        // 16:9
                        pt: '58%',
                    }}
                    alt="Image of the Game"
                    image= {defaultJpg}
                    title="Image title"
                    />
                : <CardMedia
                    componnet="img"
                    sx={{
                        // 16:9
                        pt: '58%',
                    }}
                    alt="Image of the Game"
                    image= {quizz.quizz.image}
                    title="Image title"
                    />
                }
                <CardContent className={quizz.quizz.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    <strong>{quizz.quizz.title}</strong>
                </Typography>
                <Typography>
                    <strong>Number of Questions: </strong>{quizz.quizz.num}
                </Typography>
                <Typography>
                    <strong>Duration: </strong>{quizz.quizz.time} Seconds
                </Typography>
                </CardContent>
                <CardActions>
                    {
                        quizz.quizz.num > 0
                        ? <Button size="small" id={'start_' + quizz.quizz.key} color="primary" onClick={() => startOrStop(quizz.quizz.id)} endIcon={<PlayArrowIcon />} variant="outlined" > play </Button>
                        : <span></span>
                    }
                    <Button size="small" color="primary"
                        onClick={() => {
                            navigate(`/pastSessionResult/${quizz.quizz.id}`)
                        }}
                        endIcon={<StickyNote2Icon />}
                        variant="outlined">
                            annal
                    </Button>
                    <Tooltip
                        title={'Delete'}
                        placement="top"
                    >
                    </Tooltip>
                </CardActions>
            </Card>
        </Grid>
  );
}

export default QACard;
