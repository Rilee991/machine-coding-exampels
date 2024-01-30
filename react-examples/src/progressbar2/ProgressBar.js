import React, { useEffect, useState } from 'react';
import './styles.css';

const ProgressBar = () => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setPercent(prev => Math.min(100, Math.max(prev, prev+10)));
        },400);

        return () => {
            clearInterval(timer);
        }
    });

    return (
        <div className="container">
            <div className="bar">
                <div className="progress" style={{ transform: `translateX(${percent-100}%)`}}></div>
                <div className="text" style={{ color: percent < 50 ? "black" : "green" }}>{percent}%</div>
            </div>
        </div>
    );
}

export default ProgressBar;
