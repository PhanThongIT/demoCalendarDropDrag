import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import TimeLine from "react-gantt-timeline";
import { Container, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Button, Fab, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import {
  addTimeline,
  selectItem,
  updateTask,
  createLink
} from "../../actions/gantt";
import config from "../../../config";

class TimeLines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // links:
      selectedItem: null,
      timelineMode: "",
      nonEditableName: false,
      itemHeight: 20
    };
  }

  componentDidMount() {
    const listModeGantts = _.get(config, "modeGantt");
    let modeGantt = "";
    if (!_.isEmpty(listModeGantts)) {
      const defaultMode = _.get(listModeGantts[0], "value");
      modeGantt = defaultMode;
    } else {
      modeGantt = "month";
    }

    this.setState({ timelineMode: modeGantt });
  }

  _handleAddTimeline = e => {
    e.preventDefault();
    const dateStart = new Date();
    const dateEnd = new Date("Aug 28 2019 17:40:08 GMT+0700") + 3;
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
      fnDispatch(updateTask(item, dataChanged));
    }
  };

  _onCreateLink = item => {
    const fnDispatch = _.get(this.props, "dispatch");
    if (item && typeof fnDispatch === "function") {
      fnDispatch(createLink(item));
    }
  };

  _renderButton = (item, index) => {
    return (
      <button
        key={index}
        type="button"
        className="btn btn-outline-primary"
        id={_.get(item, "id")}
        name={_.get(item, "value")}
        size="small"
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
    const selectedItem = _.get(this.state, "selectedItem");
    const nonEditableName = _.get(this.state, "nonEditableName");
    const itemHeight = _.get(this.state, "itemHeight");

    return (
      <Container maxWidth="xl" style={{ marginTop: "10px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div>
              <IconButton aria-label="add" onClick={this._handleAddTimeline}>
                <AddIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>

              {this._renderGroupButton()}
            </div>
          </Grid>
          <Grid item xs={12}>
            <TimeLine
              data={[...data]}
              links={listLinks}
              // onHorizonChange={this.onHorizonChange}
              onSelectItem={this._onSelectItem}
              onUpdateTask={this._onUpdateTask}
              onCreateLink={this._onCreateLink}
              mode={timelineMode}
              itemheight={itemHeight}
              selectedItem={selectedItem}
              nonEditableName={nonEditableName}
            />
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
  const { data, links, selectedItem } = ganttReducer;

  return {
    data: data,
    links: [...links],
    selectedItem: selectedItem
  };
};
export default connect(mapStateToProps)(TimeLines);
