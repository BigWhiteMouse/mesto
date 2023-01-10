const profileEditButton = document.querySelector('.profile__edit-button');
const profileOwner = document.querySelector('.profile__owner');
const profileDescription = document.querySelector('.profile__description');

const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('.element__template').content.querySelector('.element');

const addButton = document.querySelector('.profile__add-button');

const popupImage = document.querySelector('.popup__img');
const popupDescription = document.querySelector('.popup__description');
let popup;

const popupUsageImage = document.querySelector('.popup_usage_image');
const popupImageExitButton = popupUsageImage.querySelector('.popup__exit-button');

const popupUsageEditProfile = document.querySelector('.popup_usage_edit-profile');
const submitEditForm  = popupUsageEditProfile.querySelector('.form');
const popupEditExitButton = popupUsageEditProfile.querySelector('.popup__exit-button');
const formInputValueProfileOwner = popupUsageEditProfile.querySelector('.form__input_value_name');
const formInputValueProfileDescription = popupUsageEditProfile.querySelector('.form__input_value_description');

const popupUsageAddNewPlace = document.querySelector('.popup_usage_add-new-place');
const submitAddForm = popupUsageAddNewPlace.querySelector('.form');
const popupAddExitButton = popupUsageAddNewPlace.querySelector('.popup__exit-button');
const formInputValueCardName = popupUsageAddNewPlace.querySelector('.form__input_value_name');
const formInputValueCardLink = popupUsageAddNewPlace.querySelector('.form__input_value_description');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//создание карточки с картинкой
function createElement(src, description){
    const element = elementTemplate.cloneNode(true);
    element.querySelector('.element__image').setAttribute('alt', description);
    element.querySelector('.element__image').setAttribute('src', src);
    const elementDescription = element.querySelector('.element__description');
    elementDescription.textContent = description;
    return element;
}

//добавление карточки в разметку и обработчики карточки
function addElement(element){
    elementsList.prepend(element);

    //лайк карточки
    const elementLikeButton = element.querySelector('.element__like-button');
    elementLikeButton.addEventListener('click', function (event){
        let likeButton = event.target;
        likeElement(likeButton);
    });

    //удаление карточки
    const elementDeleteButton = element.querySelector('.element__delete-button');
    elementDeleteButton.addEventListener('click', function (event){
        event.target.closest('.element').remove();
    })

    //клик по картинке
    const elementImage = element.querySelector('.element__image');
    elementImage.addEventListener('click', function (event){
        popup = document.querySelector('.popup_usage_image');
        makePopupVisible(popup);
        let src = event.target.getAttribute('src');
        let description = element.querySelector('.element__description').textContent;
        openElementImg(src, description);
    })
}

//добавление/удаление лайка карточки
function likeElement(likeButton){
    if (likeButton.classList.contains('element__like-button_active')){
        likeButton.classList.remove('element__like-button_active');
    }
    else{
        likeButton.classList.add('element__like-button_active');
    }
}

//создание карточек "из коробки"
function renderElements(){
    initialCards.forEach(item => {
        let element = createElement(item.link, item.name);
        addElement(element);
    });
}

//отображение попапа
function makePopupVisible(popup){
    popup.classList.add('popup_visible');
}

//закрытие попапа
function closePopup(){
    popup.classList.remove('popup_visible');
}

//сохранение изменений (редактирование профиля)
function editSubmit(event){
    event.preventDefault();
    closePopup();
    submitProfileEditForm();
}

//сохранение изменений (редкатирование карточки)
function addSubmit(event){
    event.preventDefault();
    closePopup();
    submitAddElementForm();
}

//заполнение атрибутов попапа при открытии формы редактирования профиля
function openProfileEditForm(){
    formInputValueProfileOwner.value = profileOwner.textContent;
    formInputValueProfileDescription.value = profileDescription.textContent;
}

//заполнение атрибутов попапа при открытии формы редактирования карточки
function openAddElementForm(){
    formInputValueCardName.value = '';
    formInputValueCardLink.value = '';
}

//сохранение изменений в форме редактирования профиля
function submitProfileEditForm(){
    profileOwner.textContent = formInputValueProfileOwner.value;
    profileDescription.textContent = formInputValueProfileDescription.value;
}

//сохранение изменений в форме добавления карточки на страницу
function submitAddElementForm(){
    let src =  formInputValueCardLink.value;
    let description = formInputValueCardName.value;
    const element = createElement(src, description);
    addElement(element);
}

//заполнение атрибутов попапа при клике на карточку
function openElementImg(src, description){
    popupImage.setAttribute('src', src);
    popupImage.setAttribute('alt', description);
    popupDescription.textContent = description;
}

//открытие попапа (редкактирование профиля) кликом по кнопке редактирования
profileEditButton.addEventListener('click', function(){
    popup = document.querySelector('.popup_usage_edit-profile');
    makePopupVisible(popup);
    openProfileEditForm();
});

//открытие попапа (добавления карточки) кликом по кнопке Добавить
addButton.addEventListener('click', function (){
    popup = document.querySelector('.popup_usage_add-new-place');
    makePopupVisible(popup);
    openAddElementForm();
})

//закрытие попапа (редактирование профиля) и сохранение изменений
submitEditForm.addEventListener('submit', editSubmit);

//закрытие попапа (добавление карточки) и сохранение изменений
submitAddForm.addEventListener('submit', addSubmit);

//закрытие попапа (редактирование профиля) без сохранения изменений кликом по кнопке закрытия
popupEditExitButton.addEventListener('click', closePopup);

//закрытие попапа (добавление карточки) без сохранения изменений кликом по кнопке закрытия
popupAddExitButton.addEventListener('click', closePopup);

//закрытие попапа с картинкой
popupImageExitButton.addEventListener('click', closePopup);

//создание карточек "из коробки" при загрузке страницы
renderElements();


