import { useEffect, useState } from "react";
import api from "../utils/api";
import Card from "./Card";

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([{ name, about, avatar }, data]) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
        setCards([...data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-overlay" onClick={onEditAvatar}>
          <img src={userAvatar} alt="Аватар" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__name">{userName}</h1>
            <button
              type="button"
              aria-label="Редактировать профиль"
              className="profile__edit-button button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{userDescription}</p>
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
              <Card card={card} onCardClick={onCardClick} key={card._id} />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
