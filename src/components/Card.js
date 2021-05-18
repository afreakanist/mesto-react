function Card(props) {
  const handleCardClick = () => {
    props.onCardClick({ caption: props.caption, link: props.link });
  };

  return (
    <li className="element">
      <img
        src={props.link}
        alt="Картинка"
        className="element__picture"
        onClick={handleCardClick}
      />
      <button
        type="button"
        aria-label="Удалить"
        className="element__delete-button button"
      ></button>
      <div className="element__info">
        <h2 className="element__description">{props.caption}</h2>
        <div className="element__like-group">
          <button
            type="button"
            aria-label="Нравится"
            className="element__like-button"
          ></button>
          <p className="element__like-count">{props.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
