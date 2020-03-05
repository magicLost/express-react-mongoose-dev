const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const clientProdConfig = require('./webpack.prod.client');
const webpackNodeExternals = require('webpack-node-externals');

const config = {

    target: 'node',

    mode: "development",

    entry: './src/server/server.ts',

    output: {
        filename: "server.build.js",
        path: path.resolve(__dirname, "dist-server")
    },

    externals: [webpackNodeExternals()],

    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
        process: false
    }/* ,

    plugins: [
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify("development"),
          "process.env.PASS": JSON.stringify("paasss1234")
        })
    ] */
};

const cfg = merge(clientProdConfig, config);

cfg.plugins[1] = new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("development"),
    "process.env.PASS": JSON.stringify("paasss1234")
  });

//console.log("CONFIG", cfg);

module.exports = cfg;