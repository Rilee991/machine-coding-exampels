import { useEffect, useState } from 'react';
import './App.css';
import Stopwatch from './Stopwatch';

function App() {
	const [numOfStopwatches, setNumOfStopwatches] = useState(1);
	const [timers, setTimers] = useState([{ id: 1, isRunning: false, time: 0 }]);

	useEffect(() => {
		console.log("Start Useeffect");
		const interval = setInterval(() => {
			console.log("Inside Interval");
			const timersTemp = timers.map(timer => timer.isRunning ? { ...timer, time: timer.time +1 } : timer);
			setTimers(timersTemp);
		},1000);
		console.log("Outside Interval");
		
		return () => {
			console.log("Inside cleanup");
			clearInterval(interval);
		}
	});

	console.log("Outside useEffect");
	

	const onAdd = () => {
		const id = numOfStopwatches + 1;
		setNumOfStopwatches(id);
		setTimers([...timers, { id: id, isRunning: false, time: 0 }]);
	}

	const onStartAll = () => {
		const tempTimers = timers.map(timer => timer.isRunning ? timer : {...timer, isRunning: true });
		setTimers(tempTimers);
	}

	const onStopAll = () => {
		const tempTimers = timers.map(timer => !timer.isRunning ? timer : {...timer, isRunning: false });
		setTimers(tempTimers);
	}

	const getComponents = () => {
		const stopwatches = [];
		for(let i=1;i<=numOfStopwatches;i++) {
			stopwatches.push(<Stopwatch timer={timers[i-1]} setTimers={setTimers} key={i} />);
		}

		return stopwatches;
	}

	return (
		<div style={{ display: "grid", placeContent: "center", marginTop: "20px"}}>
			Total stopwatches: {numOfStopwatches}
			<button onClick={onAdd}>Add</button>
			<button onClick={onStartAll}>Start All</button>
			<button onClick={onStopAll}>Stop All</button>
			{getComponents()}
		</div>
	);
}

export default App;
