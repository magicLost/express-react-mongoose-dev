
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const pathToBuildDir = path.join(__dirname, "server", "src", "test", "build");

module.exports = {

    target: 'node',

    //entry: './server/src/test/test1.js',

    entry: {
        app: './src/server/test/test1.js',
        //vendor: "./server/src/test/test.js"
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
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'server', 'src', 'test', 'build'),
        //publicPath: "/"
        /* filename: "index.js",
        path: path.resolve(__dirname, "public", "dist"),
        publicPath: publicPath */
    }, 

   /*  output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'server', 'src', 'test', 'build')
    }, */

    externals: [
        webpackNodeExternals(),
        function(context, request, callback) {
            console.log("CONTEXT", context);
            console.log("REQUEST", request);

            if (request === "./test"){
              return callback(null, 'commonjs ' + `./vendor/vendor.bundle.js`);
            }
            callback();
        }, 
    ],

    plugins: [
        new CleanWebpackPlugin()
      ]
};
