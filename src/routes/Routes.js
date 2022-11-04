import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { RouteWithLayout, BrandLoading } from "../components";
import { Main as MainLayout } from "../layouts";
import { routeUrls } from "../configs";
import { HomepageView } from "./views";

const Routes = () => {
  return (
    <Suspense fallback={<BrandLoading />}>
      <Switch>
        {/* <Route
          exact
          component={HomepageView}
          path={`/${routeUrls.homepage.path}`}
        /> */}
        <RouteWithLayout
          component={HomepageView}
          exact
          layout={MainLayout}
          path={`/${routeUrls.homepage.path}`}
        />
        <Redirect from="/*" to={`/${routeUrls.homepage.path}`} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
