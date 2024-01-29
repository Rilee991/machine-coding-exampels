import React, { useEffect, useState } from 'react';

import './styles.css';
import { DEFAULT_STOPWATCH_CONFIG } from './constants';
import Watch from './Watch';

const StopWatch = () => {
    const [stopWatches, setStopWatches] = useState([{ id: 1, ...DEFAULT_STOPWATCH_CONFIG }]);

    useEffect(() => {
        const timer = setInterval(() => {
            setStopWatches(watches => watches.map(watch => ({ ...watch, time: watch.isRunning ? watch.time+1 : watch.time })));
        },1000);

        return () => {
            clearInterval(timer);
        }
    });

    const onClickAdd = () => {
        const numOfStopwatch = stopWatches.length;

        setStopWatches(prev => ([ ...prev, { id: numOfStopwatch+1, ...DEFAULT_STOPWATCH_CONFIG }]));
    }

    const onClickStartAll = () => {
        setStopWatches(prev => prev.map(sw => sw.isRunning ? sw : { ...sw, isRunning: true }));
    }

    const onClickPauseAll = () => {
        setStopWatches(prev => prev.map(sw => !sw.isRunning ? sw : { ...sw, isRunning: false }));
    }

    const onClickResetAll = () => {
        setStopWatches(prev => prev.map(sw => ({ ...sw, isRunning: false, time: 0 })));
    }

    const onClickDeleteAll = () => {
        setStopWatches([{ id: 1, ...DEFAULT_STOPWATCH_CONFIG }]);
    }

    return (
        <div className="container">
            <button onClick={() => onClickAdd()}>Add</button>
            <button onClick={() => onClickStartAll()}>Start All</button>
            <button onClick={() => onClickPauseAll()}>Pause All</button>
            <button onClick={() => onClickResetAll()}>Reset All</button>
            <button onClick={() => onClickDeleteAll()}>Delete All</button>
            {stopWatches.map(sw => (
                <Watch key={sw.id} stopwatch={sw} len={stopWatches.length} setStopWatches={setStopWatches} />
            ))}
        </div>
    );
}

export default StopWatch;
