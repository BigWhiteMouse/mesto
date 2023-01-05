const profileEditButton = document.querySelector('.profile__edit-button');
const profileOwner = document.querySelector('.profile__owner');
const profileDescription = document.querySelector('.profile__description');
const formInputValueName = document.querySelector('.form__input_value_name');
const formInputValueDescription = document.querySelector('.form__input_value_description');
const popupExitButton = document.querySelector('.popup__exit-button');
const submitForm  = document.querySelector('.form');
const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('.element__template').content.querySelector('.element');
const popupHeader = document.querySelector('.popup__header');
let eventTarget;
const addButton = document.querySelector('.profile__add-button');
const formSubmitButton = document.querySelector('.form__submit-button');
const popupImage = document.querySelector('.popup__img');
const popupDescription = document.querySelector('.popup__description');
let popup;
const popupUsageImage = document.querySelector('.popup_usage_image');
const popupImageExitButton = popupUsageImage.querySelector('.popup__exit-button');

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

//сохранение изменений
function submit(event){
    event.preventDefault();
    closePopup();
    if (eventTarget === 'profile__edit-button'){
        submitProfileEditForm();
    }
    else if (eventTarget === 'profile__add-button'){
        submitAddElementForm();
    }
}

//заполнение атрибутов попапа при открытии формы редактирования профиля
function openProfileEditForm(){
    formInputValueName.value = profileOwner.textContent;
    formInputValueDescription.value = profileDescription.textContent;
    popupHeader.textContent = 'Редактировать профиль';
    formSubmitButton.textContent = 'Сохранить';
}

//сохранение изменений в форме редактирования профиля
function submitProfileEditForm(){
    profileOwner.textContent = formInputValueName.value;
    profileDescription.textContent = formInputValueDescription.value;
}

//заполнение атрибутов попапа при открытии формы добавления карточки с картинкой
function openAddElementForm(){
    formInputValueName.value = 'Название';
    formInputValueDescription.value = 'Ссылка на картинку';
    popupHeader.textContent = 'Новое место';
    formSubmitButton.textContent = 'Создать';
}

//сохранение изменений в форме добавления карточки на страницу
function submitAddElementForm(){
    let src =  formInputValueDescription.value;
    let description = formInputValueName.value;
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
profileEditButton.addEventListener('click', function(event){
    popup = document.querySelector('.popup_usage_form');
    makePopupVisible(popup);
    openProfileEditForm();
    eventTarget = event.target.className;
});

//открытие попапа (добавления карточки) кликом по кнопке Добавить
addButton.addEventListener('click', function (event){
    popup = document.querySelector('.popup_usage_form');
    makePopupVisible(popup);
    openAddElementForm();
    eventTarget = event.target.className;
})

//закрытие попапа и сохранение изменений
submitForm.addEventListener('submit', submit);

//закрытие попапа без сохранения изменений кликом по кнопке закрытия
popupExitButton.addEventListener('click', closePopup);

//закрытие попапа с картинкой
popupImageExitButton.addEventListener('click', closePopup);

//создание карточек "из коробки" при загрузке страницы
renderElements();


