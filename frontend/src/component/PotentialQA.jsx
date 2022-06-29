import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactPlayer from 'react-player';

const PotentialQA = () => {
    const [expanded, setExpanded] = React.useState(false);
    const qaList = [
        { question: 'How much does it cost?', answer: 'All appointments are completely free of charge for students who are currently enrolled at UNSW.' },
        { question: 'Worried about sharing your concerns?', answer: 'All information we gather is completely confidential. Your personal information will not be shared with anyone without your consent, this includes your faculty or lecturers. For further information, see our privacy statement by clicking here. ' },
        { question: 'What can I expect if offered an appointment?', answer: 'Appointments are scheduled to last around 30 minutes. We will ask you some questions to help work out what might help. We always work with you as an individual and will always treat you with respect.', video: 'https://www.youtube.com/watch?v=e4CAXOcUHio' },
    ];

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <div>
            {qaList.map((data, i) => {
                return (
                <div key={i} style={{ marginTop: '5px', width: '100%', marginBottom: '5px' }}>
                    <Accordion fullWidth expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
                    <AccordionSummary
    
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${i}bh-content`}
                        id={`panel${i}bh-header`}
                    >
                        <Typography sx={{ flexShrink: 0 }}>
                        Question {i}: {data.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <div>
                        {data.video === undefined
                            ? <></>
                            : <ReactPlayer
                            url={data.video}
                            className='react-player'
                            width='80%'
                            height='300px'/>}
                        <Typography >{data.answer} </Typography>
                        
                    </div>
                    </AccordionDetails>
                    </Accordion>
                </div>
                );
            })}
        </div>
    );
}
export default PotentialQA;