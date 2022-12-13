const profileEditButton = document.querySelector('.profile__edit-button');
const profileOwner = document.querySelector('.profile__owner');
const profileDescription = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');
const popupInputProfileOwner = document.querySelector('.popup__input_profile-owner');
const popupInputProfileDescription = document.querySelector('.popup__input_profile-description');
const popupSaveButton = document.querySelector('.popup__save-button');
const popupExitButton = document.querySelector('.popup__exit-button');

function makePopupVisible(){
    popup.classList.add('popup_visible');
    popupInputProfileOwner.value = profileOwner.textContent;
    popupInputProfileDescription.value = profileDescription.textContent;
}

function closePopup(event){
    event.preventDefault();
    popup.classList.remove('popup_visible');
}

function saveChanges(event){
    closePopup(event);
    profileOwner.textContent = popupInputProfileOwner.value;
    profileDescription.textContent = popupInputProfileDescription.value;
}

//открытие попапа кликом по кнопке редактирования
profileEditButton.addEventListener('click', makePopupVisible);

//закрытие попапа и сохранение изменений кликом по кнопке сохранить
popupSaveButton.addEventListener('click', saveChanges);

//закрытие попапа без сохранения изменений кликом по кнопке закрытия
popupExitButton.addEventListener('click', closePopup);

//закрытие попапа и сохранение изменений нажатиемм на клавишу enter (требование из чеклиста)
document.addEventListener('keydown', function (event){
  if(event.code==='Enter'){
      if(popup.classList.contains('popup_visible')){
          saveChanges(event);
      }
  }
})



