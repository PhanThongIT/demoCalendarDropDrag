import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import config from "../../../config";
import InputMask from "react-input-mask";

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "Test Event",
      errorTitle: "",
      startTime: "2019-08-09T22:22:00",
      endTime: "2019-08-10T22:22:00"
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
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  {"Create Event"}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="p-2">
                  <h5>{"Create Event"}</h5>
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
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={this.handleSubmit}
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  {"Submit"}
                </button>
              </div>
            </div>
          </div>
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
