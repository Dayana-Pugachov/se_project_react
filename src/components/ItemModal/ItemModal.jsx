import { useContext } from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({
  name,
  card,
  onCloseModal,
  isOpen,
  handleConfirmModalOpen,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const itemDeleteButtonClassName = isOwn
    ? "item-delete"
    : "item-delete_hidden";

  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className={`modal__container modal__container_type_${name}`}>
        <img
          className="modal__item-image"
          src={card.imageUrl}
          alt={card.name}
        ></img>
        <button
          className="modal__close modal__close_type_preview"
          type="button"
          alt="close"
          onClick={onCloseModal}
        />
        <div className="modal__item-description">
          <p className="item-name">{card.name}</p>
          <p className="item-weather">Weather: {card.weather}</p>
          <button
            className={itemDeleteButtonClassName}
            type="button"
            aria-label="Delete item"
            onClick={handleConfirmModalOpen}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
