function ImagePopup(props) {
  return (
    <div className={`popup popup_picture ${props.card.isOpen ? 'popup_opened' : null}`}>
      <figure className="popup__figure">
        <button
          type="button"
          aria-label="Закрыть окно"
          className="popup__close-button button"
          onClick={props.onClose}
        ></button>
        <img src={props.card.link} alt="Картинка" className="popup__picture" />
        <figcaption className="popup__picture-caption">{props.card.caption}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
