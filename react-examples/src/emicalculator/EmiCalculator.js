import React, { useState } from 'react';

import './styles.css';

const EmiCalculator = () => {
    const [interestParams, setInterestParams] = useState({ principal: 500000, rate: 10, tenure: 1, processingFee: 1 });
    const [errors, setErrors] = useState({});
    const [downPaymentPerc, setDownPaymentPerc] = useState(10);
    const [loanAmountPerc, setLoanAmountPerc] = useState(90);

    const onChangeHandler = (e) => {
        const name = e.target.name, value = e.target.value;
        setInterestParams({ ...interestParams, [name]: value });

        if((name === "rate" || name === "processingFee") && value > 100) setErrors({ ...errors, [name]: "Not more than 100 should be there" });
        else setErrors({ ...errors, [name]: "" });
    }

    const onClickHandler = (selectedTenure) => {
        setInterestParams({ ...interestParams, tenure: selectedTenure });
    }

    const onChangeRange = (e) => {
        const name = e.target.name, value = e.target.value;
        if(name === "dp") setDownPaymentPerc(value);
        else setLoanAmountPerc(value);
    }

    const downPayment = parseFloat(((interestParams.principal * downPaymentPerc)/100).toFixed(2));
    const loanAmount = interestParams.principal - downPayment;
    const processingCost = parseFloat(((loanAmount * interestParams.processingFee)/100).toFixed(2));
    const loanTop = parseFloat((loanAmount*interestParams.rate*Math.pow(1+interestParams.rate/100,interestParams.tenure)).toFixed(2));
    const loanBottom = parseFloat((Math.pow(1+interestParams.rate/100,interestParams.tenure)-1).toFixed(2));
    const totalLoan = parseFloat((loanTop/loanBottom/100).toFixed(2));

    return (
        <div className="container">
            <div className="container__heading">EMI Calculator</div>
            <div>
                <div>Total Cost of Asset</div>
                <input onChange={onChangeHandler} name="principal" value={interestParams.principal} type="number" minLength={5} />
            </div>
            <div>
                <div>Interest Rate(in %)</div>
                <input onChange={onChangeHandler} name="rate" value={interestParams.rate} type="number" max={100} />
                <div className="error">{errors["rate"]}</div>
            </div>
            <div>
                <div>Processing fee(in %)</div>
                <input onChange={onChangeHandler} name="processingFee" value={interestParams.processingFee} type="number" max={100} />
                <div className="error">{errors["processingFee"]}</div>
            </div>
            <div>
                <br/><br/>
                <div> Down Payment </div>
                <div> Total Down Payment - ₹ {downPayment+processingCost} </div>
                <input name="dp" onChange={onChangeRange} value={downPaymentPerc} style={{ width: "100%" }} type="range" min={0} max={100} />
                <div> Down Payment - ₹ {downPayment}({downPaymentPerc}%) </div>
                <br/><br/>
                <div> Loan per month </div>
                <div> Total Loan Amount - ₹ {totalLoan} </div>
                <input name="la" onChange={onChangeRange} value={loanAmountPerc} style={{ width: "100%" }} type="range" min={0} max={100} />
                <div> Loan Amount - ₹ {(loanAmount/(interestParams.tenure*12)).toFixed(2)}({loanAmountPerc}%) </div>
            </div>
            <div>
                Tenure: 
                <div className="tenureContainer">
                    <button onClick={() => onClickHandler(1)} className={interestParams.tenure === 1 ? "selected" : ""}>12</button>
                    <button onClick={() => onClickHandler(2)} className={interestParams.tenure === 2 ? "selected" : ""}>24</button>
                    <button onClick={() => onClickHandler(3)} className={interestParams.tenure === 3 ? "selected" : ""}>36</button>
                    <button onClick={() => onClickHandler(4)} className={interestParams.tenure === 4 ? "selected" : ""}>48</button>
                    <button onClick={() => onClickHandler(5)} className={interestParams.tenure === 5 ? "selected" : ""}>60</button>
                </div>
            </div>
        </div>
    );
}

export default EmiCalculator;
