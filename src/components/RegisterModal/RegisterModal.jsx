import { useEffect, useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ onCloseModal, isOpen, handleRegistration }) {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

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
      orButtonText="or Log In"
      handleSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <label className="form__label form__label_type_text" htmlFor="email">
          Email*
        </label>
        <input
          className="form__input"
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          required
          value={registerData.email}
          onChange={handleChange}
        ></input>

        <label className="form__label form__label_type_text" htmlFor="password">
          Password*
        </label>
        <input
          className="form__input"
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          required
          minLength="8"
          value={registerData.password}
          onChange={handleChange}
        ></input>

        <label className="form__label form__label_type_text" htmlFor="name">
          Name*
        </label>
        <input
          className="form__input"
          id="name"
          name="name"
          placeholder="Name"
          type="text"
          required
          minLength="1"
          maxLength="30"
          value={registerData.name}
          onChange={handleChange}
        ></input>

        <label className="form__label form__label_type_text" htmlFor="avatar">
          Avatar URL*
        </label>
        <input
          className="form__input"
          id="avatar"
          name="avatar"
          placeholder="Avatar URL"
          type="url"
          value={registerData.avatar}
          onChange={handleChange}
        ></input>
      </fieldset>
    </ModalWithForm>
  );
}

export default RegisterModal;
