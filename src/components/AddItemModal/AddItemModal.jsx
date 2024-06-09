import { useEffect, useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ onCloseModal, isOpen, onAddItem, isLoading }) {
  const [nameInputValue, setNameInputValue] = useState("");
  const [urlInputValue, setUrlInputValue] = useState("");
  const [weatherInputValue, setWeatherInputValue] = useState("");

  useEffect(() => {
    setNameInputValue("");
    setUrlInputValue("");
  }, [isOpen]);

  function handleNameChange(event) {
    setNameInputValue(event.target.value);
  }

  function handleUrlChange(event) {
    setUrlInputValue(event.target.value);
  }

  function handleWeatherChange(event) {
    setWeatherInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddItem({ nameInputValue, urlInputValue, weatherInputValue });
  }

  return (
    <ModalWithForm
      title="New garment"
      name="form"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <label className="form__label form__label_type_text" htmlFor="name">
          Name
        </label>
        <input
          className="form__input"
          id="name"
          name="name"
          placeholder="Name"
          type="text"
          required
          minLength="1"
          maxLength="30"
          value={nameInputValue}
          onChange={handleNameChange}
        ></input>

        <label className="form__label form__label_type_text" htmlFor="url">
          Image
        </label>
        <input
          className="form__input"
          id="url"
          name="url" //see the difference
          placeholder="Image URL"
          type="url"
          required
          value={urlInputValue}
          onChange={handleUrlChange}
        ></input>
      </fieldset>
      <p className="fieldset__text">Select the weather type:</p>
      <fieldset className="form__fieldset">
        <div className="label-wrapper">
          <input
            className="form__input"
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            onChange={handleWeatherChange}
          ></input>
          <label className="form__label form__label_type_radio" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="label-wrapper">
          <input
            className="form__input"
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            onChange={handleWeatherChange}
          ></input>
          <label className="form__label form__label_type_radio" htmlFor="warm">
            Warm
          </label>
        </div>
        <div className="label-wrapper">
          <input
            className="form__input"
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            onChange={handleWeatherChange}
          ></input>
          <label className="form__label form__label_type_radio" htmlFor="cold">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
