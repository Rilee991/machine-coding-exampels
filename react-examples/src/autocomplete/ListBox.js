import React from 'react';

const ListBox = ({ items, activeIndex }) => {
    return (
        <div className="list_container">
            <ul>
                {items.map((item,i) => (
                    <li className={`item ${activeIndex === i ? "active" : ""}` }key={i}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListBox;
