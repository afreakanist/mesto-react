import "../index.css";
import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    caption: "",
    link: "",
  });

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard({
      isOpen: true,
      caption: card.caption,
      link: card.link,
    });
  };

  const handleUpdateUser = (userData) => {
    api
      .editUserInfo(userData)
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(`Error in profile editing: ${err}`))
      .finally(() => closeAllPopups());
  };

  const handleUpdateAvatar = (link) => {
    api
      .updateAvatar(link)
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(`Error in avatar updating: ${err}`))
      .finally(() => closeAllPopups());
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
    <CurrentUserContext.Provider value={currentUser}>
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
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="add"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          btnText="Создать"
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
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
