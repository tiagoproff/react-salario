import React from 'react';

function CalcSalary() {
    return (
        <div className="row">
            <form className="col s12">
                <div className="input-field col s12">
                    <input id="salariobruto" type="number" min="1" step="10" className="validate" />
                    <label for="salariobruto">Salário Bruto</label>
                </div>
                <div className="row">
                    <div className="input-field col s3">
                        <input placeholder="Base INSS" id="baseinss" type="text" disabled />
                        <label for="baseinss">Base INSS</label>
                    </div>
                    <div className="input-field col s3">
                        <input placeholder="Desconto INSS" id="descontoinss" type="text" disabled />
                        <label for="descontoinss">Desconto INSS</label>
                    </div>
                    <div className="input-field col s3">
                        <input placeholder="Base IRPF" id="baseirpf" type="text" disabled />
                        <label for="baseirpf">Base IRPF</label>
                    </div>
                    <div className="input-field col s3">
                        <input placeholder="Desconto IRPF" id="descontoirpf" type="text" disabled />
                        <label for="descontoirpf">Desconto IRPF</label>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CalcSalary;
