export function getCurrentForecast({ longitude, latitude }, APIkey) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Something went wrong: ${res.status}`);
  });
}

export function parseForecastData(data) {
  const result = {};
  result.temp = {
    F: `${Math.round(data.main.temp)}°F`,
    C: `${Math.round(((data.main.temp - 32) * 5) / 9)}°C`,
  };
  result.location = data.name;
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
}

function isDay({ sunrise, sunset }, now) {
  return sunrise * 1000 < now && now < sunset * 1000;
}

function getWeatherType(temperature) {
  const temperatureNum = Number.parseInt(temperature);
  if (temperatureNum >= 86) {
    return "hot";
  } else if (temperatureNum >= 66 && temperatureNum < 86) {
    return "warm";
  } else {
    return "cold";
  }
}
