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
  result.temp = Math.ceil(data.main.temp);
  result.location = data.name;
  result.type = getWeatherType(result.temp);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
}

function isDay({ sunrise, sunset }, now) {
  return sunrise * 1000 < now && now < sunset * 1000;
}

function getWeatherType(temperature) {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
}
