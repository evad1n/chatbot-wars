import axios from 'axios';

const API = axios.create({
    baseURL: "/api",
    headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token")
    }
});

// yourConfig = {
//     headers: {
//         Authorization: "Bearer " + yourJWTToken
//     }
// }


const moods = [
    "Happy",
    "Angry",
    "Sad"
];

export { moods };


export default API;