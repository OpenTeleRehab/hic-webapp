import React from 'react';
import Layout from 'layout/layout';
import 'scss/app.scss';
import { Router } from 'react-router-dom';
import history from 'utils/history';

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Layout />
      </Router>
    </div>
  );
};

export default App;
