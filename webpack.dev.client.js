const path = require("path");
//const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//let useDevServer = true;
//let publicPath = useDevServer ? "http://localhost:8080/dist/" : "/dist/";

module.exports = merge(common, {
  mode: "development",

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist", "client"),
    publicPath: "/"
    /* filename: "index.js",
    path: path.resolve(__dirname, "public", "dist"),
    publicPath: publicPath */
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/i,
        loaders: ["file-loader"]
      },
      {
        test: /\.svg$/,
        loaders: [{ loader: "file-loader" }]
      },
      {
        test: /\.css$/i,
        loaders: [
          //`${MiniCssExtractPlugin.loader}?hmr&reloadAll`,
          "style-loader",
          "css-loader"
          //"style-loader!css-loader"
        ]
      },
      {
        test: /\.module.scss$/,
        loaders: [
          //MiniCssExtractPlugin.loader,
          "style-loader?sourceMap",
          "css-loader?modules&sourceMap&localIdentName='[name]__[local]--[hash:base64:9]'",
          "sass-loader?sourceMap"
        ]
      }
    ]
  },

  devtool: "inline-source-map",

  devServer: {
    contentBase: path.join(__dirname, "client", "dist"),
    hot: true,
    //compress: true,
    //port: 80
    //headers: { "Access-Control-Allow-Origin": "*" },
    
  },

  plugins: [
    new MiniCssExtractPlugin({
      //filename:  useVersioning ? '[name].[contenthash:6].css' : "[name].css"
      filename: "static/css/[name].css"
    })
  ],
});