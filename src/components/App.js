import "../index.css";
import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    caption: "",
    link: "",
  });

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard({
      isOpen: !setSelectedCard.isOpen,
      caption: card.caption,
      link: card.link,
    });
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({
      isOpen: false,
      caption: "",
      link: "",
    });
  };

  return (
    <>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <label htmlFor="name" className="popup__field">
            <input
              type="text"
              placeholder="Имя"
              className="popup__input"
              id="name"
              name="name"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__error name-error"></span>
          </label>
          <label htmlFor="about" className="popup__field">
            <input
              type="text"
              placeholder="О себе"
              className="popup__input"
              id="about"
              name="about"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup__error about-error"></span>
          </label>
          <button type="submit" className="popup__submit-button">
            Сохранить
          </button>
        </PopupWithForm>
        <PopupWithForm
          name="avatar-update"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <label htmlFor="avatar" className="popup__field">
            <input
              type="url"
              placeholder="Ссылка на изображение"
              className="popup__input"
              id="avatar"
              name="avatar"
              required
            />
            <span className="popup__error avatar-error"></span>
          </label>
          <button type="submit" className="popup__submit-button">
            Сохранить
          </button>
        </PopupWithForm>
        <PopupWithForm
          name="add"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <label htmlFor="caption" className="popup__field">
            <input
              type="text"
              placeholder="Название"
              className="popup__input"
              id="caption"
              name="name"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popup__error caption-error"></span>
          </label>
          <label htmlFor="link" className="popup__field">
            <input
              type="url"
              placeholder="Ссылка на изображение"
              className="popup__input"
              id="link"
              name="link"
              required
            />
            <span className="popup__error link-error"></span>
          </label>
          <button type="submit" className="popup__submit-button">
            Создать
          </button>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </>
  );
}

export default App;
