import React, { useEffect, useState } from 'react';
import ProgressBar from './components/ProgressBar';
import './styles.css';

const ProgressBarApp = () => {
    const [value, setValue] = useState(0);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(prev => prev+1);
        },100);
    
      return () => {
        clearInterval(interval);
      }
    }, []);
    

    return (
        <div className="app">
            <span>Progress Bar</span>
            <ProgressBar value={value} onComplete={() => setIsDone(true)} />
            <div>{isDone ? "Done" : "Loading"}</div>
        </div>
    );
}

export default ProgressBarApp;
