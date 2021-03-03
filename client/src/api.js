const { default: axios } = require("axios");

const API = axios.create({
    baseURL: "https://chatbot-wars.herokuapp.com"
});

export default API;