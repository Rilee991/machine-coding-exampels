import React, { useState, useEffect } from 'react';

const TimerPractice1 = () => {
	const [timers, setTimers] = useState([{ time: 0, isRunning: false, interval: 0 }]);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimers(prev => prev.map(timer => timer.isRunning === true ? { ...timer, time: timer.time + 1 } : timer));
		}, 1000);

		return () => {
			if(interval)
				clearInterval(interval);
		}
	}, []);

	const handleAdd = () => {
		setTimers(prev => [...prev, { time: 0, isRunning: false, interval: 0 }]);
	}

	const handleRemove = () => {
		if(timers.length > 1)
			setTimers(prev => prev.slice(0, prev.length-1));
	}

	const handleStartAll = () => {
		setTimers(prev => prev.map(timer => ({ ...timer, isRunning: true })));
	}

	const handleStopAll = () => {
		setTimers(prev => prev.map(timer => ({ ...timer, isRunning: false })));
	}

	const handleResetAll = () => {
		setTimers(prev => prev.map(timer => ({ ...timer, time: 0, isRunning: false })));
	}

	const handleStart = (idx) => {
		setTimers(prev => prev.map((timer, tidx) => idx !== tidx ? timer : { ...timer, isRunning: true }));
	}

	const handleStop = (idx) => {
		setTimers(prev => prev.map((timer, tidx) => idx !== tidx ? timer : { ...timer, isRunning: false }));
	}

	const handleReset = (idx) => {
		setTimers(prev => prev.map((timer, tidx) => idx !== tidx ? timer : { ...timer, time: 0, isRunning: false }));
	}

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
			<div style={{ display: "flex", gap: "8px" }}>
				<button onClick={handleAdd}>Add</button>
				<button onClick={handleRemove}>Remove</button>
				<button onClick={handleStartAll}>Start All</button>
				<button onClick={handleStopAll}>Stop All</button>
				<button onClick={handleResetAll}>Reset All</button>
			</div>
			<br/>
			<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
				{timers.map((timer, idx) => (
					<div style={{ display: "flex", gap: "12px" }}>
						<div>{timer.time}</div>
						<button onClick={() => handleStart(idx)}>Start</button>
						<button onClick={() => handleStop(idx)}>Stop</button>
						<button onClick={() => handleReset(idx)}>Reset</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default TimerPractice1;
