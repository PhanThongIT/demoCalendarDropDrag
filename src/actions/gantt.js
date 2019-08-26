import config from "../../config";
import _ from "lodash";
import ReducerHelper from "../helper/generator";

let id = 0;
export const addTimeline = data => {
  const typeAddTimeline = _.get(config.actionTypes, "ADD_TIMELINE");
  return {
    type: typeAddTimeline,
    payload: {
      id: id++,
      start: _.get(data, "start"),
      end: _.get(data, "end"),
      name: _.get(data, "name"),
      color: ReducerHelper.getRandomColor()
    }
  };
};
