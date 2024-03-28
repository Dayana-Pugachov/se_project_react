import "./PopupWithForm.css";
import { useState } from "react";

function PopupWithForm({
  title,
  name,
  buttonText,
  children,
  onClosePopup,
  isAddPopupVisible,
  isOpen,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""} ${
        isAddPopupVisible ? "popup_active" : ""
      }`}
    >
      <div className="popup__container">
        <p className="popup__title">{title}</p>
        <button
          className="popup__close"
          alt="close"
          type="button"
          onClick={onClosePopup}
        ></button>
        <form className="form popup__form">
          {children}
          <button type="submit" className="form__button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
