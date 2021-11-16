import axios from 'axios';

const api = axios.create({
    baseURL: 'http://api.football-data.org/v2',
    headers: {'X-Auth-Token': '004303a5a43a4ec9b36923c47a490493'}
});

export default api;