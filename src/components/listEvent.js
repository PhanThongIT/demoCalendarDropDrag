import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Draggable } from "@fullcalendar/interaction";

class ListEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem = item => {
    const titleItem = _.get(item, "title");
    const id = _.get(item, "id");

    return (
      <div
        key={id}
        className={"fc-event mt-2 card-text"}
        title={titleItem}
        draggable
        onDragOver={this.handleDragItem}
      >
        {titleItem}
      </div>
    );
  };

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", this.handleDragItem);
  }

  handleDragItem = e => {
    e.preventDefault();
    const containerEl = document.getElementById("external-events");

    new Draggable(containerEl, {
      itemSelector: ".fc-event",
      eventData: this.handleEvent
    });
  };

  handleEvent = info => {
    const data = {
      title: info.innerText,
      start: new Date()
    };
    const fnCallBack = _.get(this.props, "callBack");

    if (typeof fnCallBack === "function" && data) {
      fnCallBack(data);
    }

    return data;
  };

  handleCallBack = () => {
    const fnCallBack = _.get(this.props, "callBack");
    const data = _.get(this.state, "data");
    if (typeof fnCallBack === "function" && data) {
      return fnCallBack(data);
    }
  };

  render() {
    const listData = _.get(this.props, "data");
    return (
      <div
        id={"external-events"}
        className="card p-2"
        style={{ width: "18rem" }}
      >
        <p className="text-center text-uppercase">{"menu"}</p>
        <div className="card-body">{listData.map(this.renderItem)}</div>
      </div>
    );
  }
}

ListEvent.propTypes = {
  data: PropTypes.array,
  callBack: PropTypes.func
};

export default ListEvent;
