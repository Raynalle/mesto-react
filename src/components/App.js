import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {
    
    const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState(null);


    const handleEditAvatarClick = () => {
        setEditAvatarPopupState(true);
    }

    const handleProfileClick = () => {
        setEditProfilePopupState(true);
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupState(true);
    }

    const handleCardPopupClick = (card) => {
        setSelectedCard(card)
    }

    const closeAllPopups = () => {
        setEditAvatarPopupState(false);
        setAddPlacePopupState(false);
        setEditProfilePopupState(false);
        setSelectedCard(null);
    }

  return (
    <>
    <div className="page">
        <div className="page__wrapper">
            <Header/>
            <Main
            onEditProfile = {handleProfileClick}
            onEditProfileAvatar = {handleEditAvatarClick}
            onAddPlace = {handleAddPlaceClick}
            onCardClick = {handleCardPopupClick}
            />
            <PopupWithForm name="edit-profile" title = "Редактировать профиль" isOpen = {isEditProfilePopupOpen}
            onClose = {closeAllPopups} children={<>
                <div className="popup__fields">
                    <label className="popup__label-field">
                        <input className="popup__field" type="text" name="name" id="name" placeholder="Ваше имя" required minLength="2" maxLength="40"/>
                        <span className="popup__input-error name-error"></span>
                    </label>
                    <label className="popup__label-field">
                        <input className="popup__field" type="text" name="description" id="description" placeholder="Описание" required minLength="2" maxLength="200"/>
                        <span className="popup__input-error description-error"></span>
                    </label>
                </div>
                <button className="popup__button-submit" type="submit">Сохранить</button>
            </>}/>
                
            <PopupWithForm name="add-profile" title = "Новое место" isOpen = {isAddPlacePopupOpen} 
            onClose = {closeAllPopups} children={<>
                <div className="popup__fields">
                    <label className="popup__label-field">
                        <input className="popup__field" type="text" name="name" id="name-photo" placeholder="Название" required minLength="2" maxLength="30"/>
                        <span className="popup__input-error name-photo-error"></span>
                    </label>
                    <label className="popup__label-field">
                        <input className="popup__field" type="url" name="link" id="link-photo" placeholder="Ссылка на картинку" required/>
                        <span className="popup__input-error link-photo-error"></span>
                    </label>
                </div>
                <button className="popup__button-submit" type="submit">Создать</button>
            </>}/>

            <PopupWithForm name="form-confirm" title = "Вы уверены?" children={<>
                <button className="popup__button-submit" type="submit">Да</button>
            </>}/> 
            
            <PopupWithForm name="form-editAvatar" title = "Обновить аватар" isOpen = {isEditAvatarPopupOpen} 
            onClose = {closeAllPopups} children={<>
                <label className="popup__label-field" htmlFor="avatar">
                    <input className="popup__field" type="url" name="avatar" id="avatar" placeholder="Ссылка на новый аватар" required />
                    <span className="popup__input-error avatar-error"></span>
                </label>
                <button className="popup__button-submit popup__button-submit_margin" type="submit" id="button-save-avatar">Сохранить</button>
            </>}/>

            <PopupWithForm name="delite-card" title="Вы уверены?" children={
                <button className="popup__button-submit" type="submit">Да</button>
            }/>

            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

            <Footer/>
        </div>
    </div>
    </>
  );
}

export default App;