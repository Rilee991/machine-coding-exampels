import React, { useRef, useState } from 'react';

const Stopwatch = ({ timer, setTimers }) => {
    const onStart = () => {
        setTimers(prevTimers =>
            prevTimers.map(pt => pt.id == timer.id && !timer.isRunning ? { ...timer, isRunning: true } : pt)
        );
    }

    const onStop = () => {
        setTimers(prevTimers =>
            prevTimers.map(pt => pt.id == timer.id && timer.isRunning ? { ...timer, isRunning: false } : pt)
        );
    }


    return (
        <div style={{ padding: "20px", border: "1px solid black", marginTop: "10px", display: "flex", gap: "10px"}}>
            <div>{timer.time}s</div>
            <button onClick={onStart}>Start</button>
            <button onClick={onStop}>Stop</button>
        </div>
    );
}

export default Stopwatch;
