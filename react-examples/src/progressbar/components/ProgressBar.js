import React, { useEffect, useState } from 'react';

const ProgressBar = ({ value = 0, onComplete = () => {} }) => {
    const [percent, setPercent] = useState(0);
    useEffect(() => {
        setPercent(prev => value > 100 ? prev: value);
        if(percent === 100) onComplete();

    },[value]);
    return (
        <div className="progress">
            <span style={{ color: percent < 50 ? "black" : "green" }}>{percent.toFixed()}%</span>
            <div role="progressbar" aria-valuemin={0} aria-valuenow={percent} aria-valuemax={100} style={{ width: `${percent}%` }} />
        </div>
    );
}

export default ProgressBar;
