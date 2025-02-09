import React, { useEffect, useState } from 'react';

export const TimerComp = ({ status }) => {
    const [time, setTime] = useState(0);
    const [clockIntr, setClockIntr] = useState(0);

    useEffect(() => {
        if(status === "start")
            handleStart();
        else if(status === "stop")
            handleStop();
        else if(status === "reset")
            handleReset();
    }, [status]);

	const handleStart = () => {
        if(!clockIntr) {
            setClockIntr(setInterval(() => {
                setTime(prev => prev+1);
            }, 1000));
        }
	}

	const handleStop = () => {
		if(clockIntr) {
            setClockIntr(clearInterval(clockIntr));
        }
	}

	const handleReset = () => {
		setTime(0);
        handleStop();
	}

    return (
        <div style={{ display: "flex", gap: "12px" }}>
            <div>{time}</div>
            <button onClick={() => handleStart()}>Start</button>
            <button onClick={() => handleStop()}>Stop</button>
            <button onClick={() => handleReset()}>Reset</button>
        </div>
    )
}
