import React, { useState } from 'react';
import useFetchPromise from './useFetchPromise';

const SearchBox = ({ id, name, label, placeholder, autoComplete, styles, debounceWait = 400,
    listBox, noItemMessage, errorMessage, transformData, dataPromise
}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [query, setQuery] = useState("");
    const [data, setData, error] = useFetchPromise(query, transformData, dataPromise, debounceWait, autoComplete);

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const onKeyUp = (e) => {
        console.log(e.keyCode);

        if(e.keyCode === 13) {
            // Enter
            setQuery(data[activeIndex].name);
            setData([]);
            setActiveIndex(null);
        }

        if(e.keyCode === 38) {
            // Up
            if(activeIndex === null || activeIndex === 0) setActiveIndex(data.length-1);
            else setActiveIndex(activeIndex- 1);
        }
        if(e.keyCode === 40) {
            // Down
            if(activeIndex === null || activeIndex === data.length - 1) setActiveIndex(0);
            else setActiveIndex(activeIndex + 1);
        }
    }

    return (
        <React.Fragment>
            <label className={styles.label} htmlFor={name}>
                {label}
            </label>
            <br/>
            <input onKeyUp={onKeyUp} autoComplete="off" placeholder={placeholder} name={name} className={styles.input} id={id} value={query} onChange={handleChange} />
            {listBox(data, activeIndex)}
            {query && data.length === 0 ? noItemMessage() : ""}
            {error ? errorMessage() : ""}
        </React.Fragment>
    );
}

export default SearchBox;
