import React, { useEffect, useState } from 'react';
import './styles.css';

const TimerApp = () => {
    // const [timeConfig, setTimeConfig] = useState({ time: 0, isRunning: false });
    const [timeConfigs, setTimeConfigs] = useState({ sec: 0, min: 0, hour: 0, isRunning: false });

    useEffect(() => {
        const timer = setInterval(() => {
            // setTimeConfig(prev => prev.isRunning ? (prev.time > 0 ? ({ ...prev, time: prev.time - 1, }): ({ ...prev, isRunning: false })) : prev);
            setTimeConfigs(prev => {
                if(!prev.isRunning) return prev;

                if(prev.sec > 0) return { ...prev, sec: prev.sec - 1 };
                else {
                    if(prev.min > 0) return { ...prev, sec: 59, min: prev.min - 1};
                    else {
                        if(prev.hour > 0) return { ...prev, sec: 59, min: 59, hour: prev.hour - 1 };
                        return { ...prev, isRunning: false };
                    }
                }
            });
        },1000);

        return () => {
            clearInterval(timer);
        }
    });

    const handleSetTime = (e) => {
        // setTimeConfig({ ...timeConfig, time: e.target.value });
        const name = e.target.name, value = e.target.value;
        setTimeConfigs({ ...timeConfigs, [name]: value });
    }

    const onClickStart = () => {
        // setTimeConfig({ ...timeConfig, isRunning: true });
        let { hour = 0, min = 0, sec = 0 } = timeConfigs;

        if(sec >= 60) {
            min += Math.round(sec/60);
            sec = sec%60;
        }

        if(min >= 60) {
            hour += Math.round(min/60);
            min = min%60;
        }
        setTimeConfigs({ ...timeConfigs, hour, min, sec, isRunning: true });
    }

    const onClickPause = () => {
        // setTimeConfig({ ...timeConfig, isRunning: false });
        setTimeConfigs({ ...timeConfigs, isRunning: false });
    }

    const onClickReset = () => {
        // setTimeConfig({ time: 0, isRunning: false });
        setTimeConfigs({ sec: 0, min: 0, hour: 0, isRunning: false });
    }

    return (
        <div className="container">
            <div className="inp-grp">
                <input type="number" disabled={timeConfigs.isRunning} value={timeConfigs.hour} name="hour" onChange={handleSetTime} />hr
                <input type="number" disabled={timeConfigs.isRunning} value={timeConfigs.min} name="min" onChange={handleSetTime} />min
                <input type="number" disabled={timeConfigs.isRunning} value={timeConfigs.sec} name="sec" onChange={handleSetTime} />sec
            </div>
            <div className="btn-grp">
                <button onClick={onClickStart}>Start</button>
                <button onClick={onClickPause}>Pause</button>
                <button onClick={onClickReset}>Reset</button>
            </div>
        </div>
    );
}

export default TimerApp;
