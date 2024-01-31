import { useEffect, useRef, useState } from "react";
import { debounce } from 'lodash';

const useFetchPromise = (query, transformData, dataPromise, debounceWait, autoComplete) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    const fetchData = useRef(debounce(async (query, transformData, signal) => {
        try {
            const resp = await dataPromise(query, signal);
            if(!resp.ok) throw new Error(resp.statusText);

            const data = await resp.json();
            setData(transformData(data));
        } catch (e) {
            console.log(e);
            if(!signal.aborted) setError(e);
        }
    }, debounceWait));

    useEffect(() => {
        if(!query || !autoComplete) {
            setData([]);
            setError("");
            return;
        }

        const controller = new AbortController();

        fetchData.current(query, transformData, controller.signal);

        return () => {
            controller.abort();
        }
    },[query, transformData]);

    return [data, setData, error];
}

export default useFetchPromise;
