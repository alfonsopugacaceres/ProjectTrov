import React, { Component } from 'react';
import LandingPage from './components/LandingPage/LadingPage';
import IncidentGridState from './components/IncidentGrid/Context/IncidentGridState';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div>
        <IncidentGridState>
          <LandingPage></LandingPage>
        </IncidentGridState>
      </div>
    );
  }
}
