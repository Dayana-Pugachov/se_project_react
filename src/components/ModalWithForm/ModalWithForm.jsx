import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  buttonText,
  children,
  onCloseModal,
  isOpen,
  handleSubmit,
}) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className={`modal__container modal__container_type_${name}`}>
        <p className="modal__title">{title}</p>
        <button
          className="modal__close"
          alt="close"
          type="button"
          onClick={onCloseModal}
        />
        <form onSubmit={handleSubmit} className="form modal__form">
          {children}
          <button type="submit" className="form__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
