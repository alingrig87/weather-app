import {
	getCurrentWeatherByCity,
	getForecastByCity,
	getIconForCurrentWeather,
} from './api/wheater.js';
import { getLocaleDateFromUnixTime } from './utils/date.js';

const cityInput = document.querySelector('.main-content form input');
const searchButton = document.querySelector('.main-content form button');
const weatherContainer = document.querySelector('.main-content .weather');

searchButton.addEventListener('click', showWeather);

async function showWeather(e) {
	e.preventDefault();

	const city = cityInput.value;
	const weather = await getCurrentWeatherByCity(city);

	const date = getLocaleDateFromUnixTime(weather.dt);

	console.log(weather);

	const iconURL = await getIconForCurrentWeather(weather);

	weatherContainer.innerHTML = `
   <div class="flex-row space-between">
      <div>
         <h3>${weather.name} ( ${date} )<h3>
         <p>Temperature: ${weather.main.temp}&deg;C</p>
         <p>Wind: ${weather.wind.speed}</p>
         <p>Humidity: ${weather.main.humidity}</p>
         <p>Min: ${weather.main.temp_max}</p>
         <p>Max: ${weather.main.temp_min}</p>
      </div>
      <div class="weather-icon">
         <img src=${iconURL} />
         <p>${weather.weather[0].description}</p>
      </div>
   </div>
   
   `;

	const forecast = await getForecastByCity(city);
	console.log(forecast);

	const days = forecast.list.map((element) => element.dt_txt.split(' ')[0]);
	const uniqueDays = new Set(days);

	const forecastByDayList = [];
	uniqueDays.forEach((day) => {
		const forecastByDay = forecast.list.filter((element) =>
			element.dt_txt.includes(day)
		);
		forecastByDayList.push(forecastByDay);
	});

	console.log(forecastByDayList);
}
