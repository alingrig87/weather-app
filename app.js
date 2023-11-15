import { getCurrentWeatherByCity } from './api/wheater.js';

const cityInput = document.querySelector('.main-content form input');
const searchButton = document.querySelector('.main-content form button');
const weatherContainer = document.querySelector('.main-content .weather');

searchButton.addEventListener('click', showWeather);

async function showWeather(e) {
	e.preventDefault();

	const city = cityInput.value;
	const weather = await getCurrentWeatherByCity(city);

	console.log(weather);

	weatherContainer.innerHTML = `<div>${weather.main.temp}</div>`;
}
