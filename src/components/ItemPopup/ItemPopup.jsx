import "./ItemPopup.css";

function ItemPopup({ name, card, onClosePopup }) {
  return (
    <div className={`popup popup_type_${name}`}>
      <div className="popup__container popup__container_type_preview">
        <img
          className="popup__item-image"
          src={card.link}
          alt={card.name}
        ></img>
        <button
          className="popup__close popup__close_type_preview"
          type="button"
          alt="close"
          onClick={onClosePopup}
        ></button>
        <div className="popup__item-description">
          <p className="item-name">{card.name}</p>
          <p className="item-weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemPopup;
