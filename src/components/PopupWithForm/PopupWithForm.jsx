import "./PopupWithForm.css";

function PopupWithForm({ title, name, buttonText, children, onClosePopup }) {
  /*function handleClose() {
    const popupElement = document.querySelector(".popup");
    popupElement.classList.remove("popup_open");
  }*/

  return (
    <div className={`popup popup_type_${name}`}>
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
