import axios from "axios";
import {api} from '../urlConfig';
import store from '../store/index';

const axiosInstance = axios.create({
    baseURL: api,
    headers: { 'Authorization': `Bearer ${store.getState().auth.token}` }
});

export default axiosInstance;