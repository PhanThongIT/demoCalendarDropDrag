import _ from "lodash";
import config from "../../config";

const timeline = (
  state = {
    data: [],
    links: [],
    selectItem: {}
  },
  action
) => {
  switch (action.type) {
    case _.get(config.actionTypes, "ADD_TIMELINE"):
      const payload = action.payload;

      return Object.assign({}, state, {
        data: [payload, ...state.data],
        links: state.links,
        selectItem: state.selectItem
      });
      break;

    case _.get(config.actionTypes, "SELECT_TIMELINE"):
      const actionPayload = action.payload;
      return {
        data: state.data,
        links: state.links,
        selectItem: _.get(actionPayload, "item")
      };
      break;

    case _.get(config.actionTypes, "UPDATE_TIMELINE"):
      const dataUpdate = action.payload;
      const dataChanged = _.get(dataUpdate, "dataChanged");
      const dataList = _.get(state, "data");
      const idItem = _.get(dataUpdate.item, "id");
      const start = _.get(dataChanged, "start");
      const end = _.get(dataChanged, "end");

      if (!_.isEmpty(dataList)) {
        dataList.map((item, index) => {
          if (idItem === item.id) {
            item.start = start ? start : item.start;
            item.end = end ? end : item.end;
            return;
          }
        });
      }

      return Object.assign({}, state, {
        data: [...dataList],
        links: [...state.links],
        selectItem: state.selectItem
      });
      break;
    case _.get(config.actionTypes, "CREATE_LINK"):
      const dataItem = _.get(action.payload, "item");
      const idStart = _.get(dataItem.start, "task.id");
      const idEnd = _.get(dataItem.end, "task.id");
      const newLink = {
        id: _.get(dataItem, "id"),
        start: idStart,
        end: idEnd
      };

      return Object.assign({}, state, {
        data: [...state.data],
        links: [newLink, ...state.links],
        selectItem: { ...newLink }
      });
      break;

    case _.get(config.actionTypes, "REMOVE_LINK"):
      const dataLink = action.payload;
      state.links.map((itemLink, index) => {
        if (
          itemLink.start === _.get(dataLink.data, "start") &&
          itemLink.end === _.get(dataLink.data, "end")
        ) {
          state.links.splice(index, 1);
          return;
        }
      });
      return Object.assign({}, state, {
        data: [...state.data],
        links: [...state.links],
        selectItem: null
      });
      break;

    default:
      return state;
  }
};

export default timeline;
