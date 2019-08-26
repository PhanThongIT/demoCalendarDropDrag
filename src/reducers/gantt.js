import _ from "lodash";
import config from "../../config";

const typeAddTimeline = _.get(config.actionTypes, "ADD_TIMELINE");

const timeline = (
  state = {
    data: [],
    links: [],
    selectItem: {}
  },
  action
) => {
  switch (action.type) {
    case typeAddTimeline:
      const payload = action.payload;

      return Object.assign({}, state, {
        data: [payload, ...state.data],
        links: state.links,
        selectItem: state.selectItem
      });
      break;

    default:
      return state;
  }
};

export default timeline;
