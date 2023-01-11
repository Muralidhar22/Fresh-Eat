import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL

export const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
})