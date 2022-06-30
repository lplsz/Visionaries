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
import Col from "antd/lib/col";
import Row from "antd/lib/row";

const Test = () => {
  const Datas = {
    resources: [
      {
        id: "spa1",
        name: "Spa 1"
      },
      {
        id: "spa2",
        name: "Spa 2"
      }
    ],
    events: [
      {
        id: 1,
        start: "2021-06-21 10:00:00",
        end: "2021-06-21 12:00:00",
        resourceId: "spa1",
        title: "Prix 120€",
        rrule: "FREQ=WEEKLY;DTSTART=20210621T100000Z;BYDAY=MO,TU,WE,TH,FR,SA,SU",
        bgColor: "green"
      },
      {
        id: 2,
        start: "2021-06-21 10:00:00",
        end: "2021-06-21 12:00:00",
        resourceId: "spa2",
        title: "Prix 120€",
        rrule: "FREQ=WEEKLY;DTSTART=20210621T100000Z;BYDAY=MO,TU,WE,TH,FR,SA,SU",
        bgColor: "green"
      },]
  }

  let schedulerData = new SchedulerData(
    new moment().format(DATE_FORMAT),
    ViewTypes.Week,
    false,
    false,
    {
      views: [
        {
          viewName: "Hebdomadaire",
          viewType: ViewTypes.Week,
          showAgenda: false,
          isEventPerspective: false
        },
        {
          viewName: "Mensuel",
          viewType: ViewTypes.Month,
          showAgenda: false,
          isEventPerspective: false
        }
      ],
      nonAgendaOtherCellHeaderFormat: "ddd D/M",
      resourceName: "Spa",
      schedulerWidth: "70%",
      startResizable: false,
      endResizable: false,
      movable: false,
      creatable: false
    }
  );

  const changeColor = (schedulerData, booked) => {
    schedulerData.events.forEach((element) => {
      if (
        moment().endOf("day").add(1, "days").diff(element.start, "minutes") > 0
      ) {
        element.bgColor = "grey";
      } else if (booked.indexOf(element.id) > -1) {
        element.bgColor = "red";
      }
    });
  }

  //set locale moment to the schedulerData, if your locale isn't English. By default, Scheduler comes with English(en, United States).
  moment.locale("fr");
  schedulerData.setLocaleMoment(moment);
  let booked = ["1-14", "1-3", "3-1", "12-4"];
  schedulerData.setResources(Datas.resources);
  schedulerData.setEvents(Datas.events);
  changeColor(schedulerData, booked);
  const [state, setState] = React.useState({
    viewModel: schedulerData,
    booked: booked
  });

  const eventItemPopoverTemplateResolver = (schedulerData, eventItem, title, start, end, statusColor) => {
    return (
      <div style={{ width: "300px" }}>
        <Row type="flex" align="middle">
          <Col span={2}>
            <div
              className="status-dot"
              style={{ backgroundColor: statusColor }}
            />
          </Col>
          <Col span={22} className="overflow-text">
            <span className="header2-text" title={title}>
              {title}
            </span>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={2}>
            <div />
          </Col>
          <Col span={22}>
            <span className="header1-text">
              {start.format("HH:mm")} - {end.format("HH:mm")}
            </span>
          </Col>
        </Row>

      </div>
    );
  };

  const prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(Datas.events);
    changeColor(schedulerData, state.booked);
    setState({
      viewModel: schedulerData,
      booked: state.booked
    });
  };

  const nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(Datas.events);
    changeColor(schedulerData, state.booked);
    setState({
      viewModel: schedulerData,
      booked: state.booked
    });
  };

  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(Datas.events);
    changeColor(schedulerData, state.booked);
    setState({
      viewModel: schedulerData,
      booked: state.booked
    });
  };

  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(Datas.events);
    changeColor(schedulerData, state.booked);

    setState({
      viewModel: schedulerData,
      booked: state.booked
    });
  };

  const eventClicked = (schedulerData, event) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  const toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    setState({
      viewModel: schedulerData,
      booked: state.booked
    });
  };


  return (
    <div>
      <h1 className="products">Booking</h1>
      <Scheduler
        schedulerData={state.viewModel}
        prevClick={prevClick}
        nextClick={nextClick}
        onSelectDate={onSelectDate}
        onViewChange={onViewChange}
        eventItemClick={eventClicked}
        viewEventText="Voir photos"
        viewEvent2Text="Réserver"
        toggleExpandFunc={toggleExpandFunc}
        eventItemPopoverTemplateResolver={
          eventItemPopoverTemplateResolver
        }
      />
    </div >
  );
}

export default Test;