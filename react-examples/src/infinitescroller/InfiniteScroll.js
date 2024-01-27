import React, { useEffect, useRef, useState } from 'react';

const InfiniteScroll = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [suggestions, setSuggestions] = useState([]);
    const [loadText, setLoadText] = useState("");
    const onClickSearch = useRef(() => {});
    const abortControllerRef = useRef(null);

    useEffect(() => {
        if(query) debouncedSearch(onClickSearch.current, 1000)(page); //onClickSearch.current(page);
    },[query, page]);

    const handleOnChange = (e) => {
        setQuery(e.target.value);
    }

    const debouncedSearch = (fn, delay) => {
        let timer = null;
        return function (page) {
            if(timer) clearTimeout(timer);
            timer = setTimeout(() => {
                fn(page);
            }, delay);
        }
    }

    onClickSearch.current = async (page) => {
        try {
            console.log(abortControllerRef.current ? "exits": "not exists");
            if(abortControllerRef.current) abortControllerRef.current.abort();
            abortControllerRef.current = new AbortController();
            setLoadText("Querying...");
            const resp = await fetch(`https://openlibrary.org/search.json?q=${query}&page=${page}`, { signal: abortControllerRef.current.signal });
            setLoadText("Parsing...");
            const { docs } = await resp.json();
            setLoadText("Formatting...");
            const suggestions = docs.map(doc => ({ title: doc.title, id: doc.id_amazon?.[0] }))
            setSuggestions(prev => ([...prev, ...suggestions]));
            setPage(page);
            setLoadText("");
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <input type="text" onChange={(e) => handleOnChange(e)} value={query} />
            {/* <button onClick={() => onClickSearch(page+1)}>Search</button> */}
            <div>{loadText}</div>
            {suggestions.map((suggest, idx) => (
                <div key={idx}>{suggest.title}</div>
            ))}
            {suggestions.length ? <div onClick={() => onClickSearch(page+1)} style={{ cursor: "pointer" }}>Load More</div>: null}
        </div>
    );
}

export default InfiniteScroll;
