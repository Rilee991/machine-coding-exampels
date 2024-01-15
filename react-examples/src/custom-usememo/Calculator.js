import React, { useState } from 'react';
import useCustomMemo from './hooks/use-custom-memo';

import './styles.css';

const Calculator = () => {
    const [counter, setCounter] = useState(0);
    const [counter2, setCounter2] = useState(0);

    const expensive = () => {
        console.log("Expensive " + counter);
        return counter * counter * counter;
    }

    // const memoizedRes = React.useMemo(expensive, [counter]);
    const customMemoizedRes = useCustomMemo(expensive, [counter]);

    return (
        <div className="container">
            <div>{counter}</div>
            {/* <div>{expensive()}</div> */}
            {/* <div>{memoizedRes}</div> */}
            <div>{customMemoizedRes}</div>
            <button onClick={() => setCounter(prev => prev+1)}>Increment Counter</button>
            <div>{counter2}</div>
            <button onClick={() => setCounter2(prev => prev+1)}>Increment Counter 2</button>
        </div>
    );
}

export default Calculator;
