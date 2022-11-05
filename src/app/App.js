import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from "../routes";
import { AppStore, SearchStore, TrendingStore } from "../stores";

const browserHistory = createBrowserHistory();

const App = () => {
  return (
    <div>
      <Router history={browserHistory}>
        <AppStore.Provider>
          <TrendingStore.Provider>
            <SearchStore.Provider>
              <Routes />
            </SearchStore.Provider>
          </TrendingStore.Provider>
        </AppStore.Provider>
      </Router>
    </div>
  );
};

export default App;
