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
import ListEvent from "../components/listEvent";
import { connect } from "react-redux";
import { addEvent, updateEvent, removeEvent } from "../actions/event";
import AddEvent from "../components/event";
import list from "@fullcalendar/list";
import EditEvent from "../components/event/edit";
import config from "../../config";
import { isMobile } from "react-device-detect";

class MainCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarWeekends: true,
      openAddEvent: false,
      openMenu: false,
      openEdit: false,
      dataEvent: {}
    };
    this.calendarComponentRef = React.createRef();
  }

  // componentDidMount() {
  //   const btnDayEl = document.getElementsByClassName("fc-timeGridDay-button");
  //   const btnDay = _.get(btnDayEl, "[0]");
  //   btnDay.addEventListener("click", this._handleUpdateDate);
  // }

  // _handleUpdateDate = () => {};

  // shouldComponentUpdate(nextProps, nextStates) {
  //   const propEvent = _.get(this.props, "eventReducer");
  //   const nxtPropEvent = _.get(nextProps, "eventReducer");
  //   if (propEvent !== nxtPropEvent) {
  //     return true;
  //   }
  //   return false;
  // }

  _handleShowAddEvent = e => {
    e.preventDefault();
    this.setState({ openAddEvent: true });
  };

  _handleCallBackData = data => {
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

  _handledropEvent = info => {
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

  _renderGroupButton = () => {
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
          onClick={this._handleShowAddEvent}
        >
          {"Add event"}
        </button>
      </div>
    );
  };

  _splitDateTime = stringDate => {
    if (!stringDate) {
      return;
    }
    const date = new Date(stringDate);
    // 2019-08-09T22:22:00
    const month = date.getMonth() + 1;
    const getFullMonth = 1 < month <= 9 ? `0${month}` : month;
    const getDay = date.getDate();
    const getFullDate = getDay <= 9 ? `0${getDay}` : getDay;
    const result = `${date.getFullYear()}-${getFullMonth}-${getFullDate}T${date.getHours()}:${date.getMinutes()}:00`;
    return result;
  };

  _handleClickEvent = data => {
    data.jsEvent.preventDefault();
    this.setState({ openEdit: true });
    const idEvent = _.toInteger(_.get(data, "event.id"));
    const startTime = _.get(data, "event.start");
    const endTime = _.get(data, "event.end");
    const title = _.get(data, "event.title");

    const info = {
      id: idEvent,
      start: this._splitDateTime(startTime),
      end: this._splitDateTime(endTime),
      title: title
    };
    const dataEvent = { ...this.state.dataEvent, ...info };

    this.setState({ dataEvent });
  };

  _handleEditEvent = () => {
    this.setState({ openEdit: false });
  };

  _handleCallBackEvent = (data, type) => {
    if (_.isEmpty(data)) {
      return;
    }

    const disPatch = _.get(this.props, "dispatch");
    if (
      type === _.get(config.type, "EDIT") &&
      typeof disPatch === "function" &&
      typeof updateEvent === "function"
    ) {
      disPatch(updateEvent(data));
    } else if (
      type === _.get(config.type, "REMOVE") &&
      typeof disPatch === "function" &&
      typeof removeEvent === "function"
    ) {
      disPatch(removeEvent(data));
    }
  };

  render() {
    const calendarWeekends = _.get(this.state, "calendarWeekends");
    const dataList = _.get(this.props, "eventReducer");
    const openAddEvent = _.get(this.state, "openAddEvent");
    const getHeight = window.screen.height - 50;
    const stOpenEdit = _.get(this.state, "openEdit");
    const stEventData = _.get(this.state, "dataEvent");
    let customeHeader = {};
    if (isMobile) {
      customeHeader = {
        left: "prev,next",
        right: "timeGridWeek,timeGridDay"
      };
    } else {
      customeHeader = {
        left: "prev,next",
        right: "dayGridMonth,timeGridWeek,timeGridDay"
      };
    }

    return (
      <div className="container text-center">
        <div className="row col-12 mt-2 mb-2">
          <div>{this._renderGroupButton()}</div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-12 col-sm-12 text-center">
            <AddEvent open={openAddEvent} callBack={this._handleCallBackData} />
            <EditEvent
              show={stOpenEdit}
              onHide={this._handleEditEvent}
              info={stEventData ? stEventData : {}}
              callback={this._handleCallBackEvent}
            />
          </div>
          <div className="col-12 col-lg-12 col-md-12 col-sm-12">
            <FullCalendar
              id={"calendar"}
              defaultView="dayGridMonth"
              header={customeHeader}
              schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                bootstrapPlugin,
                list
              ]}
              unselectAuto="true"
              defaultDate={new Date()}
              themeSystem="bootstrap"
              ref={this.calendarComponentRef}
              weekends={calendarWeekends}
              events={[...dataList]}
              editable={true}
              droppable={true}
              height={getHeight}
              eventDrop={this._handledropEvent}
              eventClick={this._handleClickEvent}
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
