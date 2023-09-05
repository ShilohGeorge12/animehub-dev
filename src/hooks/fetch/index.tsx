import { devUrl, prodUrl, responseTypes } from '../../types';

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
type fetchType = (endPoint: string, method: Method, cacheControl: RequestCache, data?: FormData) => Promise<responseTypes>;

export const useFetch: fetchType = async (endPoint, method, cache, data) => {
	let url: string;
	if (import.meta.env.VITE_MODE === 'development' && import.meta.env.VITE_TESTING === 'true') {
		url = `http://192.168.88.111:5050/api/${endPoint}`;
	} else if (import.meta.env.VITE_MODE === 'development' && import.meta.env.VITE_TESTING === undefined) {
		url = `${devUrl}/api/${endPoint}`;
	} else {
		url = `${prodUrl}/api/${endPoint}`;
	}

	let options: RequestInit = {
		credentials: 'include',
		method,
		cache,
	};
	if (method === 'PUT' || method === 'POST' || method === 'PATCH') {
		options.body = data;
	}
	const request = await fetch(url, options);
	const response = await request.json();
	return response;
};
