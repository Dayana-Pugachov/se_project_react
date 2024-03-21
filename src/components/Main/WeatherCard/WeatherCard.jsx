import "./WeatherCard.css";
import { weatherOptions } from "../../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.isDay === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const currentWeatherOption = filteredOptions[0];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp}°F</p>
      <img
        className="weather-card__banner"
        src={currentWeatherOption?.url}
        alt={`Card is showing ${
          currentWeatherOption?.isDay ? "day" : "night"
        }time ${currentWeatherOption?.condition} weather`}
      />
    </section>
  );
}

export default WeatherCard;
