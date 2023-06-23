import { responseType } from '../../types';

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
type fetchType = (endPoint: string, method: Method, cacheControl: RequestCache, data?: FormData, Cookie?: true) => Promise<responseType>;

export const useFetch: fetchType = async (endPoint, method, cache, data, Cookie) => {
	// const url = `http://localhost:5050/api/${endPoint}`;
	const url = `https://animehub-api.onrender.com/api/${endPoint}`;
	let options: RequestInit = {
		credentials: 'include',
		method,
		cache,
	};
	if (method === 'PUT' || method === 'POST' || method === 'PATCH') {
		options.body = data;
	}
	const request = await fetch(url, options);
	if (Cookie) {
		document.cookie = `key=${request.headers.get('x-api-key')};max-age=18000;path='/';`;
	}

	const response = await request.json();
	return response;
};
