import axios from 'axios';

const API = axios.create({
    baseURL: "/api",
    // headers: {
    //     Authorization: "Bearer " + localStorage.getItem("jwt_token")
    // }
});

// Add stored token to header for each request
API.interceptors.request.use(config => {
    const token = localStorage.getItem("jwt_token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
},
    error => Promise.reject(error)
);


const moods = [
    "Happy",
    "Angry",
    "Sad"
];

export { moods };


export default API;