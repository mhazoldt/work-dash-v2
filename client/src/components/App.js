import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import '../styles/App.css';
import '../styles/bootstrap-utilities.css';
import '../styles/bootstrap-grid.css';

import BaseLayout from './BaseLayout';
import Home from './Home';
import Register from './Register';
import Login from './Login';


class App extends Component {

  render() {
    return (
      <Router>
        <BaseLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

          </Switch>
        </BaseLayout>
      </Router>
    );
  }

}


export default App;
