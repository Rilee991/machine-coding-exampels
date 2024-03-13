import to from "await-to-js";
import axios from "axios";

const clinicusUrlMap = {
    "localhost:3000": "https://jsonplaceholder.typicode.com",
    "dev-clinicus.sciometrix.ai": "https://dev-clinicus.sciometrix.ai/api",
    "clinicus.sciometrix.ai": "https://clinicus.sciometrix.ai/api"
};

let instance; // Declare instance variable outside the function to ensure single instance

const getAxiosInstance = () => {
    if (!instance) {
        const hostName = window.location.host;
        const baseURL = clinicusUrlMap[hostName];
        
        instance = axios.create({ baseURL });

        // Add interceptor to handle requests
        instance.interceptors.request.use(
            async (config) => {
                // Add access token to request headers
                const accessToken = await fetchAccessToken(); // Assuming you have a function to fetch access token asynchronously
                config.headers.Authorization = `Bearer ${accessToken}`;

                // Modify other request config here if needed
                config.headers["Content-Type"] = "application/json";
                config.headers["x-api-origin"] = "clinicus";
                
                return config;
            },
            (error) => {
                // Handle request error
                return Promise.reject(error);
            }
        );
    }

    return instance;
};

export const axiosGet = async (url, data = {}) => {
    const instance = getAxiosInstance();

    const [err, res] = await to(
        instance.get(url, data)
    );

    return [err, res];
};

// Async function to fetch access token
const fetchAccessToken = async () => {
    return new Promise((res,rej) => {
        setTimeout(() => {
            res("ddfsdfds");
        }, 1000);
    })
    // Your code to fetch access token goes here
    // For example:
    // const response = await fetch('url_to_fetch_token');
    // const data = await response.json();
    // return data.access_token;
};
