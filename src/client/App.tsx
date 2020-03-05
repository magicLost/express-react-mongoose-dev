import React from "react";
import { Switch, Route } from "react-router-dom";

//import classes from "./App.module.scss";
import loadable from "@loadable/component";

import NotFoundPage from "./container/pages/NotFoundPage/NotFoundPage";
//import Homepage from "./container/pages/Homepage/Homepage";
//import PhotoSliderPage from "./container/pages/PhotoSliderPage/PhotoSliderPage";
import Spinner from "./component/UI/Spinner/Spinner";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary";


const App: React.FunctionComponent = () => {

  console.log("render App");

  const spinner = <Spinner />;

  const HomepageLoadable = loadable(
    () => import("./container/pages/Homepage/Homepage"), 
    { fallback: spinner }
  );

  const PhotoSliderPageLoadable = loadable(
    () => import("./container/pages/PhotoSliderPage/PhotoSliderPage"), 
    { fallback: spinner }
  );

  return (
    <div>

      <main>
        <ErrorBoundary>
          
          <Switch>
            
            <Route path="/photos">
                <PhotoSliderPageLoadable />
            </Route>
        
            <Route path="/" exact >
                <HomepageLoadable />
            </Route>

            <Route path="*">
                <NotFoundPage />
            </Route>

          </Switch>

        </ErrorBoundary>
      </main>

    </div>
  );
}

export default App;