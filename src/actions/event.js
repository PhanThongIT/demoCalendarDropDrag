import config from "../../config";
import _ from "lodash";

let id = 0;
export const addEvent = (title, startTime, endTime) => {
  return {
    type: _.get(config.actionTypes, "ADD_EVENT"),
    payload: {
      id: id++,
      title: title,
      start: startTime,
      end: endTime
    }
  };
};

// TODO UPDATE Add event

export const updateEvent = data => {
  return {
    type: _.get(config.actionTypes, "UPDATE_EVENT"),
    payload: data
  };
};
