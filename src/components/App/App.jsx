import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemPopup from "../AddItemPopup/AddItemPopup";
import ItemPopup from "../ItemPopup/ItemPopup";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import Profile from "../Profile/Profile";
import { useEffect, useState } from "react";
import { getCurrentForecast, parseForecastData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    isDay: true,
    condition: "",
  });
  const [location, setLocation] = useState("");
  const [activePopup, setActivePopup] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  //"add-popup" or "preview" or "confirm"
  function handleOpenPopup(popup) {
    if (popup === "add-popup") {
      setActivePopup(popup);
      setIsAddPopupVisible(true);
      setIsMobileMenuOpen(false);
    } else {
      setActivePopup(popup);
    }
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((state) => !state);
  }

  function handleClosePopup() {
    setActivePopup("");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    handleOpenPopup("preview");
  }

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  function handleAddItemSubmit(inputValues) {
    addClothingItem(inputValues)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
      })
      .catch(console.error)
      .finally(handleClosePopup);
  }

  function deleteSelectedCard() {
    deleteClothingItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => selectedCard._id !== item._id)
        );
      })
      .catch(console.error)
      .finally(handleClosePopup);
  }

  //side effect of handleEsc
  useEffect(() => {
    if (!activePopup) return;
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleClosePopup();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [activePopup]);

  //side effect of handleClickOff
  useEffect(() => {
    if (!activePopup) return;
    const handleClickOff = (event) => {
      if (event.target.classList.contains("popup")) {
        handleClosePopup();
      }
    };
    document.addEventListener("click", handleClickOff);
    return () => document.removeEventListener("click", handleClickOff);
  }, [activePopup]);

  //side effect of retrieving weather && location from weatherApi
  useEffect(() => {
    getCurrentForecast(coordinates, APIkey)
      .then((data) => {
        const parsedData = parseForecastData(data);
        setWeatherData(parsedData);
        setLocation(parsedData.location);
      })
      .catch(console.error);
  }, []);

  //side effect of retrieving clothing items from api
  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          onOpenPopup={() => handleOpenPopup("add-popup")}
          location={location}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                handleCardClick={handleCardClick}
                weatherData={weatherData}
                clothingItems={clothingItems}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                handleCardClick={handleCardClick}
                clothingItems={clothingItems}
                handleAddPopupOpen={() => handleOpenPopup("add-popup")}
              />
            }
          />
        </Routes>
        <Footer />
        <AddItemPopup
          onClosePopup={handleClosePopup}
          isOpen={activePopup === "add-popup"}
          onAddItem={handleAddItemSubmit}
        />
        <ItemPopup
          name="preview"
          card={selectedCard}
          onClosePopup={handleClosePopup}
          isOpen={activePopup === "preview"}
          handleConfirmPopupOpen={() => handleOpenPopup("confirm")}
        />
        <ConfirmPopup
          name="confirm"
          onClosePopup={handleClosePopup}
          isOpen={activePopup === "confirm"}
          handleDeleteItem={deleteSelectedCard}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
