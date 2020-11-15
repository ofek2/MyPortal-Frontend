import axios from 'axios';
import config from "../model/data/Configuration";

const axiosInstance = axios.create({
	baseURL: config.authService.baseURL,
	withCredentials: true
});

// axiosInstance.interceptors.request.use((options) => {
// 	options = jwtOptions(options);
// 	return options;
// }, (err) => {
// 	return Promise.reject(err);
// });

// function jwtOptions(options: AxiosRequestConfig) {
// 	const data = options.data || {};
// 	const secret = config.authService.jwtSecret;
// 	const token = jwt.sign({ ...data.params, ...data.body, ...data.urlParams }, secret);

// 	options.headers = {
// 		...options.headers,
// 		"jwt-token": token
// 	};

// 	return options;
// }

export default axiosInstance;