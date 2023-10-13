import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlaceConfirm from "./DeletePlaceConfirm";


function App() {
    
    const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(false);

    const [buttonTextAddPlace, setButtonTextAddPlace] = React.useState('Создать');
    const [buttonTextEditProfile, setButtonTextEditProfile] = React.useState('Сохранить');
    const [buttonTextEditAvatar, setButtonTextEditAvatar] = React.useState('Сохранить');
    const [buttonTextDeletePlace, setButtonTextDeletePlace] = React.useState('Да');

    const [deletePlaceConfirm, setDeletePlaceConfirm] = React.useState({
        isOpen: false,
        card: {}
    })

    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);

    const [currentUser, setCurrentUser] = React.useState({
        "name":'',
        "about": '',
        "avatar": '',
        "_id": '',
        "cohort": ''
      });

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()]) 
        .then(([user, initCards]) => {
            setCurrentUser(user);
            setCards(initCards);
        })
          .catch((error) => {
              console.log(error);
          })
      }, []);

    const handleEditAvatarClick = () => {
        setEditAvatarPopupState(true);
        document.addEventListener('keydown', handleKeyDown);
    }

    const handleProfileClick = () => {
        setEditProfilePopupState(true);
        document.addEventListener('keydown', handleKeyDown);
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupState(true);
        document.addEventListener('keydown', handleKeyDown);
    }

    const handleCardPopupClick = (card) => {
        setSelectedCard(card);
        document.addEventListener('keydown', handleKeyDown);
    }

    const handleDeleteClick = (card) => {
        setDeletePlaceConfirm({isOpen:true, card:card});
        document.addEventListener('keydown', handleKeyDown);
    }

    const handleUpdateUser = (info) => {
        setButtonTextEditProfile('Сохранение...');
        api.setUserInfo(info)
        .then(updateUser => {
            setCurrentUser(updateUser);
            closeAllPopups();
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setButtonTextEditProfile('Сохранить');
        })
    }

    const handleChangeAvatar = (avatarUrl) => {
        setButtonTextEditAvatar('Загрузка...');
        api.updateAvatar(avatarUrl)
        .then(updateUser => {
            setCurrentUser(updateUser);
            closeAllPopups();
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setButtonTextEditAvatar('Сохранить');
        })
    }

    const handleAddPlace = ({name, link}) => {
        setButtonTextAddPlace('Создание...');
        api.createCard({name, link})
        .then(newCard => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setButtonTextAddPlace('Создать')
        })
    }

    const handleCardLike = (card)=>{
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
          .then((newCard)=>{
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch((error) => {
            console.log(error);
          })
      }

    const handleCardDelete = (card) => {
        setButtonTextDeletePlace('Удаление...');
        api.removeCard(card._id)
        .then(response => {
            setCards((state) => state.filter((c) => c._id !== card._id));
            closeAllPopups();
        })
        .finally(() => {
            setButtonTextDeletePlace('Да');
        })
    }

    const closeAllPopups = () => {
        setEditAvatarPopupState(false);
        setAddPlacePopupState(false);
        setEditProfilePopupState(false);
        setDeletePlaceConfirm({isOpen:false, card:{}});
        setSelectedCard(null);
        document.removeEventListener('keydown', handleKeyDown);
    }

    const handleKeyDown = (evt) => {
        if(evt.keyCode === 27) {
            closeAllPopups();
        }
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <div className="page__wrapper">
                <Header/>
                <Main
                onEditProfile = {handleProfileClick}
                onEditProfileAvatar = {handleEditAvatarClick}
                onAddPlace = {handleAddPlaceClick}
                onCardClick = {handleCardPopupClick}
                cards={cards}
                onCardLike = {handleCardLike}
                onDeleteClick = {handleDeleteClick}
                />

                <Footer/>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} buttonText = {buttonTextEditProfile} onKeyDown = {handleKeyDown}/>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onChangeAvatar={handleChangeAvatar} buttonText = {buttonTextEditAvatar} onKeyDown = {handleKeyDown}/>

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} buttonText={buttonTextAddPlace} onKeyDown = {handleKeyDown}/>

                <DeletePlaceConfirm isOpen={deletePlaceConfirm.isOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} buttonText = {buttonTextDeletePlace} onKeyDown = {handleKeyDown}
                card={deletePlaceConfirm.card}/>

                <ImagePopup 
                card={selectedCard} 
                onClose={closeAllPopups}/>
            </div>
        </div>
    </CurrentUserContext.Provider>
    
  );
}

export default App;
