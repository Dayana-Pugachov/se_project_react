import "./ClothesSection.css";
import ItemCard from "../../Main/ItemCard/ItemCard";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddModalOpen,
  isLoggedIn,
  onCardLike,
}) {
  const [isGalleryEmpty, setIsGalleryEmpty] = useState(true);
  const currentUser = useContext(CurrentUserContext);

  const galleryEmpty = !clothingItems.some(
    (item) => item.owner === currentUser._id
  );

  const emptyGalleryClassName = isGalleryEmpty
    ? "gallery_type_empty"
    : "hidden";

  useEffect(() => {
    if (galleryEmpty) {
      setIsGalleryEmpty(true);
    } else {
      setIsGalleryEmpty(false);
    }
  }, [clothingItems]);

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
        <div className={emptyGalleryClassName}>
          You haven't added any clothing items yet. Click "+Add new".
        </div>
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => {
            return (
              <ItemCard
                item={item}
                key={item._id}
                handleCardClick={() => handleCardClick(item)}
                isLoggedIn={isLoggedIn}
                onCardLike={onCardLike}
              />
            );
          })}
      </ul>
    </section>
  );
}

export default ClothesSection;
