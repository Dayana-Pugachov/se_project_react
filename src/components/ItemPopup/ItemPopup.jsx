import "./ItemPopup.css";

function ItemPopup({
  name,
  card,
  onClosePopup,
  isOpen,
  handleConfirmPopupOpen,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <img
          className="popup__item-image"
          src={card.imageUrl}
          alt={card.name}
        ></img>
        <button
          className="popup__close popup__close_type_preview"
          type="button"
          alt="close"
          onClick={onClosePopup}
        />
        <div className="popup__item-description">
          <p className="item-name">{card.name}</p>
          <p className="item-weather">Weather: {card.weather}</p>
          <button
            className="item-delete"
            type="button"
            aria-label="Delete item"
            onClick={handleConfirmPopupOpen}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemPopup;
