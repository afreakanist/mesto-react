// import { useEffect } from "react";

function PopupWithForm(props) {
  /* useEffect(() => {
    const handleEscClick = (event) => {
      if (event.key === "Escape") props.onClose();
    };
    const handleOverlayClick = (event) => {
      if (event.target.classList.contains('popup_opened')) props.onClose();
    };

    document.addEventListener("keydown", handleEscClick);
    document.querySelector(`.popup_${props.name}`).addEventListener("click", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleEscClick);
      document.querySelector(`.popup_${props.name}`).removeEventListener("click", handleOverlayClick);
    };
  }); */

  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : null
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть окно"
          className="popup__close-button button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name="edit"
          noValidate
        >
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
