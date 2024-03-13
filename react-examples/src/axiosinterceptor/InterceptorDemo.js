import React from 'react';
// import axios from 'axios';
import { axiosGet } from '../interceptor';

const InterceptorDemo = () => {
    const makeCall = async () => {
        try {
            const data = await axiosGet("/posts");
            console.log(data);
            // axios.get("https://jsonplaceholder.typicode.com/posts")
        } catch (e) {
            console.log("Error:", e);
        }
    }

    return (
        <div>
            <button onClick={makeCall}>Call Api</button>
        </div>
    );
}

export default InterceptorDemo;
