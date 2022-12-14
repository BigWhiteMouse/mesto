const profileEditButton = document.querySelector('.profile__edit-button');
const profileOwner = document.querySelector('.profile__owner');
const profileDescription = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');
const formInputValueProfileOwner = document.querySelector('.form__input_value_profile-owner');
const formInputValueProfileDescription = document.querySelector('.form__input_value_profile-description');
const popupExitButton = document.querySelector('.popup__exit-button');
const submitForm  = document.querySelector('.form');

function makePopupVisible(){
    popup.classList.add('popup_visible');
    formInputValueProfileOwner.value = profileOwner.textContent;
    formInputValueProfileDescription.value = profileDescription.textContent;
}

function closePopup(){
    popup.classList.remove('popup_visible');
}

function submit(event){
    event.preventDefault();
    closePopup();
    profileOwner.textContent = formInputValueProfileOwner.value;
    profileDescription.textContent = formInputValueProfileDescription.value;
}

//открытие попапа кликом по кнопке редактирования
profileEditButton.addEventListener('click', makePopupVisible);

//закрытие попапа и сохранение изменений
submitForm.addEventListener('submit', submit);

//закрытие попапа без сохранения изменений кликом по кнопке закрытия
popupExitButton.addEventListener('click', closePopup);




