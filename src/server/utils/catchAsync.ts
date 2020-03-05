import * as express from "express";

export default (requestHandler: express.RequestHandler): express.RequestHandler => {
  
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  
    //requestHandler(req, res, next).catch((error: Error) => { console.log("CATCH ASYNC ERROR", error); next(error)});

    try{

      await requestHandler(req, res, next);

    }catch(error){

      console.log("CATCH ASYNC ERROR", error.message); 
      next(error);

    }

  };
};
