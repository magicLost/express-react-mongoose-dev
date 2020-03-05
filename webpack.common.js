const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "client", "index.tsx"),

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss", ".css", ".svg", ".png"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.join(__dirname, "src")],
        loader: "babel-loader"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader?name=static/font/[name]-[hash:7].[ext]"
      }
    ]
  },

  plugins: [
    new webpack.WatchIgnorePlugin([
      "global.d.ts",
      "scss/.d.ts$/",
      "css/.d.ts$/",
      "svg/.d.ts$/"
    ]),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Super puper",
      template: path.join(__dirname, "config", "htmlTemplates", "index.html")
    }) 
  ]
};