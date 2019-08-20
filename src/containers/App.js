import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import _ from "lodash";
import PropTypes from "prop-types";
import config from "../../config";
import ListEvent from "../components/listEvent";
import { connect } from "react-redux";
import { addEvent } from "../actions/event";
import AddEvent from "../components/event";

class MainCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarWeekends: true,
      openAddEvent: false,
      calendarEvents: [
        // initial event data
        // { title: "Event Now", start: "2019-08-21T11:11:00" }
      ]
    };
    this.calendarComponentRef = React.createRef();
  }

  toggleWeekends = () => {
    const calendarWeekends = _.get(this.state, "calendarWeekends");
    this.setState({
      calendarWeekends: !calendarWeekends
    });
  };

  handleCallBack = info => {
    const stEvents = _.get(this.state, "calendarEvents");
    const calendarEvents = [...stEvents, { ...info }];

    this.setState({
      calendarEvents
    });
  };

  handledropEvent = info => {
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

  handleShowAddEvent = e => {
    e.preventDefault();
    this.setState({ openAddEvent: !this.state.openAddEvent });
  };

  handleCallBackData = data => {
    if (!data) {
      return;
    }

    const disPatch = _.get(this.props, "dispatch");
    if (typeof disPatch === "function" && typeof addEvent === "function") {
      const title = _.get(data, "title");
      const startTime = _.get(data, "start");
      const endTime = _.get(data, "end");
      const stcalendarEvents = _.get(this.state, "calendarEvents");
      const calendarEvents = [...stcalendarEvents, data];

      this.setState({
        calendarEvents
      });
      disPatch(addEvent(title, startTime, endTime));
    }
  };

  render() {
    const calendarWeekends = _.get(this.state, "calendarWeekends");
    const dataList = _.get(this.props, "eventReducer");
    const openAddEvent = _.get(this.state, "openAddEvent");
    const calendarEvents = _.get(this.state, "calendarEvents");
    //TODO: update event drag end event.

    return (
      <div className="container p-1 text-center">
        <h4>DEMO CALENDAR</h4>
        <div className="row">
          <div className="col-6 col-lg-4 col-sm-12">
            <ListEvent data={dataList} callBack={this.handleCallBack} />

            <AddEvent open={openAddEvent} callBack={this.handleCallBackData} />
          </div>
          <div className="col-12 col-lg-8 col-md-12 col-sm-12">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleShowAddEvent}
              >
                Add Event
              </button>
            </div>

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
              events={calendarEvents}
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

MainCalendar.propTypes = {
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  const { eventReducer } = state;
  const { start, end } = eventReducer;

  console.log("State: ", eventReducer, start, end);
  return {
    eventReducer
  };
}
export default connect(mapStateToProps)(MainCalendar);
