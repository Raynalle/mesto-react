import React from "react";

function Card(props) {
  const handleClick = () => {
    props.onCardClick(props.card);
  }

  return (     
    <div className="element">
      <button className="element__trash" type="button"></button>
      <div className="element__body">
          <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
          <div className="element__flex">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__shell">
              <button className="element__like" type="button"></button>
              <span className="element__like-counter">{props.card.likes.length}</span>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Card;