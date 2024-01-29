import React from 'react';

const Watch = ({ stopwatch, setStopWatches, len }) => {

    const onClickStart = () => {
        setStopWatches(watches => watches.map(watch => watch.id === stopwatch.id && !watch.isRunning ? { ...watch, isRunning: true } : watch ));
    }

    const onClickPause = () => {
        setStopWatches(watches => watches.map(watch => watch.id === stopwatch.id && watch.isRunning ? { ...watch, isRunning: false } : watch ));
    }

    const onClickReset = () => {
        setStopWatches(watches => watches.map(watch => watch.id === stopwatch.id ? { ...watch, isRunning: false, time: 0 } : watch ));
    }

    const onClickRemove = () => {
        // Method - 1
        // setStopWatches(watches => {
        //     const stopwatches = [];
        //     for(const watch of watches) {
        //         if(watch.id !== stopwatch.id) {
        //             stopwatches.push(watch);
        //         }
        //     }

        //     return stopwatches;
        // });

        // Method - 2
        setStopWatches(watches => watches.reduce((store,curr) => {
            if(curr.id !== stopwatch.id) store.push(curr);
            return store;
        }, []));
    }

    return (
        <div className="watch_container">
            <div>{stopwatch.time}s</div>
            <div className="watch_btns">
                <button onClick={() => onClickStart()}>Start</button>
                <button onClick={() => onClickPause()}>Pause</button>
                <button onClick={() => onClickReset()}>Reset</button>
                {len > 1 ? <button onClick={() => onClickRemove()}>Remove</button> : null}
            </div>
        </div>
    );
}

export default Watch;
