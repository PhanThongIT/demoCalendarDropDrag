const config = {
  listEvent: [
    {
      id: "event1",
      title: "Event 1"
    },
    {
      id: "event2",
      title: "Event 2"
    },
    {
      id: "event3",
      title: "Event 3"
    },
    {
      id: "event4",
      title: "Event 4"
    }
  ],
  messages: {
    requiredMessageTitle: "Title is required!"
  },
  textContent: {
    titleWeb: "Calendar Demo"
  },
  actionTypes: {
    ADD_EVENT: "ADD_EVENT",
    UPDATE_EVENT: "UPDATE_EVENT",
    REMOVE_EVENT: "REMOVE_EVENT"
  },
  type: {
    REMOVE: "REMOVE",
    EDIT: "EDIT",
    ADD: "ADD"
  }
};

export default config;
