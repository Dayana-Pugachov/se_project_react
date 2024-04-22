import "./PopupWithForm.css";

function PopupWithForm({
  title,
  name,
  buttonText,
  children,
  onClosePopup,
  isOpen,
  handleSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <p className="popup__title">{title}</p>
        <button
          className="popup__close"
          alt="close"
          type="button"
          onClick={onClosePopup}
        />
        <form onSubmit={handleSubmit} className="form popup__form">
          {children}
          <button type="submit" className="form__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
