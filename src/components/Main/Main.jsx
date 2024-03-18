//pass down weather data from App
//use filter() and map() methods in ItemCard
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import { useMemo } from "react";

function Main({ handleCardClick, weatherTemp }) {
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  const filteredClothingItems = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="content">
      <WeatherCard day={false} type="moon" weatherTemp={weatherTemp} />
      <section className="content__title">
        Today is {weatherTemp}°F / You may want to wear:
      </section>
      <section className="content__gallery gallery">
        <ul className="gallery__list">
          {filteredClothingItems.map((item) => {
            return (
              <ItemCard
                item={item}
                key={item._id}
                handleCardClick={() => handleCardClick(item)}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
