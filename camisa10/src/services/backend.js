import axios from 'axios';

const backend = axios.create({
    baseURL: 'https://camisa10-backend.herokuapp.com/api',
});

export default backend;