import axios from 'axios';

const API_KEY = '12eb56349d8d91b6b525df99e75715f4';
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
	const url = `${ROOT_URL}&q=${city},us`; // making country code static to U.S.
	const request = axios.get(url);
	// console.log(request);
	return {
		type: FETCH_WEATHER,
		payload: request
	};
}