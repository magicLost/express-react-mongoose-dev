
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const pathToBuildDir = path.join(__dirname, "server", "src", "test", "build");

module.exports = {

    target: 'node',

    //entry: './server/src/test/test1.js',

    entry: {
        //app: './server/src/test/test1.js',
        vendor: "./src/server/test/test.js"
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js", ".scss", ".css", ".svg", ".png"]
    },

    module: {
        rules: [
            {
                test: /\.js/,
                include: [path.join(__dirname, "src", 'server')],
                loader: "babel-loader"
            }
        ]
    },

    output: {
        //library: "Test",
        libraryTarget: "commonjs",
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'src', 'server', 'test', 'build', 'vendor'),
        //publicPath: "/"
        /* filename: "index.js",
        path: path.resolve(__dirname, "public", "dist"),
        publicPath: publicPath */
    }, 

   /*  output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'server', 'src', 'test', 'build')
    }, */

    plugins: [
        new CleanWebpackPlugin()
    ]
};
