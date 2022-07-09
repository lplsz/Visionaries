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
import CopyAllIcon from '@mui/icons-material/CopyAll';
import defaultJpg from './BigBrain.jpg';

const QACard = (quizz) => {
    
  const id = quizz.quizz.id;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [session, setSession] = React.useState(-1);
  const [curentStep, setCurentStep] = React.useState(-1);
  const [totalQuestion, setTotalQuestion] = React.useState(-1);
  const [startGameQuestion, setStartGameQuestion] = React.useState({});
  const [curPlayer, setcurPlayer] = React.useState([]);
  const [questionActive, setQA] = React.useState(true);
  const [copiedText, setCopiedText] = React.useState('Copy To Clipboard');
  /**
   * Handle the event of deleting
   */
  const deleteGame = async () => {
    try {
      const response = await apiCall(`admin/quiz/${id}`, 'DELETE');
      alert('Delete success');
      navigate('/');
      navigate('/quiz/new');
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Start a game to get the sessionId in active
   * Or stop a game by checking text of button to determine the status
   */
  const startOrStop = async () => {
    handleStopandClose();
    try {
      const data = await apiCall(`admin/quiz/${id}/start`, 'POST');
      await quizDetail(id);
      setCopiedText('Copy To Clipboard');
      setcurPlayer([]);
      setOpen(true);
      setQA(true);
    } catch (err) {
      console.log(err);
    }
  }

  const handleStopandClose = async () => {
    handleStop();
    setOpen(false);
    setCurentStep(-1);
  }

  const handleStop = async () => {
    apiCall(`admin/quiz/${id}/end`, 'POST');
    console.log('Stop game response');
  }

  const handleAdvance = async () => {
    apiCall(`admin/quiz/${id}/advance`, 'POST');
  }

  const quizDetail = async (qid) => {
    const data = await apiCall(`admin/quiz/${qid}`, 'GET');
    setSession(data.active);
    await quizSt();
    setTotalQuestion(data.questions.length)
    setStartGameQuestion(data.questions);
  }

  const quizSt = async () => {
    if (session !== -1) {
      const data = await apiCall(`admin/session/${session}/status`, 'GET');
      setcurPlayer(data.results.players);
    }
  }

  const updateQA = (status) => {
    setQA(status);
  }
  console.log(quizz.quizz.image);

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
          <BootstrapDialog
            onClose={handleStopandClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle aria-labelledby="customized-dialog-title" open={open}sx={{ m: 0, p: 2 }}>
              Game is Starting!!!!
              <IconButton
                aria-label="close"
                onClick={handleStopandClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                Visit this Session to join: <span id="session_copy">{session}</span>
                <CopyToClipboard
                  text={session}
                  onCopy={() => setCopiedText('Already copyed')}
                >
                  <Tooltip
                    title={copiedText}
                    placement="top"
                  >
                    <IconButton> <CopyAllIcon/> </IconButton>
                  </Tooltip>
                </CopyToClipboard>
              </Typography>
              <InsiderQuestionOrText
                curentStep={curentStep}
                totalQuestion={totalQuestion}
                question={startGameQuestion[curentStep]}
                curPlayer={curPlayer}
                setcurPlayer={setcurPlayer}
                questionActive={questionActive}
                updateQA={updateQA}
                session={session}>
              </InsiderQuestionOrText>
              <QuestionBtn
                curentStep={curentStep}
                totalQuestion={totalQuestion}
                setCurentStep={setCurentStep}
                handleAdvance={handleAdvance}
                setQA={setQA}
                questionActive={questionActive}
                handleStop={handleStop}
                quizId={id}
                session={session}
                navigate={navigate}>
              </QuestionBtn>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleStopandClose}>
                Stop Game
              </Button>
            </DialogActions>
          </BootstrapDialog>
          <Button size="small" color="primary"
          onClick={() => {
            navigate(`/pastSessionResult/${quizz.quizz.id}`)
          }}
          endIcon={<StickyNote2Icon />}
          variant="outlined">
            annal
          </Button>
          <Tooltip
            title={'Edit'}
            placement="top"
          >
            <IconButton id={'edit_btn_' + quizz.quizz.key} size="small" color="primary" onClick={() => navigate(`/editQuiz/${quizz.quizz.id}`)} variant="outlined" >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={'Delete'}
            placement="top"
          >
            <IconButton size="medium" color="primary" onClick={() => {
              console.log('dddd')
              deleteGame(quizz.quizz.id)
            }} >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>

  );
}

export default QACard;
