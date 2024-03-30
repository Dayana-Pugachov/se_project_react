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

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const coordinates = {
  longitude: 37.617664,
  latitude: 55.752121,
};

export const APIkey = "ba1c5b5b2f1c8d4f277dfec35cfb457e";

/*Petah Tikva
longitude: 34.887762,
  latitude: 32.084041, */

/*Moscow
  longtitude: 	37.617664
  latitude: 	55.752121 */
