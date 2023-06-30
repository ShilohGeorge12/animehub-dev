import { responseType } from '../../types';

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
type fetchType = (endPoint: string, method: Method, cacheControl: RequestCache, data?: FormData) => Promise<responseType>;

export const useFetch: fetchType = async (endPoint, method, cache, data) => {
	const url = import.meta.env.VITE_MODE === 'development' ? `http://localhost:5050/api/${endPoint}` : `https://animehub-api.up.railway.app/api/${endPoint}`;

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
