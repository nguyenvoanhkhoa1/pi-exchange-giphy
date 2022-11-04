import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from "../routes";
import { AppStore } from "../stores";

const browserHistory = createBrowserHistory();

const App = () => {
  return (
    <div>
      <Router history={browserHistory}>
        <AppStore.Provider>
          <Routes />
        </AppStore.Provider>
      </Router>
    </div>
  );
};

export default App;
