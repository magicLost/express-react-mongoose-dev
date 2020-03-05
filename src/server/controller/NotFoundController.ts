import express from "express";
import routes from "../../routes/routes";

export const checkRouteForExisting = (request: express.Request, response: express.Response, next: express.NextFunction) => {

  if(!routes.has(request.path)){

    //read file with not found page
    //return not found page
    response.status(404).end(`Страница не найдена... ${request.path}`);
  }else{
    next();
  }

}