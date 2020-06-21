import React from 'react';
import { EventEmitter } from '../EventEmitter';

export default class CalcSalary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            descontoinss: 0,
            baseirrf: 0,
            descontoirrf: 0,
            salarioliquido: 0
        };
    }

    formatNumber(value) {
        let formatter = new Intl.NumberFormat([], {
            style: 'currency',
            currency: 'BRL'
        });

        return formatter.format(value);
    }

    calcDiscounts(salary) {
        let taxainss = 0,
            taxairrf = 0,
            descontoinss = 0,
            baseirrf = 0,
            descontoirrf = 0,
            salarioliquido = 0;

        const inssContribuicao = {
            salaryTax: [
                [1045.00, .075],
                [2089.60, .090],
                [3134.40, .120],
                [6101.06, .140],
            ],
            taxMax: 713.10,
        };

        const irrfDesconto = {
            salaryTax: [
                [1903.98, .000, .00],
                [2826.65, .075, 142.80],
                [3751.05, .150, 354.80],
                [4664.68, .225, 636.13],
            ],
            taxMax: [.275, 869.36],
        };

        /*
        taxainss = inssContribuicao.salaryTax.find(taxa => salary <= taxa[0]);
        descontoinss = taxainss ? (salary * taxainss[1]) : inssContribuicao.taxMax;
        */
        let salaryCumulator = 0,
            salaryTemp = 0,
            taxCumulator = 0;

        inssContribuicao.salaryTax.some((taxa, index, array) => {
            const salaryMax = taxa[0],
                  salaryTax = taxa[1];

            salaryTemp = salaryMax - salaryCumulator;

            if (index == array.length) {
                taxCumulator = inssContribuicao.taxMax;
            }
            else if (salary > salaryMax) {
                taxCumulator += salaryTemp * salaryTax;
            }
            else {
                taxCumulator += (salary - salaryCumulator) * salaryTax;
                return true
            }

            salaryCumulator += salaryTemp;
        });

        /*
        taxainss = inssContribuicao.salaryTax.reduce((taxaAnterior, taxa) => salary <= taxa[0]);
        descontoinss = taxainss ? (salary * taxainss[1]) : inssContribuicao.taxMax;
        */

        descontoinss = taxCumulator;

        baseirrf = salary - descontoinss;

        taxairrf = irrfDesconto.salaryTax.find(taxa => baseirrf <= taxa[0]);

        if ( taxairrf )
            descontoirrf = baseirrf * taxairrf[1] - taxairrf[2];
        else
            descontoirrf = baseirrf * irrfDesconto.taxMax[0] - irrfDesconto.taxMax[1];

        salarioliquido = salary - descontoinss - descontoirrf;

        this.setState({
            descontoinss: this.formatNumber(descontoinss),
            baseirrf: this.formatNumber(baseirrf),
            descontoirrf: this.formatNumber(descontoirrf),
            salarioliquido: this.formatNumber(salarioliquido)
        });

        const dataGraph = [{
            data: [descontoinss],
            backgroundColor: '#e67e22'
        },
        {
            data: [descontoirrf],
            backgroundColor: '#c0392b'
        },
        {
            data: [salarioliquido],
            backgroundColor: '#16a085'
        }]

        EventEmitter.dispatch('changeSalary', salary);
        EventEmitter.dispatch('changeGaphData', dataGraph);
        //this.props.onChangeSalary(salary);
        //this.props.calSalary(e.target.value);
    }

    onChangeSalary(e) {
        const salary = e.target.value;
        this.calcDiscounts(salary);
    }

    render() {
        return (
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s9">
                            <input id="salariobruto" type="number" min="1" step="10" className="validate"
                                value={this.props.salary}
                                onChange={this.onChangeSalary.bind(this)}
                            />
                            <label htmlFor="salariobruto">Salário Bruto</label>
                        </div>
                        <div className="input-field col s3">
                            <input placeholder="R$ 0.00" id="salarioliquido" type="text" disabled
                                value={this.state.salarioliquido}
                            />
                            <label htmlFor="salarioliquido">Salário Líquido</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s3">
                            <input placeholder="R$ 0.00" id="baseinss" type="text" disabled
                                value={this.props.salary}
                            />
                            <label htmlFor="baseinss">Base INSS</label>
                        </div>
                        <div className="input-field col s3">
                            <input placeholder="R$ 0.00" id="descontoinss" type="text" disabled
                                value={this.state.descontoinss}
                            />
                            <label htmlFor="descontoinss">Desconto INSS</label>
                        </div>
                        <div className="input-field col s3">
                            <input placeholder="R$ 0.00" id="baseirrf" type="text" disabled
                                value={this.state.baseirrf}
                            />
                            <label htmlFor="baseirrf">Base IRPF</label>
                        </div>
                        <div className="input-field col s3">
                            <input placeholder="R$ 0.00" id="descontoirrf" type="text" disabled
                                value={this.state.descontoirrf}
                            />
                            <label htmlFor="descontoirrf">Desconto IRPF</label>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
