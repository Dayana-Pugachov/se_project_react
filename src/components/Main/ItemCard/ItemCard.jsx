import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function ItemCard({ item, handleCardClick, isLoggedIn, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = isLiked ? "card__like_active" : "card__like";

  function handleLike() {
    onCardLike(item._id, isLiked);
  }

  return (
    <li className="card">
      <img
        src={item.imageUrl}
        className="card__image"
        alt={item.name}
        onClick={handleCardClick}
      />
      <div className="wrapper">
        <p className="card__title">{item.name}</p>
        <button
          className={isLoggedIn ? itemLikeButtonClassName : "hidden"}
          type="button"
          aria-label="like"
          onClick={handleLike}
        ></button>
      </div>
    </li>
  );
}

export default ItemCard;
