import "./ConfirmPopup.css";

function ConfirmPopup({ name, isOpen, onClosePopup, handleDeleteItem }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          className={`popup__close popup__close_type_${name}`}
          alt="close"
          type="button"
          onClick={onClosePopup}
        />
        <p className="popup__text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          className="popup__button popup__button_type_yes"
          type="button"
          aria-label="Yes, delete items"
          onClick={handleDeleteItem}
        >
          Yes, delete item
        </button>
        <button
          className="popup__button popup__button_type_cancel"
          type="button"
          aria-label="Cancel"
          onClick={onClosePopup}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmPopup;
