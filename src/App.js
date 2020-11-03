import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import Layout from 'layout/layout';
import history from 'utils/history';
import store from 'store';

import 'scss/app.scss';

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout />
      </Router>
    </Provider>
  );
};

export default App;
