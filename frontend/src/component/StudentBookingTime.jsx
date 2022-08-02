import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

function timeFormat(date) {
    if (!date || typeof (date) === "string") {
        this.error("参数异常，请检查...");
    }
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();

    return m + "/" + d;
}

function getFirstDayOfWeek(date, i) {

    var weekday = date.getDay() || 7;

    date.setDate(date.getDate() - weekday + i);
    return timeFormat(date);
}
function getDays(date) {
    const l = []
    for (let i = 1; i < 6; i++) {
        l.push(getFirstDayOfWeek(date, i))
    }
    return l
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StudentBookingTime = (props) => {
    const time = ['09:00am', '09:30am', '10:00am', '10:30am', '11:00am', '01:00pm', '01:30pm', '02:00pm', '02:30pm', '03:00pm', '03:30pm', '04:00pm', '04:30pm'];
    const [date, setDate] = React.useState(new Date());
    const [l, setL] = React.useState(getDays(date))
    const [i, setI] = React.useState(1)
    const [string, setString] = React.useState('')
    const timeTable = props.timeTable
    const week = ['#ffdc00', '#edcf0b', '#ffdc00', '#edcf0b', '#ffdc00']
    const week2 = ['#7a7a7ad0', '#5F6769', '#7a7a7ad0', '#5F6769', '#7a7a7ad0']
    const [selectTime, setSelectTime] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    function getFirstDayOfNextWeek(date) {

        var weekday = date.getDay() || 7;

        date.setDate(date.getDate() - weekday + 8);
        setL(getDays(date))
        return date;
    }
    function getFirstDayOfLastWeek(date) {

        var weekday = date.getDay() || 7;

        date.setDate(date.getDate() - weekday - 6);
        setL(getDays(date))
        return date;
    }


    function SimpleDialog(props) {
        const { onClose, open } = props;
        const handleClose = () => {
            onClose();
        };
        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure to book the meeting?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {string}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }


    const TimeTables = () => {
        const ll = []
        for (let j = 0; j < 13; j++) {
            const lll = []
            for (let z = 0; z < 5; z++) {
                lll.push(timeTable[z][j])
            }
            ll.push(lll)
        }
        return ll.map((lls, x) => {
            return (
                <Grid container spacing={0}>
                    {lls.map((bo, y) => {
                        if (bo) {
                            return (
                                <Grid item xs={2.4} sx={{ display: 'flex', height: '20px', background: week2[y] }}> <button onClick={() => { setString('You have booked a meeting with ' + props.name + ' on ' + l[y] + ' ' + time[x]); setSelectTime(time[x]); setOpen(true) }} style={{ border: 'none', borderRadius: '8px', margin: 'auto', height: '90%', width: '90%', background: week[y], fontWeight: 'bold', color: 'black', fontSize: '6px', textAlign: 'center' }}>{time[x]}</button></Grid>
                            )

                        } else {
                            return (<Grid item xs={2.4} sx={{ background: week2[y] }} > </Grid>)
                        }

                    })}
                </Grid >
            )
        })
    }
    return (
        <div style={{ width: '400px', height: '300px' }} >
            <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ flex: 1, textAlign: 'center' }}> <IconButton size='small' onClick={() => { console.log('hehe'); setDate(getFirstDayOfLastWeek(date)); setI(i + 1) }}><KeyboardDoubleArrowLeftIcon size='small' /></IconButton></div>
                <div style={{ flex: 12, textAlign: 'center' }}> <Grid container spacing={0} cent>
                    <Grid item xs={2.4} sx={{ background: 'black', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                        MON
                    </Grid>
                    <Grid item xs={2.4} sx={{ background: 'black', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                        TUE
                    </Grid>
                    <Grid item xs={2.4} sx={{ background: 'black', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                        WED
                    </Grid>
                    <Grid item xs={2.4} sx={{ background: 'black', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                        THU
                    </Grid>
                    <Grid item xs={2.4} sx={{ background: 'black', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                        FRI
                    </Grid>
                </Grid>
                    <Grid container spacing={0}>
                        {l.map((d, i) => <Grid item xs={2.4} sx={{ background: week[i], fontWeight: 'bold', color: 'white', fontSize: '12px', textAlign: 'center' }}>{d}</Grid>)}
                    </Grid>
                    <TimeTables></TimeTables></div>
                <div style={{ flex: 1, textAlign: 'center' }}> <IconButton size='small' onClick={() => { console.log('hehe'); setDate(getFirstDayOfNextWeek(date)); setI(i + 1) }}><KeyboardDoubleArrowRightIcon size='small' /></IconButton></div>
            </div>
            <SimpleDialog
                open={open}
                onClose={handleClose}
            />

        </div >

    );
}
export default StudentBookingTime;