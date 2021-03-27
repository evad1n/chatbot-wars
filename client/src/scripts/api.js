import axios from 'axios';

const API = axios.create({
    baseURL: "/api",
    headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token")
    }
});

//TODO: add interceptor for token


const moods = [
    "Happy",
    "Angry",
    "Sad"
];

export { moods };


export default API;