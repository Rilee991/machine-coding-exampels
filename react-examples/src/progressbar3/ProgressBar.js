import React, { useEffect, useState } from 'react';
import BarComponent from './BarComponent';

import './styles.css';

const ProgressBar = () => {
    const [completion, setCompletion] = useState(0);

    useEffect(() => {
        if(completion < 100) {
            const timer = setInterval(() => {
                setCompletion(prev => Math.min(100, prev + 20));
            }, 500);
            
            return () => {
                clearInterval(timer);
            }
        }
    });
    

    return (
        <div>
            <BarComponent progress={completion} />
        </div>
    );
}

export default ProgressBar;
