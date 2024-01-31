import React from 'react';
import ListBox from './ListBox';
import SearchBox from './SearchBox';
import './styles.css';

const AutoComplete = () => {
    const maxItems = 5;
    const transformData = (data) => data.results.slice(0, maxItems);
    const dataPromise = async (query, signal) => await fetch(`https://swapi.dev/api/people?search=${query}`, { signal });

    return (
        <div className="wrapper">
            <SearchBox
                id="personName"
                name={"personName"}
                label={"Enter person name"}
                placeholder={"Enter character name"}
                autoComplete={true}
                styles={{
                    label: "label",
                    input: "input"
                }}
                debounceWait={400}
                listBox={(items, aI) => <ListBox items={items} activeIndex={aI} />}
                noItemMessage={() => <div>No item found.</div>}
                errorMessage={() => <div>Something went wrong!</div>}
                transformData={transformData}
                dataPromise={dataPromise}
            />
        </div>
    );
}

export default AutoComplete;
