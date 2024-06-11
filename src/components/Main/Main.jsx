import React from "react";
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  handleCardClick,
  weatherData,
  clothingItems,
  isLoggedIn,
  onCardLike,
}) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <main className="content">
      <WeatherCard weatherData={weatherData} />
      <section className="content__title">
        Today is {weatherData.temp[currentTemperatureUnit]} / You may want to
        wear:
      </section>
      <section className="content__gallery gallery">
        <ul className="gallery__list">
          {clothingItems
            .filter((item) => {
              return item.weather.toLowerCase() === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  item={item}
                  key={item._id}
                  handleCardClick={() => handleCardClick(item)}
                  isLoggenIn={isLoggedIn}
                  onCardLike={onCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
