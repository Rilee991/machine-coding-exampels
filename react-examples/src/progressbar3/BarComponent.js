import React from 'react';

const BarComponent = ({ progress = 0 }) => {
    return (
        <div className="container">
            <div className="bar">
                <div className="progress" style={{ transform: `translateX(${progress-100}%)` }}></div>
                <div className="text">{progress}%</div>
            </div>
        </div>
    );
}

export default BarComponent;
