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
