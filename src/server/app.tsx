import React from 'react';
//import { renderToString } from 'react-dom/server';
//import routes from "../client/routes";
//import {renderRoutes} from 'react-router-config';
//import {StaticRouter } from 'react-router-dom';
//import {Provider} from 'react-redux';
//import serialize from 'serialize-javascript';
import path from 'path';
import express, {static as staticMiddleware} from "express";
import App from '../client/App';
//import fs from "fs";
//import HomeController from "./scr/controller/HomeController";
//import catchAsync from "./utils/catchAsync";
import routes, {IRoute} from "../routes/routes";
import DynamicImportSsr from './service/DynamicImportSsr/DynamicImportSsr';
import FileSystemHelper from './utils/FileSystem/FileSystemHelper';

//import AppError from "./utils/AppError";
import globalErrorHandler from "./service/ErrorHandler/errorHandler";
import { checkRouteForExisting } from './controller/NotFoundController';
import { renderSsrDiPage } from './controller/BaseController';

const app = express();

///console.log("APP NODE ENV", process.env.NODE_ENV);
//console.log("APP NODE PASS", process.env.PASS);

const fs = new FileSystemHelper();

const dynamicImportSsr = new DynamicImportSsr(
  <App />,
  routes,
  fs,
  path.join(__dirname, "..", "public", "loadable-stats.json"),
  path.join(__dirname, "..", "config", "htmlTemplates", "base.di.template.html"),
  ""
);

// Serving static file
/* const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['js', 'html', "css"],
  fallthrough: true, //show or not error - true - not show
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res: express.Response, path: string, stat: any) {
    console.log("What response ", path);

    res.set('x-timestamp', Date.now().toString());
  } 
}
 */
app.use(staticMiddleware(path.join(__dirname, "..", "public")));

app.use(checkRouteForExisting);

app.all("*", renderSsrDiPage(dynamicImportSsr, routes)); 

app.use(globalErrorHandler);

export default app; 