import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(inputRef.current.value, "string");
    props.onUpdateAvatar(inputRef.current.value);
  };

  return (
    <PopupWithForm
      name="avatar-update"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      btnText="Сохранить"
    >
      <label htmlFor="avatar" className="popup__field">
        <input
          ref={inputRef}
          type="url"
          placeholder="Ссылка на изображение"
          className="popup__input"
          id="avatar"
          name="avatar"
          required
        />
        <span className="popup__error avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
