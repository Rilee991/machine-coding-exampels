import { useRef } from "react";

const isSame = (deps, prevDeps) => {
    if(prevDeps && !deps)    return false;
    if(!prevDeps && deps)    return false;
    if(prevDeps.length != deps.length)  return false;

    for(let i=0;i<deps.length;i++) {
        if(deps[i] != prevDeps[i])  return false;
    }

    return true;
}

export const useCustomEffect = (fn, deps) => {
    let isFirstTime = useRef(true);
    let prevDeps = useRef(null);

    if(deps === undefined) {
        fn();
    } else if((prevDeps.current && !deps) || (!prevDeps.current && deps)) {
        fn();
        isFirstTime.current = false;
    } else if(prevDeps.current.length == 0 && deps.length == 0) {
        if(isFirstTime.current) {
            fn();
            isFirstTime.current = false;
        }
    } else {
        if(!isSame(deps, prevDeps.current)) {
            const cleanup = fn();
            if(cleanup) cleanup();
        }
    }

    prevDeps.current = deps;
}
