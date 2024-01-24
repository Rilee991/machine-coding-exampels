import React, { useEffect, useState } from 'react';
import { useCustomEffect } from './hooks/useEffectHook';

import './styles.css';

const CustomUseEffect = () => {
    const [counter, setCounter] = useState(0);
    const [counter2, setCounter2] = useState(0);

    // useEffect(() => {
    //     console.log("Use Effect with no dependency array");
    // });


    // useEffect(() => {
    //     console.log("Use Effect with empty dependency array");
    // },[]);


    // useEffect(() => {
    //     console.log("Use Effect with counter dependency array");
    // },[counter]);

    // useEffect(() => {
    //     console.log("Use Effect with counter 2 dependency array");
    // },[counter2]);

    useCustomEffect(() => {
        console.log("Use Effect with no dependency array");
    });


    useCustomEffect(() => {
        console.log("Use Effect with empty dependency array");
    },[]);


    useCustomEffect(() => {
        console.log("Use Effect with counter dependency array");
    },[counter]);

    useCustomEffect(() => {
        console.log("Use Effect with counter 2 dependency array");
    },[counter2]);

    const handleClick = (type) => {
        if(type === 1) setCounter(counter+1);
        else setCounter(counter-1);
    }

    const handleClick2 = (type) => {
        if(type === 1) setCounter2(counter2+1);
        else setCounter2(counter2-1);
    }

    return (
        <div className="container">
            <h1>Counter: {counter}</h1>
            <button onClick={() => handleClick(1)}>Increase</button>
            <button onClick={() => handleClick(2)}>Decrease</button>

            <h1>Counter 2: {counter2}</h1>
            <button onClick={() => handleClick2(1)}>Increase</button>
            <button onClick={() => handleClick2(2)}>Decrease</button>
        </div>
    );
}

export default CustomUseEffect;
