import React from "react";

function PopupWithForm(props) {
    return(
        <div className={props.isOpen ? `popup popup_${props.name} popup_open` : `popup popup_${props.name}`}>
            <div className="popup__container">
                <button className="popup__button-close" type="button" onClick={props.onClose}></button>
                <form className="popup__form-profile" name={props.name} noValidate action="#" method="post">
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button className="popup__button-submit" type="submit">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;