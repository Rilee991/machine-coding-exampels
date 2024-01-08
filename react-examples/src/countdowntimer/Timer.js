import React, { useEffect, useState } from 'react';

import './Timer.css';

const Timer = () => {
    const [time, setTime] = useState({ hour: 0, min: 0, sec: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if(isRunning) {
                let hVal = time.hour, mVal = time.min, sVal = time.sec;
                if(sVal === 0 && mVal === 0 && hVal === 0) {
                    setIsRunning(false);
                    setDisabled(false);
                } else {
                    sVal--;
                    if(sVal < 0) {
                        if(mVal !== 0 || hVal !== 0) {
                            if(mVal !== 0) {
                                mVal--;
                            } else {
                                mVal = 59;
                                hVal--;
                            }
                            sVal = 59;
                        }
                    }

                    setTime({ hour: hVal, min: mVal, sec: sVal });
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    });

    const onChange = (e) => {
        const name = e.target.name, value = e.target.value;
        setTime({ ...time, [name]: parseInt(value) });
    }
    
    const onStart = (e) => {
        let hVal = time.hour, mVal = time.min, sVal = time.sec;

        if(sVal >= 60) {
            mVal += parseInt(sVal/60);
            sVal = sVal%60;
        }

        if(mVal >= 60) {
            hVal += parseInt(mVal/60);
            mVal = mVal%60;
        }

        setTime({ hour: hVal, min: mVal, sec: sVal });
        setIsRunning(true);
        setDisabled(true);
    }

    const onStop = () => {
        setIsRunning(false);
        setDisabled(false);
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", gap: "10px" }}>
            <input type="number" name="hour" onChange={onChange} disabled={disabled} value={time.hour} style={{ border: "none" }} />hrs
            <input type="number" name="min" onChange={onChange} disabled={disabled} value={time.min} style={{ border: "none" }} />mins
            <input type="number" name="sec" onChange={onChange} disabled={disabled} value={time.sec} style={{ border: "none" }} />secs
            <button onClick={onStart}>{"Start"}</button>
            <button onClick={onStop}>Pause</button>
        </div>
    );
}

export default Timer;
