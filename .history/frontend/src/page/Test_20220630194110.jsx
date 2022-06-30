import React, { Component, useState } from "react";
import { PropTypes } from "prop-types";
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT
} from "react-big-scheduler";
import moment from "moment";
import "moment/locale/fr";
import "react-big-scheduler/lib/css/style.css";
const Test = () => {

  let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week);
  //set locale moment to the schedulerData, if your locale isn't English. By default, Scheduler comes with English(en, United States).
  moment.locale('zh-cn');
  schedulerData.setLocaleMoment(moment);
  //set resources here or later
  let resources = [
    {
      id: 'r0',
      name: 'Resource0',
      groupOnly: true
    },
    {
      id: 'r1',
      name: 'Resource1'
    }
  ];
  schedulerData.setResources(resources);
  let events = [
    {
      id: 1,
      start: '2017-12-18 09:30:00',
      end: '2017-12-19 23:30:00',
      resourceId: 'r1',
      title: 'I am finished',
      bgColor: '#D9D9D9'
    },
    {
      id: 2,
      start: '2017-12-18 12:30:00',
      end: '2017-12-26 23:30:00',
      resourceId: 'r2',
      title: 'I am not resizable',
      resizable: false
    },
    {
      id: 3,
      start: '2017-12-19 12:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r3',
      title: 'I am not movable',
      movable: false
    },
    {
      id: 4,
      start: '2017-12-19 14:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r1',
      title: 'I am not start-resizable',
      startResizable: false
    },
    {
      id: 5,
      start: '2017-12-19 15:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r2',
      title: 'R2 has recurring tasks every week on Tuesday, Friday',
      rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
      bgColor: '#f759ab'
    }
  ];
  schedulerData.setEvents(events);


  //3. render the scheduler component, mind that the Scheduler component should be placed in a DragDropContext(father or ancestor).
  return (
    <Scheduler schedulerData={schedulerData}
      prevClick={this.prevClick}
      nextClick={this.nextClick}
      onSelectDate={this.onSelectDate}
      onViewChange={this.onViewChange}
      eventItemClick={this.eventClicked}
    />
  )
}

export default Test;