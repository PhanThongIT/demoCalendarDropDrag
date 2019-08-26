import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import config from "../../../config";
import InputMask from "react-input-mask";
import $ from "jquery";
import { isMobile } from "react-device-detect";

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      startTime: "2019-08-26T11:00:00",
      endTime: "2019-08-27T20:00:00",
      errorTitle: "",
      errorRangeDate: ""
    };
  }

  _handleChange = e => {
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

  _renderErrorTitle = () => {
    const errorTitle = _.get(this.state, "errorTitle");
    if (!_.isNull(errorTitle)) {
      return <div className="invalid-feedback">{errorTitle}</div>;
    } else {
      return undefined;
    }
  };

  _handleSubmit = e => {
    e.preventDefault();
    if (typeof window.ReactNativeWebView !== "undefined") {
      window.ReactNativeWebView.postMessage("asdada");
    }

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

        if (stStartTime > stEndTime || stEndTime - stStartTime < 0) {
          this.setState({
            errorRangeDate: _.get(config.messages, "errorRangeLimitDate")
          });
          return;
        }

        const data = {
          title: stTitle,
          start: stStartTime,
          end: stEndTime,
          allDay: false
        };
        window.$("#exampleModalCenter").modal("hide");

        return callBackData(data);
      }
    }
  };

  _handleChangeDate = e => {
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
    const errorRangeDate = _.get(this.state, "errorRangeDate");

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

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        Title
                      </span>
                    </div>
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
                      onChange={this._handleChange}
                      aria-describedby="basic-addon1"
                    />
                    {this._renderErrorTitle()}
                  </div>

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text " id="inputStartTime">
                        {"Start time"}
                      </span>
                    </div>
                    <InputMask
                      className={
                        _.get(this.state, "errorRangeDate")
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder={"Input event start time"}
                      name={"startTime"}
                      value={startTime}
                      mask="9999-99-99T99:99:00"
                      onChange={this._handleChangeDate}
                    />
                    {errorRangeDate && (
                      <div className="invalid-feedback">{errorRangeDate}</div>
                    )}
                  </div>

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="inputStartTime">
                        {"Start time"}
                      </span>
                    </div>
                    <InputMask
                      className={"form-control"}
                      name={"endTime"}
                      value={endTime}
                      placeholder={"Input event end time"}
                      mask="9999-99-99T99:99:00"
                      onChange={this._handleChangeDate}
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
                  {"Close"}
                </button>
                <button
                  onClick={this._handleSubmit}
                  type="button"
                  className="btn btn-primary"
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
