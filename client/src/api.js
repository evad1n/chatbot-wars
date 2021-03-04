const { default: axios } = require("axios");

const API = axios.create({
    baseURL: "/api"
});

export default API;