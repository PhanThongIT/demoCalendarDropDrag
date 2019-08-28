import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import TimeLine from "react-gantt-timeline";
import { Container, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import {
  addTimeline,
  selectItem,
  updateTask,
  createLink
} from "../../actions/gantt";
import config from "../../../config";
import { isMobile } from "react-device-detect";
import styles from "./style.js";

class TimeLines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      timelineMode: "",
      nonEditableName: false,
      errorLink: false
    };
  }

  componentDidMount() {
    this._fixedGridContent();
    const listModeGantts = _.get(config, "modeGantt");
    let modeGantt = "";

    if (!_.isEmpty(listModeGantts)) {
      const defaultMode = _.get(listModeGantts[0], "value");
      modeGantt = defaultMode;
    } else {
      modeGantt = _.get(config.default, "modeGantt");
    }

    this.setState({ timelineMode: modeGantt });
  }

  componentDidUpdate() {
    this._handleCustomScreen();
    this._handleRemoveLink();
    this._setTitleListTimeline();
  }

  _setTitleListTimeline = () => {
    const titleTimelineEle = document.getElementsByClassName(
      "timeLine-side-title"
    );
    const titleTimeline = _.get(titleTimelineEle, "[0]");
    if (titleTimeline) {
      titleTimeline.innerText = _.get(config.textContent, "titleTimeLine");
    }
  };

  _handleCustomScreen = () => {
    const heightMainEle = document.getElementsByClassName(
      "time-line-container"
    );
    const heightMain = _.get(heightMainEle, "[0]");
    const screenHeight =
      screen.height - _.get(config.enums, "HEIGHT_HEADER_TIMELINE");

    if (heightMain && heightMain.clientHeight >= screenHeight) {
      heightMain.style.height = `${screenHeight}px`;
    }
  };

  _fixedGridContent = () => {
    const gridEle = document.getElementsByClassName("timeLine-side-main");
    const gridTimeLine = _.get(gridEle, "[0]");

    if (gridTimeLine && isMobile) {
      gridTimeLine.style.width = `${_.get(
        config.enums,
        "WIDTH_IS_MOBILE_TASK_LIST"
      )}px`;
    }
  };

  _handleRemoveLink = () => {
    const linkEle = document.getElementsByClassName("timeline-link");
    const propLinks = _.get(this.props, "links");
    const lengthLinks = _.get(propLinks, "length");
    const lengthEle = _.get(linkEle, "length");

    if (lengthLinks < lengthEle) {
      const link = _.get(linkEle, `[${lengthLinks}]`);
      if (link && lengthEle > 0) {
        link.setAttribute("hidden", true);
      }
    }
  };

  _handleAddTimeline = e => {
    e.preventDefault();
    const dateStart = new Date();
    const dateEnd = new Date(_.get(config.default, "createdEndTime"));
    const data = {
      start: dateStart,
      end: dateEnd
    };

    const fnDispatch = _.get(this.props, "dispatch");
    if (typeof fnDispatch === "function" && typeof addTimeline === "function") {
      fnDispatch(addTimeline(data));
    }
  };

  _onSelectItem = item => {
    const fnDispatch = _.get(this.props, "dispatch");
    if (item && typeof fnDispatch === "function") {
      fnDispatch(selectItem(item));
    }
  };

  _onUpdateTask = (item, dataChanged) => {
    const fnDispatch = _.get(this.props, "dispatch");
    if (item && dataChanged && typeof fnDispatch === "function") {
      if (
        new Date(`${dataChanged.end}`) - new Date(`${dataChanged.start}`) <
        0
      ) {
        this.setState({ errorLink: true }, () => {
          window.alert(_.get(config.messages, "validTimeline"));
          return;
        });
      } else {
        this.setState({ errorLink: false });
        fnDispatch(updateTask(item, dataChanged));
      }
    }
  };

  _onCreateLink = item => {
    const idStart = _.get(item.start, "task.id");
    const idEnd = _.get(item.end, "task.id");
    if (idStart === idEnd || !idStart) {
      return;
    } else if (this.state.errorLink === false) {
      const fnDispatch = _.get(this.props, "dispatch");
      if (item && typeof fnDispatch === "function") {
        fnDispatch(createLink(item));
      }
    }
  };

  _renderButton = (item, index) => {
    const stModeGantt = _.get(this.state, "timelineMode");

    return (
      <button
        key={index}
        type="button"
        className="btn btn-outline-primary btn-sm ml-1"
        id={_.get(item, "id")}
        name={_.get(item, "value")}
        style={stModeGantt === _.get(item, "value") ? styles.activeButton : {}}
        color="btn-primary"
        onClick={this._handleChangeMode}
      >
        {_.get(item, "text")}
      </button>
    );
  };

  _renderGroupButton = () => {
    const listMode = _.get(config, "modeGantt");
    if (!_.isEmpty(listMode)) {
      return listMode.map(this._renderButton);
    }
  };

  _handleChangeMode = e => {
    e.preventDefault();
    const name = e.target.name;
    this.setState({ timelineMode: name });
  };

  render() {
    const data = _.get(this.props, "data");
    const listLinks = _.get(this.props, "links");
    const timelineMode = _.get(this.state, "timelineMode");
    const selectedItem = _.get(this.props, "selectItem");
    const nonEditableName = _.get(this.state, "nonEditableName");

    return (
      <Container maxWidth="xl" style={{ marginTop: "10px" }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <IconButton
              style={{ backgroundColor: "#007bff" }}
              size="small"
              aria-label="add"
              onClick={this._handleAddTimeline}
            >
              <AddIcon />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            {this._renderGroupButton()}
          </Grid>

          <Grid item xs={12}>
            <div
              className="time-line-container"
              style={_.get(styles, "styleMain")}
            >
              <TimeLine
                data={[...data]}
                links={listLinks}
                onHorizonChange={this.onHorizonChange}
                onSelectItem={this._onSelectItem}
                onUpdateTask={this._onUpdateTask}
                onCreateLink={this._onCreateLink}
                mode={timelineMode}
                itemheight={_.get(config.enums, "HEIGHT_TASK_ITEM")}
                selectedItem={selectedItem}
                nonEditableName={nonEditableName}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

TimeLines.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  const { ganttReducer } = state;
  const { data, links, selectItem } = ganttReducer;
  return {
    data: [...data],
    links: links,
    selectItem: selectItem
  };
};
export default connect(mapStateToProps)(TimeLines);
