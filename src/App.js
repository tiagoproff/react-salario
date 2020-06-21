import React from 'react';
//import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import Header from './components/Header.js';
import GraphBar from './components/GraphBar.js';
import CalcSalary from './pages/CalcSalary.js';
import { getData } from './functions.js';

import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feeds: getData()
    };
  }

  render() {
    return (
      <div className="App">
        <Header className="App-header" />
        <CalcSalary />
        <GraphBar
          data={this.state.feeds[1].data}
          title={this.state.feeds[1].title}
          color="#70CAD1"
        />
      </div>
    );
  }
}
