import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: '/api',
	timeout: 3000
});

export default axiosInstance;