# CALENDAR DEMO - REACTJS - REDUX

# Documents

1. Install source code.

```js
    1. cd demoCalendarDropDrag/
    2. npm install
    3. npm run start (Run source)
```

2. Config Webpack and babel:

   1. webpack.config.js and babel

```js
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: "./dist",
    hot: true
  }
};
```

babelrc.js

```js
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties"
  ]
}
```

pakage.json

```json
"scripts": {
    "start": "webpack-dev-server --config ./webpack.config.js --mode development",
    "test": "echo \"No test specified\" && exit 0"
  }

```

2. Install library for calendar (https://fullcalendar.io/)
3. Install lodash, boostrap 4
4. Adding to component FullCalendar for free trial:

```js
schedulerLicenseKey = "GPL-My-Project-Is-Open-Source";
```

5. Resize for mobile web and disable zoom in web mobile

- Add code for head tag in file index.html

```
 <meta name="viewport" content="width=device-width, user-scalable=no" />
```

- Use ngrok.io to connect for device mobile

  Follow : https://ngrok.com/

  After ngrok installed:

  Add config host file with terminal:

```js
./ngrok http 8080 -host-header="localhost:8080"
./ngrok http --host-header=rewrite 8080
```

Connected to http://yourdomain.io

Run build with device app

6. Get data from reducer with mapStateToProps:

```js
function mapStateToProps(state) {
  const { eventReducer } = state; // Get object from reducer dispatch to components

  return {
    eventReducer
  };
}
```

7. Optimaze source and Good performance:

- Reducers: Get data and adding bussiness flow.
- Actions: Call Api, setup and dispatch data to reducer.
- Components: Get data from reducer, Show and handle event.
  Ex: redux.zip file.

8. Handle Api Calendar - Handle someMethod():

```js
export default class DemoApp extends React.Component {
  calendarRef = React.createRef();

  render() {
    return <FullCalendar ref={this.calendarRef} plugins={[dayGridPlugin]} />;
  }

  someMethod = () => {
    let calendarApi = this.calendarRef.current.getApi();
    calendarApi.next(); // Some method call API to source
  };
}
```

9. Handle callback data:

```js
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

export default class DemoApp extends React.Component {
  render() {
    return (
      <FullCalendar
        dateClick={this.handleDateClick}
        plugins={[dayGridPlugin, interactionPlugin]}
      />
    );
  }

  handleDateClick = arg => {
    window.alert("Hello, We are Nam Long Software! ");
  };
}
```

10. Documents and Examples:

```js
ReactJS: https://github.com/fullcalendar/fullcalendar-react
Calendar boostrap: https://fullcalendar.io/docs/bootstrap-theme
```

11. Redux - Timeline - Gantt Chart:

```js
using library: react-gantt-timeline
Install: npm install react-gantt-timeline
Support: Touch - drag and drop (mobile web/ tablet)
Responsive: Tablet/mobile web/Desktop devices.
```

Using:

```js
<TimeLine
  data={[...data]} // prop data from reducer (type: Object array)
  links={listLinks} // prop data from reducer (type: Object array)
  onHorizonChange={this.onHorizonChange} // Support Changed list task
  onSelectItem={this._onSelectItem} // Handle event select task/ link
  onUpdateTask={this._onUpdateTask} // Handle event drag, drop, resize task
  onCreateLink={this._onCreateLink} // Handle event create link connect bettween tasks
  mode={timelineMode} // Mode timeline: day, month, week, year
  itemheight={_.get(config.enums, "HEIGHT_TASK_ITEM")} // Edit height task (default 35)
  selectedItem={selectedItem} // prop data get from reducer (type: Object)
  nonEditableName={nonEditableName}
/>
```

Example function handle \_onSelectItem()

```js
class Timeline extends React.Component {
  _onSelectItem = item => {
    const fnDispatch = _.get(this.props, "dispatch");
    if (item && typeof fnDispatch === "function") {
      fnDispatch(selectItem(item));
    }
  };

  render() {
    //Something code...
  }
}

Timeline.propTypes = {
  dispatch: PropTypes.func.isRequired
};
```

Example handle css/style/set mode timeline:

```js
componentDidUpdate() {
  //Something code css/ javascript get height element
}
```

Init data from reducer:

```js
// Create state:
state = {
  data: [],
  links: [],
  selectItem: {}
};
```

Handle event selectItem reducer:

```js
case _.get(config.actionTypes, "SELECT_TIMELINE"): // type action
      const actionPayload = action.payload;
      return {
        data: state.data,
        links: state.links,
        selectItem: _.get(actionPayload, "item") // data selected
      };
break;
```

# CALENDAR DEMO - REACTJS - REDUX
