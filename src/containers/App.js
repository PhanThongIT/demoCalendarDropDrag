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
import { connect } from "react-redux";
import routers from "../routes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router basename="/">
        {routers.map(({ path, component, exact }, index) => {
          return (
            <Route
              key={index}
              exact={exact === true ? true : false}
              path={path}
              component={component}
            />
          );
        })}
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
