import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
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
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  //"add-modal" or "preview" or "confirm"
  function handleOpenModal(modal) {
    if (modal === "add-modal") {
      setActiveModal(modal);
      setIsAddModalVisible(true);
      setIsMobileMenuOpen(false);
    } else {
      setActiveModal(modal);
    }
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((state) => !state);
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    handleOpenModal("preview");
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
      .finally(handleCloseModal);
  }

  function deleteSelectedCard() {
    deleteClothingItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => selectedCard._id !== item._id)
        );
      })
      .catch(console.error)
      .finally(handleCloseModal);
  }

  //side effect of handleEsc
  useEffect(() => {
    if (!activeModal) return;
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [activeModal]);

  //side effect of handleClickOff
  useEffect(() => {
    if (!activeModal) return;
    const handleClickOff = (event) => {
      if (event.target.classList.contains("modal")) {
        handleCloseModal();
      }
    };
    document.addEventListener("click", handleClickOff);
    return () => document.removeEventListener("click", handleClickOff);
  }, [activeModal]);

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
          onOpenModal={() => handleOpenModal("add-modal")}
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
                handleAddModalOpen={() => handleOpenModal("add-modal")}
              />
            }
          />
        </Routes>
        <Footer />
        <AddItemModal
          onCloseModal={handleCloseModal}
          isOpen={activeModal === "add-modal"}
          onAddItem={handleAddItemSubmit}
        />
        <ItemModal
          name="preview"
          card={selectedCard}
          onCloseModal={handleCloseModal}
          isOpen={activeModal === "preview"}
          handleConfirmModalOpen={() => handleOpenModal("confirm")}
        />
        <ConfirmModal
          name="confirm"
          onCloseModal={handleCloseModal}
          isOpen={activeModal === "confirm"}
          handleDeleteItem={deleteSelectedCard}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
