import config from "../../config";
import _ from "lodash";
import ReducerHelper from "../helper/generator";

let idItem = 0;
let idLink = 0;
export const addTimeline = data => {
  return {
    type: _.get(config.actionTypes, "ADD_TIMELINE"),
    payload: {
      id: idItem++,
      start: _.get(data, "start"),
      end: _.get(data, "end"),
      name: `Task ${idItem}`,
      color: ReducerHelper.getRandomColor()
    }
  };
};

export const selectItem = item => {
  return {
    type: _.get(config.actionTypes, "SELECT_TIMELINE"),
    payload: { item: item }
  };
};

export const updateTask = (item, dataChanged) => {
  return {
    type: _.get(config.actionTypes, "UPDATE_TIMELINE"),
    payload: {
      item: item,
      dataChanged: dataChanged
    }
  };
};

export const createLink = item => {
  const objId = { id: idLink++ };
  item = { ...item, ...objId };

  return {
    type: _.get(config.actionTypes, "CREATE_LINK"),
    payload: { item: item }
  };
};
