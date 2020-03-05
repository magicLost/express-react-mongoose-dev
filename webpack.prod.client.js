const webpack = require("webpack");
const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//const ManifestPlugin = require("webpack-manifest-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const LoadablePlugin = require('@loadable/webpack-plugin')
//const autoprefixer = require('autoprefixer');
//const CopyPlugin = require("copy-webpack-plugin");

const merge = require("webpack-merge");
const common = require("./webpack.common.js");

//const useVersioning = true;

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
      plugins: [
        require('autoprefixer')
      ]
      //sourceMap: true
  }
};

module.exports = merge(common, {
  mode: "production",

  output: {
    filename: "static/js/[name].[chunkhash:6].js",
    path: path.resolve(__dirname, "public"),
    //publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          MiniCssExtractPlugin.loader, 
          "css-loader",
          postCssLoader
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          "css-loader?modules", //&localIdentName=[name]__[local]--[hash:base64:9]
          postCssLoader,
          "sass-loader" //if we use resolve-url-loader we must sourceMap=true
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        loaders: [
          "file-loader?name=static/media/[name]-[hash:7].[ext]",
          "image-webpack-loader" //?webp=75
        ]
      },
      {
        test: /\.svg$/,
        loaders: [
          { loader: "file-loader?name=static/media/[name]-[hash:7].[ext]" },
          {
            loader: "svgo-loader",
            options: {
              plugins: [
                { removeTitle: true },
                //{convertColors: {shorthex: false}},
                //{convertPathData: false}
                { removeViewBox: false },
                { cleanupIDs: false }
              ]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    /* new CopyPlugin([
      //{ from: 'other', to: 'public' },
    ]), */
    new MiniCssExtractPlugin({
      //filename:  useVersioning ? '[name].[contenthash:6].css' : "[name].css"
      filename: "static/css/[name].[contenthash:6].css"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    /* new ManifestPlugin({
      filename: "assetsmanifest.json"
      //writeToFileEmit: true, //needs if we in dev mode with devServer
      //basePath: "/",
      //publicPath: "/"
    }), */
    new WebpackChunkHash(),
    new webpack.HashedModuleIdsPlugin(),
    new LoadablePlugin()
  ],

  optimization: {
    minimize: true,

    /* splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }, */

    splitChunks: {
      chunks: "all",
      name(module, chunks, cacheGroupKey) {
        const moduleFileName = module
          .identifier()
          .split("/")
          .reduceRight(item => item);
        const allChunksNames = chunks.map(item => item.name).join("~");
        return `${cacheGroupKey}-${allChunksNames}`;
      }
    },

    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          //remove comments
          output: {
            comments: false,
          }
        },
        extractComments: false
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  }
});