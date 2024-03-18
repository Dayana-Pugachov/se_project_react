const APIkey = "ba1c5b5b2f1c8d4f277dfec35cfb457e";

//Petah Tikva, Israel
const longitude = 34.887762;
const latitude = 32.084041;

//the request
//https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}

export function getCurrentForecast() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Something went wrong: ${res.status}`);
  });
}

export function parseTempData(data) {
  const currentTemp = Math.ceil(data.main.temp);
  /*const location = data.name;*/
  return currentTemp;

  /*console.log(`Current temp: ${Math.ceil(data.main.temp)}`);
  console.log(`Location: ${data.name}`);*/
}

export function parseLocationData(data) {
  const location = data.name;
  return location;
}
