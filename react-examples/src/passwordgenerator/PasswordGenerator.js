import React, { useState } from 'react';
import { LOWER_CASE_LETTERS, NUMBERS, SYMBOLS, UPPER_CASE_LETTERS } from './utils/constants';
import Header from './Header';
import usePasswordGenerate from './hooks/use-generate-password';

import './styles.css';
import { getPasswordStrength } from './utils/utils';

const PasswordGenerator = () => {
    const [charLength, setCharLength] = useState(5);
    const [checkboxes, setCheckboxes] = useState([{
        id: 1, label: "Includes Uppercase letters", value: false, charset: UPPER_CASE_LETTERS
    }, {
        id: 2, label: "Includes lowercase letters", value: false, charset: LOWER_CASE_LETTERS
    }, {
        id: 3, label: "Includes numbers", value: false, charset: NUMBERS
    }, {
        id: 4, label: "Includes symbols", value: false, charset: SYMBOLS
    }]);

    const onChangeCharLength = (e) => {
        setCharLength(e.target.value);
    }

    const onSelectCheckbox = (id) => {
        const tempBox = checkboxes;
        tempBox[id].value = !tempBox[id].value;

        setCheckboxes(tempBox);
    }

    const { ok, message, password, generatePassword } = usePasswordGenerate();

    const onClickGenPassword = () => {
        generatePassword(charLength, checkboxes);
    }

    return (
        <div className="container">
            {/* Header */}
            <Header password={password} />
            {/* Char Length */}
            <div className="labels__extreme">
                <span>Character Length:</span>
                <span>{charLength}</span>
            </div>
            {/* Char Length Input */}
            <input className="input__range" type="range" min={0} max={20} value={charLength} onChange={onChangeCharLength}/>
            {/* Checkboxes */}
            <div className="checkboxes">
                {checkboxes.map((cb, idx) => (
                    <span key={cb.id}>
                        <input type="checkbox" value={cb.value} onChange={() => onSelectCheckbox(idx)} /><label>{cb.label}</label>
                    </span>
                ))}
            </div>
            {!ok && <div className="labels__extreme">
                <span>{message}</span>
            </div>}
            {/* Stength Indicator */}
            <div className="labels__extreme">
                <span>Strength:</span>
                <span>{getPasswordStrength(password)}</span>
            </div>
            {/* Generate Password Btn */}
            <button onClick={() => onClickGenPassword()}>Generate Password</button>
        </div>
    );
}

export default PasswordGenerator;
