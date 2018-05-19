import axios from 'axios';
const API_URL = 'http://localhost:3100';

export default function callApi(endpoint, method = 'get', body)  {
    return axios[method](`${API_URL}/${endpoint}`, body);
}
