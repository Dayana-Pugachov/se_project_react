//pass down weather data from App
//use filter() and map() methods in ItemCard
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import { useEffect, useState } from "react";

function Main({ handleCardClick, weatherData }) {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const filtered = defaultClothingItems.filter((item) => {
      return item.weather.toLowerCase() === weatherData.type;
    });
    setFilteredItems(filtered);
  }, [weatherData.type]);

  function randomizeItems() {
    const randomized = [...filteredItems];
    for (let i = randomized.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomized[i], randomized[j]] = [randomized[j], randomized[i]];
    }
    setFilteredItems(randomized);
  }

  return (
    <main className="content">
      <WeatherCard weatherData={weatherData} />
      <section className="content__title">
        Today is {weatherData.temp}°F / You may want to wear:
      </section>
      <section className="content__gallery gallery">
        <ul className="gallery__list">
          {filteredItems.map((item) => {
            return (
              <ItemCard
                item={item}
                key={item._id}
                handleCardClick={() => handleCardClick(item)}
              />
            );
          })}
        </ul>
        <button
          className="content__button_type_randomize"
          id="randomize-btn"
          type="button"
          aria-label="Randomize items"
          onClick={randomizeItems}
        >
          Randomize
        </button>
      </section>
    </main>
  );
}

export default Main;
