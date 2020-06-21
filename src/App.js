import React from 'react';
//import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { EventEmitter } from './EventEmitter';
import Header from './components/Header.js';
import GraphBar from './components/GraphBar.js';
import CalcSalary from './pages/CalcSalary.js';
import { getData } from './functions.js';

import './App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feeds: getData(),
            salary: 0,
            dataGraph: []
        };
    }

    componentDidMount () {
        EventEmitter.subscribe('changeSalary', value => this.setState({
            salary: value
        }));
        EventEmitter.subscribe('changeGaphData',  value => this.setState({
            dataGraph: value
        }));
    }

    render() {
        return (
            <div className="App">
                <Header className="App-header" />
                <CalcSalary salary={this.state.salary} />
                <GraphBar
                    data={this.state.dataGraph}
                    title={this.state.feeds[1].title}
                    color="#70CAD1"
                />
            </div>
        );
    }
}
