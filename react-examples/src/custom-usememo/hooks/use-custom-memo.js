import { useEffect, useRef } from "react";

const hasChanged = (prevDeps, currDeps) => {
    if((!prevDeps && currDeps) || (!currDeps && prevDeps))  return true;
    if(!prevDeps && !currDeps)  return false;

    if(prevDeps.length !== currDeps.length) return true;

    for(let i=0;i<prevDeps.length;i++) {
        if(prevDeps[i] !== currDeps[i]) return true;
    }

    return false;
}

const useCustomMemo = (fn, deps) => {
    // Create a persistent variable
    const memoizedResp = useRef(null);

    // Compare prev and curr deps and do calculations accordingly
    if(!memoizedResp.current || hasChanged(memoizedResp.current.deps, deps)) {
        memoizedResp.current = {
            value: fn(),
            deps
        }
    }

    // Cleanup result once component unmounts
    useEffect(() => {
        return () => {
            memoizedResp.current = null;
        }
    },[]);

    // Return result
    return memoizedResp.current.value;
}

export default useCustomMemo;
