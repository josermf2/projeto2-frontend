import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {'X-Auth-Token':process.env.REACT_APP_TOKEN_API}
});

export default api;