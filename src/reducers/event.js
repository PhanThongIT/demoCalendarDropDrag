import config from "../../config";
import _ from "lodash";

const typeAddEvent = _.get(config.actionTypes, "ADD_EVENT");
const event = (state = [], action) => {
  switch (action.type) {
    case typeAddEvent:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default event;
