import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({ handleCardClick, clothingItems, handleAddPopupOpen }) {
  return (
    <section className="profile__section">
      <SideBar />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        handleAddPopupOpen={handleAddPopupOpen}
      />
    </section>
  );
}

export default Profile;
