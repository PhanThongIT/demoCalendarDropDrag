import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  Modal,
  Form,
  Button,
  InputGroup,
  FormControl,
  Row
} from "react-bootstrap";
import InputMask from "react-input-mask";
import config from "../../../config";

class ModalEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorTitle: "",
      errorRangeDate: "",
      info: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (_.get(nextProps, "info")) {
      this.setState({ info: Object.assign(this.state.info, nextProps.info) });
    }
  }

  _handleEdit = e => {
    e.preventDefault();
    const stTitle = _.get(this.state, "info.title");
    const stStart = _.get(this.state, "info.start")
      ? new Date(_.get(this.state, "info.start"))
      : new Date();
    const stEnd = _.get(this.state, "info.end")
      ? new Date(_.get(this.state, "info.end"))
      : new Date();
    const fnCallBack = _.get(this.props, "callback");
    const onHideModal = _.get(this.props, "onHide");

    if (stTitle === "") {
      this.setState({
        errorTitle: _.get(config.messages, "requiredMessageTitle")
      });
      return;
    } else if (stStart > stEnd || stEnd - stStart < 0) {
      this.setState({
        errorRangeDate: _.get(config.messages, "errorRangeLimitDate")
      });
      return;
    }

    const data = {
      id: _.get(this.state, "info.id"),
      title: stTitle,
      start: stStart,
      end: stEnd
    };

    if (typeof fnCallBack === "function" && typeof onHideModal === "function") {
      this.setState({ errorTitle: "", errorRangeDate: "" }, () => {
        fnCallBack(data, _.get(config.type, "EDIT"));
        onHideModal();
      });
    }
  };

  _handleOnChange = e => {
    const nameEl = _.get(e.target, "name");
    const value = _.get(e.target, "value");

    if (nameEl === "title" && value !== "") {
      this.setState({ errorTitle: "", errorRangeDate: "" });
    }

    this.setState({
      info: Object.assign(this.state.info, { [nameEl]: value })
    });
  };

  _renderErrorTitle = () => {
    const errorTitle = _.get(this.state, "errorTitle");
    const errorRangeDate = _.get(this.state, "errorRangeDate");
    if (errorTitle !== "") {
      return (
        <span style={{ color: "red", alignContent: "centered" }}>
          {errorTitle}
        </span>
      );
    } else if (errorRangeDate !== "") {
      return (
        <span style={{ color: "red", alignContent: "centered" }}>
          {errorRangeDate}
        </span>
      );
    } else {
      return undefined;
    }
  };

  _handleRemove = e => {
    e.preventDefault();
    const fnCallBack = _.get(this.props, "callback");
    const onHideModal = _.get(this.props, "onHide");
    const id = _.get(this.state, "info.id");

    if (typeof fnCallBack === "function" && typeof onHideModal === "function") {
      const data = {
        id: id
      };
      this.setState({ errorTitle: "", errorRangeDate: "" }, () => {
        fnCallBack(data, _.get(config.type, "REMOVE"));
        onHideModal();
      });
    }
  };

  render() {
    const propOpen = _.get(this.props, "show");
    const onHideModal = _.get(this.props, "onHide");
    const info = _.get(this.state, "info");

    return (
      <Modal
        show={propOpen}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={onHideModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {"Edit Event"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this._renderErrorTitle()}

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="title">{"Title"}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Input title event"
              value={info.title ? _.get(info, "title") : ""}
              name={"title"}
              onChange={this._handleOnChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="title">{"Start time"}</InputGroup.Text>
            </InputGroup.Prepend>
            <InputMask
              id={"start"}
              className={"form-control"}
              placeholder={"Input event start time (YYYY/MM/DDTHH:MM:SS)"}
              name={"start"}
              value={info.start ? _.get(info, "start") : ""}
              mask="9999-99-99T99:99:00"
              onChange={this._handleOnChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="title">{"End time"}</InputGroup.Text>
            </InputGroup.Prepend>
            <InputMask
              id={"end"}
              className={"form-control"}
              name={"end"}
              value={info.end ? _.get(info, "end") : ""}
              placeholder={"Input event end time (YYYY/MM/DDTHH:MM:SS)"}
              mask="9999-99-99T99:99:00"
              onChange={this._handleOnChange}
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onHideModal}>{"Close"}</Button>
          <Button variant="danger" onClick={this._handleRemove}>
            {"Delete"}
          </Button>
          <Button variant="success" onClick={this._handleEdit}>
            {"Edit"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
ModalEdit.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
  callback: PropTypes.func,
  info: PropTypes.Object
};

export default ModalEdit;
