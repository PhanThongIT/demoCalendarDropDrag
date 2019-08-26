import eventReducer from "./event";
import { combineReducers } from "redux";
import ganttReducer from "./gantt";

export default combineReducers({
  eventReducer,
  ganttReducer
});
