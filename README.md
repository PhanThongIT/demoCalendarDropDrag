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

# CALENDAR DEMO - REACTJS - REDUX
