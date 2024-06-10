import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddModalOpen,
  handleEditProfileModalOpen,
}) {
  return (
    <section className="profile__section">
      <SideBar handleEditProfileModalOpen={handleEditProfileModalOpen} />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        handleAddModalOpen={handleAddModalOpen}
      />
    </section>
  );
}

export default Profile;
