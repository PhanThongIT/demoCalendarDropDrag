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
import { addEvent, updateEvent } from "../actions/event";
import AddEvent from "../components/event";

class MainCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarWeekends: true,
      openAddEvent: false,
      openMenu: false
    };
    this.calendarComponentRef = React.createRef();
  }

  // shouldComponentUpdate(nextProps, nextStates) {
  //   const nextPropEvents = _.get(nextProps, "eventReducer");
  //   const currentPropEvents = _.get(this.props, "eventReducer");

  //   if (nextPropEvents !== currentPropEvents) {
  //     return true;
  //   }

  //   return false;
  // }

  handleShowAddEvent = e => {
    e.preventDefault();
    this.setState({ openAddEvent: true });
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

      disPatch(addEvent(title, startTime, endTime));
    }
  };

  handledropEvent = info => {
    const title = _.get(info.event, "title");
    const startTime = _.get(info.event, "start");
    const endTime = _.get(info.event, "end");
    const idEvent = _.toInteger(_.get(info.event, "id"));
    const disPatch = _.get(this.props, "dispatch");

    if (typeof disPatch === "function") {
      const data = {
        id: idEvent,
        title: title,
        start: startTime,
        end: endTime
      };
      disPatch(updateEvent(data));
    }
  };

  handleShowMenu = e => {
    e.preventDefault();
    this.setState({ openMenu: !this.state.openMenu });
  };

  renderGroupButton = () => {
    const openMenu = _.get(this.state, "openMenu");
    if (openMenu === true) {
      return (
        <div
          className="btn-group w-100 p-1 btn-group-sm"
          role="group"
          aria-label="Basic example"
        >
          <button
            type="button"
            className="btn btn-primary btn-sm"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            onClick={this.handleShowAddEvent}
          >
            {"Add Event"}
          </button>
        </div>
      );
    }
  };

  render() {
    const calendarWeekends = _.get(this.state, "calendarWeekends");
    const dataList = _.get(this.props, "eventReducer");
    const openAddEvent = _.get(this.state, "openAddEvent");
    const getHeight = window.screen.height - 50;

    return (
      <div className="container text-center">
        <div className="row col-12 mt-2 mb-2">
          <div>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{ float: "left" }}
              onClick={this.handleShowMenu}
            >
              {"Menu"}
            </button>
            {this.renderGroupButton()}
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-12 col-sm-12 text-center">
            {/* <ListEvent data={dataList} /> */}

            <AddEvent open={openAddEvent} callBack={this.handleCallBackData} />
          </div>
          <div className="col-12 col-lg-12 col-md-12 col-sm-12">
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
              events={dataList}
              editable={true}
              droppable={true}
              height={getHeight}
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

  return {
    eventReducer
  };
}
export default connect(mapStateToProps)(MainCalendar);
