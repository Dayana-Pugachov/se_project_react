import { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  onCloseModal,
  isOpen,
  handleRegistration,
  isErrorActive,
  handleModalRedirect,
}) {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const formErrorClassName = isErrorActive
    ? "form__error_active"
    : "form__error";

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegistration(registerData);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      name="sign-up"
      buttonText="Sign Up"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
      onModalRedirect={handleModalRedirect}
      orButtonText="or Log In"
    >
      <fieldset className="form__fieldset">
        <label
          className="form__label form__label_type_text"
          htmlFor="registerEmail"
        >
          Email*
        </label>
        <input
          className="form__input"
          id="registerEmail"
          name="email"
          placeholder="Email"
          type="email"
          required
          value={registerData.email}
          onChange={handleChange}
        ></input>

        <label
          className="form__label form__label_type_text"
          htmlFor="registerPassword"
        >
          Password*
        </label>
        <input
          className="form__input"
          id="registerPassword"
          name="password"
          placeholder="Password"
          type="password"
          required
          minLength="8"
          value={registerData.password}
          onChange={handleChange}
        ></input>

        <label
          className="form__label form__label_type_text"
          htmlFor="registerName"
        >
          Name*
        </label>
        <input
          className="form__input"
          id="registerName"
          name="name"
          placeholder="Name"
          type="text"
          required
          minLength="1"
          maxLength="30"
          value={registerData.name}
          onChange={handleChange}
        ></input>

        <label
          className="form__label form__label_type_text"
          htmlFor="registerAvatar"
        >
          Avatar URL*
        </label>
        <input
          className="form__input"
          id="registerAvatar"
          name="avatar"
          placeholder="Avatar URL"
          type="url"
          required
          value={registerData.avatar}
          onChange={handleChange}
        ></input>
        <div className={formErrorClassName}>This user already exists.</div>
      </fieldset>
    </ModalWithForm>
  );
}

export default RegisterModal;
