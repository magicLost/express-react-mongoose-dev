//require("dotenv").config({ path: "./config.env" });
import app from "./app";

//const app = require("./app");

//console.log("NODE ENV", process.env.NODE_ENV);
//console.log("NODE PASS", process.env.PASS);


const port: number = 3000;

const server = app.listen(port, () =>
  console.log(`App running on port ${port}`)
);
