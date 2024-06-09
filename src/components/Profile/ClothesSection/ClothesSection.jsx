import "./ClothesSection.css";
import ItemCard from "../../Main/ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddModalOpen,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="clothes-section">
      <p className="clothes-section__title">
        Your items
        <button
          className="clothes-section__add-btn"
          type="button"
          aria-label="Add new clothing item"
          onClick={handleAddModalOpen}
        >
          + Add new
        </button>
      </p>

      <ul className="gallery__list gallery__list_type_profile">
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => {
            return (
              <ItemCard
                item={item}
                key={item._id}
                handleCardClick={() => handleCardClick(item)}
              />
            );
          })}
      </ul>
    </section>
  );
}

export default ClothesSection;
