import React from 'react';
import Chart from 'chart.js';

export default class GraphBar extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

        this.myChart = new Chart(this.canvasRef.current, {
            type: 'horizontalBar',
            data: {
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
            },
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