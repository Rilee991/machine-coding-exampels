import React, { useEffect, useRef, useState } from 'react';
import Single from './Single';

const Timer = () => {
    const [timers, setTimers] = useState([{ id: 1, time: 0, isRunning: false }]);

    useEffect(() => {
        let interval = setInterval(() => {
            setTimers((prev) => prev.map(t => ({ ...t, time: t.isRunning ? t.time + 1 : t.time })));
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    })

    const handleAdd = () => {
        setTimers(prev => [...prev, { id: prev[prev.length-1].id+1, time: 0, isRunning: false }]);
    }

    const handleRemove = () => {
        const temp = [...timers];
        if(temp.length > 1) {
            temp.pop();

            setTimers(temp);
        }
    }

    const handleStartAll = () => {
        setTimers(prevTimers => prevTimers.map(timer => ({ ...timer, isRunning: timer.isRunning ? timer.isRunning : !timer.isRunning })));
    }

    const handleStopAll = () => {
        setTimers(prevTimers => prevTimers.map(timer => ({ ...timer, isRunning: timer.isRunning ? !timer.isRunning : timer.isRunning })));
    }

    const handleResetAll = () => {
        setTimers(prevTimers => prevTimers.map(timer => ({ ...timer, isRunning: false, time: 0 })));
    }

    return (
        <div style={{ display: "grid", placeContent: "center", paddingTop: "10px" }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <button onClick={handleAdd}>Add</button>
                <button onClick={handleRemove}>Remove</button>
                <button onClick={handleStartAll}>Start All</button>
                <button onClick={handleStopAll}>Stop All</button>
                <button onClick={handleResetAll}>Reset All</button>
            </div>

            {timers.map((timer, idx) => <Single key={timer.id} timer={timer} setTimers={setTimers} />)}
        </div>
    );
}

export default Timer;
