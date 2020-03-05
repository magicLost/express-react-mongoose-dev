import request from "supertest";
import express, {static as staticMiddleware} from "express";
import app from "./app.tsx";
import routes from "../routes/routes";
import path from 'path';
//import globalErrorHandler from "./service/ErrorHandler/errorHandler";



routes.set("/exception", {
  path: "/exception",
  title: "Hey, look for our photos.",
  metaDescriptionContent: "photos, super, interesting",
  metaKeywords: "keywords"
});

/* 
jest.mock("./service/ErrorHandler/errorHandler", () => {
  return {
    __esModule: true,
    default: jest.fn((err, req, res, next) => { 
      console.log("ERRRRRRROOOOOOORRRRRR", err.message);
      res.status(500).send("Error");
    })
  };
}); */

jest.mock("express", () => {

  const originalExpressModule = jest.requireActual("express");

  //https://jestjs.io/docs/en/jest-object 
  //console.log(`ORIGINAL EXPRESS MODULE ${originalExpressModule}`);

  return {
    __esModule: true,
    default: originalExpressModule, 
    static: jest.fn((route, options) => {
      return (req, res, next) => {
        next();
      }
    }),
  }

});  

jest.mock("./utils/FileSystem/FileSystemHelper", () => ({
  __esModule: true,
  default: jest
            .fn()
            .mockImplementation(() => {
              return { 
                readFile: jest.fn(() => {
                    return new Promise((resolve, reject) => {
                        resolve("!!!meta-description-content!!! !!!title!!! !!!css!!! !!!js!!! !!!content!!!");
                    })
                })
              } 
            })
}));

/* FileSystemHelper.mockImplementation(
  () => { 
      return { 
          readFile: jest.fn(() => {
              return new Promise((resolve, reject) => {
                  resolve("!!!meta-description-content!!! !!!title!!! !!!css!!! !!!js!!! !!!content!!!");
              })
          })
  } 
}); */


jest.mock("./service/DynamicImportSsr/DynamicImportSsr", () => ({
  __esModule: true,
  default: jest
            .fn()
            .mockImplementation(() => {
              return {
                renderHtmlPage: jest.fn((route) => {
                  return new Promise((resolve, reject) => {
                      switch(route.path){
                        case "/": resolve("This is Homepage.");break;
                        case "/photos": resolve("This is Photos page.");break;
                        case "/exception": reject(new Error("REJECT - This error only for test."));break;
                        default: reject(`Bad path ${route.path}`);
                      }
                      
                  })
              })
              }
            })
}));

describe("Test the root path", () => {

/*   test("It should response the GET method on homepage", async () => {

    //app.use = jest.fn();
    //jest.spyOn(express, "static");
    //const useSpy = jest.spyOn(app, "use");
    //expect(useSpy).toHaveBeenCalledTimes(1);

    //express.static = jest.fn();

    const response = await request(app).get("/static/css/main.13768b.css");

    //expect(app.all).toHaveBeenCalledTimes(1);

    //expect(express.static).toHaveBeenNthCalledWith(1, path.join(__dirname, "..", "public"));

    //expect(express.static).toHaveBeenCalledTimes(2);

    expect(staticMiddleware).toHaveBeenNthCalledWith(1, path.join(__dirname, "..", "public") );

    expect(response.statusCode).toEqual(404);

    //expect(response.text).toEqual("This is Homepage.");
    //expect(response.text.includes("This is Homepage.")).toEqual(true);

  });

  test("It should response the GET method on homepage", async () => {
    const response = await request(app).get("/");


    expect(staticMiddleware).toHaveBeenNthCalledWith(1, path.join(__dirname, "..", "public") );

    expect(response.statusCode).toEqual(200);

    expect(response.text).toEqual("This is Homepage.");
    //expect(response.text.includes("This is Homepage.")).toEqual(true);

  });

  test("It should response the GET method on /photos", async () => {
    const response = await request(app).get("/photos");

    expect(response.statusCode).toEqual(200);

    expect(response.text.includes("This is Photos page.")).toEqual(true);

  });

  test("It should show not found page on bad path /no", async () => {
    const response = await request(app).get("/no");

    expect(response.statusCode).toEqual(404);

    expect(response.text.includes("Страница не найдена...")).toEqual(true);

  }); 

  test("It should show not found page on bad file request /main.13768b.css", async () => {
    const response = await request(app).get("/main.13768b.css");

    expect(response.statusCode).toEqual(404);

    expect(response.text.includes("Страница не найдена...")).toEqual(true);

  });  */

  test("It should show error page if on server Error occure", async () => {

    const response = await request(app).get("/exception");

    //expect(globalErrorHandler).toHaveBeenCalledTimes(1);

    expect(response.statusCode).toEqual(500);

    //expect(response.text).toEqual("Страница не найдена...");

    expect(response.text.includes("Error")).toEqual(true);

  });   

});  