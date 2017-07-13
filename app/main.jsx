'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import store from './store';
import LandingPage from './components/LandingPage';
import Main from './components/Main'
import Navbar from './components/Navbar';
import AllStudents from './components/AllStudents';
import AllCampuses from './components/AllCampuses';

render (
  <ReactCSSTransitionGroup
      transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={5000}
      transitionEnter={false}
      transitionLeave={false}>
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route path="/main" component={Main}/>
            <Route component={LandingPage}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  </ReactCSSTransitionGroup>,
  document.getElementById('main')
)