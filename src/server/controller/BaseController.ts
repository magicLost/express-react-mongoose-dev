import express from "express";
import catchAsync from "../utils/catchAsync";
import DynamicImportSsr from "../service/DynamicImportSsr/DynamicImportSsr";
import {IRoute} from "../../routes/routes";

export const renderSsrDiPage = (dynamicImportSsr: DynamicImportSsr, routes: Map<string, IRoute>) => {

    return catchAsync(async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        //console.log("renderSsrDiPage path", request.path);

        const page = await dynamicImportSsr.renderHtmlPage(routes.get(request.path) as IRoute);
  
        response.status(200).send(page);

    });
};