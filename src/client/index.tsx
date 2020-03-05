import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//import { loadableReady } from "@loadable/component";
//import 'promise-polyfill/src/polyfill';
//import "intersection-observer";
//import 'core-js/stable';

//import Test from "./component/Test/Test";


window.addEventListener('load', async () => {
  
 /*  if(window.Promise){
    loadableReady(() => {
      ReactDOM.hydrate(
        <BrowserRouter>
          <App />
        </BrowserRouter> ,
        document.getElementById("root")
      );
    }); */
     //render | hydrate
    ReactDOM.hydrate(
      <BrowserRouter>
        <App />
      </BrowserRouter> ,
      document.getElementById("root")
    ); 
  
}, false);


