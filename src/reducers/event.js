import config from "../../config";
import _ from "lodash";

const typeAddEvent = _.get(config.actionTypes, "ADD_EVENT");
const typeUpdateEvent = _.get(config.actionTypes, "UPDATE_EVENT");
const typeRemoveEvent = _.get(config.actionTypes, "REMOVE_EVENT");

const event = (state = [], action) => {
  switch (action.type) {
    case typeAddEvent:
      return [...state, action.payload];
      break;

    case typeUpdateEvent:
      const payloadData = action.payload;
      const id = _.get(payloadData, "id");

      state.map((item, index) => {
        if (item.id === id) {
          state[index] = payloadData;
        }
      });

      return [...state];
      break;

    case typeRemoveEvent:
      const payload = action.payload;
      const idEvent = _.get(payload, "id");

      state.map((item, index) => {
        if (item.id === idEvent) {
          state.splice(index, 1);
          return;
        }
      });

      return [...state];
      break;

    default:
      return state;
  }
};

export default event;
