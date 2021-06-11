import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Card from "./Card";

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick }) {
  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    Promise.all([api.getInitialCards()])
      .then(([data]) => {
        setCards([...data]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .like(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .unlike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-overlay" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              aria-label="Редактировать профиль"
              className="profile__edit-button button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить новую картинку"
          className="profile__add-button button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                key={card._id}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
