import { useEffect, useState } from "react";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
      ([{ name, about, avatar, _id }, data]) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
        const cardDataExtended = data.map((cardData) => {
          return { myId: _id, ...cardData };
        });
        setCards([...cardDataExtended]);
      }
    );
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-overlay" onClick={props.onEditAvatar}>
          <img src={userAvatar} alt="Аватар" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__name">{userName}</h1>
            <button
              type="button"
              aria-label="Редактировать профиль"
              className="profile__edit-button button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить новую картинку"
          className="profile__add-button button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map(({ myId, name, link, _id, likes, owner }) => {
            return (
              <Card
                cardId={_id}
                caption={name}
                link={link}
                myId={myId}
                likes={likes}
                owner={owner}
                onCardClick={props.onCardClick}
                key={_id}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
