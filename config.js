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
    requiredMessageTitle: "Title is required!",
    errorRangeLimitDate: "Time start must not be greater than the time end"
  },
  textContent: {
    titleWeb: "Calendar Demo"
  },
  actionTypes: {
    // Event
    ADD_EVENT: "ADD_EVENT",
    UPDATE_EVENT: "UPDATE_EVENT",
    REMOVE_EVENT: "REMOVE_EVENT",
    // Gantt
    ADD_TIMELINE: "ADD_TIMELINE",
    REMOVE_TIMELINE: "REMOVE_TIMELINE",
    UPDATE_TIMELINE: "UPDATE_TIMELINE",
    SELECT_TIMELINE: "SELECT_TIMELINE",
    CREATE_LINK: "CREATE_LINK"
  },
  modeGantt: [
    {
      id: 0,
      value: "month",
      text: "Month"
    },
    {
      id: 1,
      value: "day",
      text: "Day"
    },
    {
      id: 2,
      value: "week",
      text: "Week"
    },
    {
      id: 3,
      value: "year",
      text: "Year"
    }
  ],
  type: {
    REMOVE: "REMOVE",
    EDIT: "EDIT",
    ADD: "ADD"
  },
  regex: {
    date:
      "/-?[0-9]{4}-(((0(1|3|5|7|8)|1(0|2))-(0[1-9]|(1|2)[0-9]|3[0-1]))|((0(4|6|9)|11)-(0[1-9]|(1|2)[0-9]|30))|(02-(0[1-9]|(1|2)[0-9])))T([0-1][0-9]|2[0-4]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])([0-999])?(([0-1][0-9]|2[0-4]):(0[0-9]|[1-5][0-9]))?/g"
  }
};

export default config;
