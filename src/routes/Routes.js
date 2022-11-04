import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { RouteWithLayout, BrandLoading } from "../components";
import { Main as MainLayout } from "../layouts";
import { routeUrls } from "../configs";
import { HomepageView } from "./views";

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<BrandLoading />}>
        <Switch>
          <>
            <RouteWithLayout
              component={HomepageView}
              exact
              layout={MainLayout}
              path={`/${routeUrls.homepage.path}`}
            />
            <Redirect to={`/${routeUrls.homepage.path}`} />
          </>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
