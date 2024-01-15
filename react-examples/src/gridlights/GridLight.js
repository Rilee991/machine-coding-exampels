import React, { useState } from 'react';

import './styles.css';

const Cell = ({ onClick = () => {}, isSelected = false }) => {
    return (
        <div onClick={() => onClick()} className={`cell active ${isSelected ? 'selected' : ''}`}></div>
    );
}

const GridLight = () => {
    const grid = [[1,1,1],[1,0,1],[1,1,1]];
    const [order, setOrder] = useState([]);

    const onClickHandler = (row, col) => {
        const newOrder = [...order];
        const idx = newOrder.findIndex(ob => ob===`${row}_${col}`);

        if(idx === -1)  newOrder.push(`${row}_${col}`);
        else    newOrder.splice(idx, 1);
        setOrder(newOrder);

        if(newOrder.length === grid.flat(1).filter(Boolean).length) deactivate();
    }

    const deactivate = () => {
        const timer = setInterval(() => {
            setOrder(prevOrder => {
                const newOrder = [...prevOrder];
                newOrder.pop();
                setOrder(newOrder);

                if(newOrder.length === 0) clearInterval(timer);

                return newOrder;
            });
        },500);
    }

    console.log(order);

    return (
        <div>
            GridLights
            <div className="container" style={{ gridTemplateColumns: `repeat(${3}, 0fr)`}}>
                {/* {grid.flat(1).map((isActive, idx) => (
                    <Cell key={idx} isActive={isActive} onClick={onClick} />
                ))} */}
                {grid.map((row, idx) => row.map((isActive,jdx) => isActive ? <Cell key={idx+"_"+jdx} isSelected={order.includes(`${idx}_${jdx}`)} onClick={() => onClickHandler(idx,jdx)} /> : <span key={idx+"_"+jdx} />))}
            </div>
        </div>
    );
}

export default GridLight;
