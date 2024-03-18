import "./WeatherCard.css";

const weatherConditions = [
  {
    url: require("../../../images/weather-conditions/cloudy-day.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../../../images/weather-conditions/sunny-day.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../../../images/weather-conditions/moon-night.svg").default,
    day: false,
    type: "moon",
  },
  {
    url: require("../../../images/weather-conditions/cloudy-night.svg").default,
    day: false,
    type: "cloudy",
  },
];

function WeatherCard({ day, type, weatherTemp }) {
  const bannerSrc = weatherConditions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const bannerSrcUrl = bannerSrc[0].url || "";

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherTemp}°F</p>
      <img className="weather-card__banner" src={bannerSrcUrl} />
    </section>
  );
}

export default WeatherCard;
