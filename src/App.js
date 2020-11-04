import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { LocalizeProvider } from 'react-localize-redux';

import RouteSwitch from 'routes';
import store from 'store';

import 'scss/app.scss';

const App = () => {
  return (
    <Provider store={store}>
      <LocalizeProvider store={store}>
        <Router history={createBrowserHistory()}>
          <RouteSwitch />
        </Router>
      </LocalizeProvider>
    </Provider>
  );
};

export default App;
