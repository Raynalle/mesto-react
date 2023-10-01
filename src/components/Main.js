import React from "react";
import {api} from "../utils/Api";
import Card from "./Card";

function Main(props) {
    
    const [cards, setCards] = React.useState([]);

    

   React.useEffect(() => {
    api.getCards()
    .then(response => {
        setCards(response);
    })
    .catch((error) => {
        console.log(error);
    })
   }, []);


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container"  onClick={props.onEditProfileAvatar}>
                    <div className="profile__avatar-change"></div>
                    <img className="profile__avatar" src={props.userAvatar} alt="Аватар" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{props.userName}</h1>
                    <button className="profile__button-edit" type="button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
                    <p className="profile__subtitle">{props.userDescription}</p>
                </div>
                <button className="profile__button-add" type="button" aria-label="Добавить" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map(card => (
                    <Card 
                    card = {card} 
                    key = {card._id}
                    like = {card.likes}
                    onCardClick={props.onCardClick}/>
                ))}
            </section>
        </main>
    );
}

export default Main;