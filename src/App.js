import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import "./styles.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import _ from "lodash";
import PropTypes from "prop-types";
import config from "../config";
import ListEvent from "./components/listEvent";

class MainCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarWeekends: true,
      calendarEvents: [
        // initial event data
        // { title: "Event Now", start: new Date() }
      ]
    };
    this.calendarComponentRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextStates) {
    const stCalendar = _.get(this.state, "calendarEvents");
    const nxtStCalendar = _.get(nextStates, "calendarEvents");

    if (stCalendar !== nxtStCalendar) {
      return true;
    }
    return false;
  }

  toggleWeekends = () => {
    const calendarWeekends = _.get(this.state, "calendarWeekends");
    this.setState({
      calendarWeekends: !calendarWeekends
    });
  };

  handleCallBack = info => {
    console.log(info);
    const stEvents = _.get(this.state, "calendarEvents");
    const calendarEvents = [...stEvents, { ...info }];

    this.setState({
      calendarEvents
    });
  };

  handledropEvent = info => {
    console.log(info);
    const title = _.get(info.event, "title");
    const getDay = _.get(info.event, "start");

    if (
      !confirm(
        `Are you sure about this change ${title} from ${getDay.getFullYear()}/ ${getDay.getDate()}/${getDay.getMonth()}? `
      )
    ) {
      info.revert();
    }
  };

  render() {
    const calendarWeekends = _.get(this.state, "calendarWeekends");
    const dataList = _.get(config, "listEvent");

    return (
      <div className="container p-1 text-center">
        <h4>DEMO CALENDAR</h4>
        <div className="row">
          <div className="col-6 col-lg-4 col-sm-12">
            <ListEvent data={dataList} callBack={this.handleCallBack} />
          </div>
          <div className="col-12 col-lg-8 col-md-12 col-sm-12">
            <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
              }}
              schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                bootstrapPlugin
              ]}
              themeSystem="bootstrap"
              ref={this.calendarComponentRef}
              weekends={calendarWeekends}
              editable={true}
              droppable={true}
              eventDrop={this.handledropEvent}
            />
          </div>
        </div>
      </div>
    );
  }
}

MainCalendar.propTypes = {};

export default MainCalendar;
