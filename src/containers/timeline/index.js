import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import TimeLine from "react-gantt-timeline";
import { Container, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Button, Fab, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { addTimeline } from "../../actions/gantt";

class TimeLines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // links:
      selectedItem: null,
      timelineMode: "month",
      nonEditableName: false,
      itemHeight: 20
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  _handleAddTimeline = e => {
    e.preventDefault();
    const dateStart = new Date();
    const dateEnd = new Date("Aug 28 2019 17:40:08 GMT+0700");
    const data = {
      name: "Phan Thong",
      start: dateStart,
      end: dateEnd
    };

    const fnDispatch = _.get(this.props, "dispatch");
    if (typeof fnDispatch === "function" && typeof addTimeline === "function") {
      fnDispatch(addTimeline(data));
    }
  };

  _onSelectItem = item => {
    console.log(item);
  };

  render() {
    const data = _.get(this.props, "data");
    // const links = _.get(this.state, "links");
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

              <Button
                size="small"
                variant="outlined"
                size="medium"
                color="primary"
                selected
              >
                Day
              </Button>
              <Button
                size="small"
                variant="outlined"
                size="medium"
                color="primary"
              >
                Week
              </Button>
              <Button
                size="small"
                variant="outlined"
                size="medium"
                color="primary"
              >
                Month
              </Button>
              <Button
                size="small"
                variant="outlined"
                size="medium"
                color="primary"
              >
                Year
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <TimeLine
              data={[...data]}
              // links={links}
              // onHorizonChange={this.onHorizonChange}
              onSelectItem={this._onSelectItem}
              // onUpdateTask={this.onUpdateTask}
              // onCreateLink={this.onCreateLink}
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
  console.log(ganttReducer, data);
  return {
    data: data,
    links: links,
    selectedItem: selectedItem
  };
};
export default connect(mapStateToProps)(TimeLines);
