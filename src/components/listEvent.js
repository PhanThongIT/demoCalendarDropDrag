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
        id={id}
        className={`fc-event mt-2 card-text event_${id}`}
        title={titleItem}
      >
        {titleItem}
      </div>
    );
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
