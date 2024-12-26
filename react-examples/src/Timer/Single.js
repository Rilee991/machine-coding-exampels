import React, { useState, useRef } from 'react';

const Single = ({ timer, setTimers }) => {
    const handleStart = () => {
        setTimers(prev => prev.map(t => (t.id != timer.id ? {...t} : { ...timer, isRunning: true })));
    }

    const handleStop = () => {
        setTimers(prev => prev.map(t => (t.id != timer.id ? {...t} : { ...timer, isRunning: false })));
    }

    const handleReset = () => {
        setTimers(prev => prev.map(t => (t.id != timer.id ? {...t} : { ...timer, isRunning: false, time: 0 })));
    }

    return (
        <div style={{ display: "flex", gap: "4px" }}>
            <div>{timer.time}</div>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}

export default Single;
