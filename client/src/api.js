const { default: axios } = require("axios");

const API = axios.create({
    baseURL: "/api"
});

const moods = [
    "Happy",
    "Angry",
    "Sad"
];

export { moods };


export default API;