import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  HashRouter
} from "react-router-dom";
import Event from "../containers/event/index";
import TimeLine from "../containers/timeline";
import { connect } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router basename="/">
        <Route exact path="/" component={TimeLine} />
        <Route exact path="/timeline" component={TimeLine} />
      </Router>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
