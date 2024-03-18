import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  return (
    /*<template>*/
    <li
      className="card"
      /*onClick={() => handleCardClick(item)}*/ onClick={handleCardClick}
    >
      <img src={item.link} className="card__image" alt={item.name} />
      <p className="card__title">{item.name}</p>
    </li>
    /*</template>*/
  );
}

export default ItemCard;
