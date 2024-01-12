import React, { useEffect, useState } from 'react';
import useLruCache from './hooks/use-lru-cache/useLruCache';

import './styles.css';

const LRUCache = () => {
    const tabs = [{ id: 1, data: "Tab data 1"}, { id: 2, data: "Tab data 2"}, { id: 3, data: "Tab data 3"},
        { id: 4, data: "Tab data 4"}, { id: 5, data: "Tab data 5"}
    ];
    const [activeTab, setActiveTab] = useState(0);
    const [data, setData] = useState(tabs[activeTab].data);
    const [loading, setLoading] = useState(false);

    const cache = useLruCache(3);

    useEffect(() => {
        getData();
    }, [activeTab]);

    async function getData() {
        setLoading(true);
        const data = cache.get(activeTab);
        if(data) {
            console.log("Fetched from cache");
            setData(data);
            return;
        }
        await new Promise((res, rej) => {
            setTimeout(() => {
                console.log("Fetched from api");
                setData(tabs[activeTab].data);
                console.log("Trying to put:", tabs[activeTab].data);
                cache.put(activeTab, tabs[activeTab].data);
                setLoading(false);
                res();
            },400);
        });
    }

    return (
        <div className="container">
            <h1>Dynamic Content Loader with LRU Cache</h1>

            <div className="tabs">
                {tabs.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id-1)}>{"Tab "+(tab.id)}</button>
                ))}
            </div>
            <br/>
            <div className="tabdata">
                {loading ? "Loading..." : data}
            </div>
        </div>
    );
}

export default LRUCache;
