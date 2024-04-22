import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  return (
    <li className="card" onClick={handleCardClick}>
      <img src={item.imageUrl} className="card__image" alt={item.name} />
      <p className="card__title">{item.name}</p>
    </li>
  );
}

export default ItemCard;
