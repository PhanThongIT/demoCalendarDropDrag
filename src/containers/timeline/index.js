import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import TimeLine from "react-gantt-timeline";
import { Container, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { DeleteTwoTone, DeleteForeverTwoTone } from "@material-ui/icons";
import { IconButton, Icon } from "@material-ui/core";
import { connect } from "react-redux";
import {
  addTimeline,
  selectItem,
  updateTask,
  createLink,
  removeLink
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
      errorLink: false,
      hideList: true,
      disbleRemove: true
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
      const itemData = item;
      if (
        new Date(`${dataChanged.end}`) - new Date(`${dataChanged.start}`) <
        0
      ) {
        this.setState({ errorLink: true }, () => {
          window.alert(_.get(config.messages, "validTimeline"));
          return;
        });
      } else {
        this._handleRemoveLink(itemData, dataChanged);
        this.setState({ errorLink: false }, () => {
          fnDispatch(updateTask(item, dataChanged));
        });
      }
    }
  };

  _handleRemoveLink = (item, dataChanged) => {
    const links = _.get(this.props, "links");
    const listTask = _.get(this.props, "data");
    const idSelectedTask = _.get(item, "id");
    const disbleRemove = _.get(this.state, "disbleRemove");

    if (
      disbleRemove === true &&
      !_.isEmpty(links) &&
      !_.isEmpty(item) &&
      !_.isEmpty(listTask)
    ) {
      links.map((itemLink, index) => {
        if (itemLink.start === idSelectedTask) {
          listTask.map((itemTask, index) => {
            if (
              itemTask.id === itemLink.end &&
              new Date(`${itemTask.end}`) - new Date(`${dataChanged.end}`) < 0
            ) {
              const fnDispatch = _.get(this.props, "dispatch");
              if (typeof fnDispatch === "function") {
                const data = {
                  start: idSelectedTask,
                  end: itemTask.id
                };
                fnDispatch(removeLink(data));
              }
            }
          });
        }
      });
    }

    if (
      disbleRemove === true &&
      !_.isEmpty(links) &&
      !_.isEmpty(item) &&
      !_.isEmpty(listTask)
    ) {
      links.map((itemLink, index) => {
        if (itemLink.end === idSelectedTask) {
          listTask.map((itemTask, idx) => {
            if (
              itemLink.start === itemTask.id &&
              new Date(`${itemTask.end}`) - new Date(`${dataChanged.end}`) > 0
            ) {
              const fnDispatch = _.get(this.props, "dispatch");
              if (typeof fnDispatch === "function") {
                const data = {
                  start: itemTask.id,
                  end: idSelectedTask
                };
                fnDispatch(removeLink(data));
              }
            }
          });
        } else if (itemLink.start === idSelectedTask) {
          listTask.map((itemTask, index) => {
            if (
              itemTask.id === itemLink.end &&
              new Date(`${itemTask.end}`) - new Date(`${dataChanged.end}`) < 0
            ) {
              const fnDispatch = _.get(this.props, "dispatch");
              if (typeof fnDispatch === "function") {
                const data = {
                  start: idSelectedTask,
                  end: itemTask.id
                };
                fnDispatch(removeLink(data));
              }
            }
          });
        }
      });
    }
  };

  _onCreateLink = item => {
    const idStart = _.get(item.start, "task.id");
    const idEnd = _.get(item.end, "task.id");
    const disbleRemove = _.get(this.state, "disbleRemove");
    const timeEndByItemStart = _.get(item, "start.task.end");
    const timeEndByItemEnd = _.get(item, "end.task.end");
    const errorLink = _.get(this.state, "errorLink");

    if (idStart === idEnd) {
      return;
    } else if (
      new Date(`${timeEndByItemStart}`) - new Date(`${timeEndByItemEnd}`) > 0 &&
      disbleRemove === true
    ) {
      window.alert("Not valid link!");
      return;
    } else if (errorLink === false) {
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

  _onClickShowList = e => {
    e.preventDefault();
    const gridEle = document.getElementsByClassName("timeLine-side-main");
    const gridTimeLine = _.get(gridEle, "[0]");
    const stHideList = _.get(this.state, "hideList");

    if (stHideList === true && gridTimeLine) {
      gridTimeLine.setAttribute("hidden", "true");
    } else if (stHideList === false && gridTimeLine) {
      gridTimeLine.removeAttribute("hidden");
    }

    this.setState({ hideList: !stHideList });
  };

  _handleHideList = () => {
    const stHideList = _.get(this.state, "hideList");
    return (
      <IconButton
        style={{ backgroundColor: "bisque" }}
        size="small"
        onClick={this._onClickShowList}
        style={{ marginLeft: "5px" }}
      >
        <Icon
          className={stHideList === true ? "fa fa-bars" : "fa fa-list-alt"}
        />
      </IconButton>
    );
  };

  _onChangeModeRemove = () => {
    const disbleRemove = _.get(this.state, "disbleRemove");
    this.setState({ disbleRemove: !disbleRemove });
  };

  _renderButtonRemoveLink = () => {
    const disbleRemove = _.get(this.state, "disbleRemove");
    return (
      <IconButton
        style={{ backgroundColor: "bisque" }}
        size="small"
        onClick={this._onChangeModeRemove}
        style={{ marginLeft: "5px" }}
      >
        {disbleRemove === true && <DeleteTwoTone fontSize="default" />}
        {disbleRemove === false && <DeleteForeverTwoTone fontSize="default" />}
      </IconButton>
    );
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
              style={{ backgroundColor: "bisque" }}
              size="small"
              aria-label="add"
              onClick={this._handleAddTimeline}
            >
              <Icon className="fa fa-plus-circle" color="action" />
            </IconButton>

            {this._handleHideList()}
            {this._renderButtonRemoveLink()}
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
