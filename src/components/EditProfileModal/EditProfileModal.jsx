import "./EditProfileModal.css";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ onCloseModal, isOpen, handleProfileEdit }) {
  const [profileData, setProfileData] = useState({
    name: "",
    avatar: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleProfileEdit(profileData);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      orButtonText=""
      handleSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
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
          value={profileData.name}
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
          value={profileData.avatar}
          onChange={handleChange}
        ></input>
      </fieldset>
    </ModalWithForm>
  );
}

export default EditProfileModal;
