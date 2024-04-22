export const weatherOptions = [
  {
    url: new URL("../images/weather-conditions/day/clear.svg", import.meta.url)
      .href,
    isDay: true,
    condition: "clear",
  },
  {
    url: new URL("../images/weather-conditions/day/cloudy.svg", import.meta.url)
      .href,
    isDay: true,
    condition: "clouds",
  },
  {
    url: new URL("../images/weather-conditions/day/fog.svg", import.meta.url)
      .href,
    isDay: true,
    condition: "fog",
  },
  {
    url: new URL("../images/weather-conditions/day/rain.svg", import.meta.url)
      .href,
    isDay: true,
    condition: "rain" || "drizzle",
  },
  {
    url: new URL("../images/weather-conditions/day/snow.svg", import.meta.url)
      .href,
    isDay: true,
    condition: "snow",
  },
  {
    url: new URL("../images/weather-conditions/day/storm.svg", import.meta.url)
      .href,
    isDay: true,
    condition: "thunderstorm",
  },
  {
    url: new URL(
      "../images/weather-conditions/night/clear.svg",
      import.meta.url
    ).href,
    isDay: false,
    condition: "clear",
  },
  {
    url: new URL(
      "../images/weather-conditions/night/cloudy.svg",
      import.meta.url
    ).href,
    isDay: false,
    condition: "clouds",
  },
  {
    url: new URL("../images/weather-conditions/night/fog.svg", import.meta.url)
      .href,
    isDay: false,
    condition: "fog",
  },
  {
    url: new URL("../images/weather-conditions/night/rain.svg", import.meta.url)
      .href,
    isDay: false,
    condition: "rain" || "drizzle",
  },
  {
    url: new URL("../images/weather-conditions/night/snow.svg", import.meta.url)
      .href,
    isDay: false,
    condition: "snow",
  },
  {
    url: new URL(
      "../images/weather-conditions/night/storm.svg",
      import.meta.url
    ).href,
    isDay: false,
    condition: "thunderstorm",
  },
];

export const coordinates = {
  longitude: 34.887762,
  latitude: 32.084041,
};

export const APIkey = "ba1c5b5b2f1c8d4f277dfec35cfb457e";

/*Petah Tikva
longitude: 34.887762,
  latitude: 32.084041, */

/*Moscow
  longtitude: 	37.617664
  latitude: 	55.752121 */
