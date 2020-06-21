import React from 'react';
import Chart from 'chart.js';
import { EventEmitter } from '../EventEmitter';

export default class GraphBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataGraph: []
        };

        this.canvasRef = React.createRef();
    }

    changeData(data) {
        this.myChart.data.datasets = data;
        this.myChart.update();
    }

    componentDidMount() {
        Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

        EventEmitter.subscribe('changeGaphData',  value => this.changeData(value));

        this.myChart = new Chart(this.canvasRef.current, {
            type: 'horizontalBar',
            /*data: {
                //labels: this.props.data.map(d => d.label),
                labels: ['salario'],
                datasets: [{
                    //label: this.props.title,
                    //data: this.props.data.map(d => d.value),
                    data: [8],
                    backgroundColor: '#e67e22'
                },
                {
                    //label: this.props.title,
                    //data: this.props.data.map(d => d.value),
                    data: [15],
                    backgroundColor: '#c0392b'
                },
                {
                    //label: this.props.title,
                    //data: this.props.data.map(d => d.value),
                    data: [77],
                    backgroundColor: '#16a085'
                }]
            },*/
            options: {
                responsive: true,
                tooltips: {
                    enabled: false
                },
                legend: {
                    display: false
                },
                showLines: false,
                scales: {
                    xAxes: [{
                        stacked: true,
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            display: false,
                        },
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            drawBorder: false,
                        }
                    }]
                }
            }
        });
    }

    render() {
        return (
            <canvas ref={this.canvasRef} className="chartBar" />
        );
    }
}