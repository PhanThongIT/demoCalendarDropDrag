import TimeLine from "./containers/timeline";
import Event from "./containers/event";

const routers = [
  {
    path: "/",
    component: TimeLine,
    exact: true
  },
  {
    path: "/event",
    component: Event,
    exact: true
  }
];
export default routers;
