import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import config from "../../../config";
import InputMask from "react-input-mask";

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      errorTitle: "",
      startTime: "",
      endTime: ""
    };
  }

  handleChange = e => {
    e.preventDefault();
    const valueTitle = _.get(e.target, "value");
    const targetName = _.get(e.target, "name");

    if (!_.isNull(valueTitle)) {
      this.setState({
        [targetName]: valueTitle,
        errorTitle: ""
      });
    }
  };

  renderErrorTitle = () => {
    const errorTitle = _.get(this.state, "errorTitle");
    if (!_.isNull(errorTitle)) {
      return <div className="invalid-feedback">{errorTitle}</div>;
    } else {
      return undefined;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const stTitle = _.get(this.state, "title");
    if (stTitle.length === 0) {
      this.setState(
        {
          errorTitle: _.get(config.messages, "requiredMessageTitle")
        },
        () => {
          return;
        }
      );
    } else {
      const callBackData = _.get(this.props, "callBack");
      console.log(_.get(this.state, "endTime"));
      if (typeof callBackData === "function") {
        const stStartTime = _.get(this.state, "startTime")
          ? new Date(`${_.get(this.state, "startTime")}`)
          : new Date();
        const stEndTime = _.get(this.state, "endTime")
          ? new Date(`${_.get(this.state, "endTime")}`)
          : new Date();
        const data = {
          title: stTitle,
          start: stStartTime,
          end: stEndTime,
          allDay: false
        };

        return callBackData(data);
      }
    }
  };

  handleChangeDate = e => {
    e.preventDefault();
    const nameEl = _.get(e.target, "name");
    const valueEl = _.get(e.target, "value");

    this.setState({
      [nameEl]: valueEl
    });
  };

  render() {
    const propOpen = _.get(this.props, "open");
    const startTime = _.get(this.state, "startTime");
    const endTime = _.get(this.state, "endTime");

    return (
      propOpen === true && (
        <div className="p-2">
          <h5>Create Event</h5>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputTitle">{"Event title"}</label>
              <input
                className={
                  _.get(this.state, "errorTitle")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="inputTitle"
                type="text"
                placeholder="Input event title"
                value={_.get(this.state, "title")}
                name="title"
                onChange={this.handleChange}
              />
              {this.renderErrorTitle()}
            </div>

            <div className="mb-3">
              <InputMask
                className={"form-control"}
                placeholder={"Input event start time"}
                name={"startTime"}
                value={startTime}
                mask="9999-99-99T99:99:00"
                onChange={this.handleChangeDate}
              />
            </div>

            <div className="mb-3">
              <InputMask
                className={"form-control"}
                name={"endTime"}
                value={endTime}
                placeholder={"Input event end time"}
                mask="9999-99-99T99:99:00"
                onChange={this.handleChangeDate}
              />
            </div>

            <button className="btn btn-primary">{"Submit"}</button>
          </form>
        </div>
      )
    );
  }
}

AddEvent.propTypes = {
  open: PropTypes.bool,
  callBack: PropTypes.func
};

export default AddEvent;
