import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddModalOpen,
  handleEditProfileModalOpen,
  handleLogOut,
  isLoggedIn,
  onCardLike,
}) {
  return (
    <section className="profile__section">
      <SideBar
        handleEditProfileModalOpen={handleEditProfileModalOpen}
        handleLogOut={handleLogOut}
        isLoggedIn={isLoggedIn}
      />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        handleAddModalOpen={handleAddModalOpen}
        isLoggedIn={isLoggedIn}
        onCardLike={onCardLike}
      />
    </section>
  );
}

export default Profile;
