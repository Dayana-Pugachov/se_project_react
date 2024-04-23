import "./ConfirmModal.css";

function ConfirmModal({ name, isOpen, onCloseModal, handleDeleteItem }) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className={`modal__container modal__container_type_${name}`}>
        <button
          className={`modal__close modal__close_type_${name}`}
          alt="close"
          type="button"
          onClick={onCloseModal}
        />
        <p className="modal__text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          className="modal__button modal__button_type_yes"
          type="button"
          aria-label="Yes, delete items"
          onClick={handleDeleteItem}
        >
          Yes, delete item
        </button>
        <button
          className="modal__button modal__button_type_cancel"
          type="button"
          aria-label="Cancel"
          onClick={onCloseModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmModal;
