import React, { useState, useEffect } from 'react';
import { TimerComp } from './TimerComp';

const TimerPractice2 = () => {
	const [timers, setTimers] = useState([1]);
	const [status, setStatus] = useState("stop");

	const handleAdd = () => {
		setTimers(prev => [...prev, 1]);
	}

	const handleRemove = () => {
		if(timers.length > 1)
			setTimers(prev => prev.slice(0, prev.length-1));
	}

	const handleStartAll = () => {
		setStatus("start");
	}

	const handleStopAll = () => {
		setStatus("stop");
	}

	const handleResetAll = () => {
		setStatus("reset");
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
				{timers.map(() => (
					<TimerComp status={status} />
				))}
			</div>
		</div>
	)
}

export default TimerPractice2;
