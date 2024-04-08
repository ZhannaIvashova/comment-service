const button = document.querySelector('.service__info-btn');
const radioBtnYes = document.getElementById('radioBtnYes');
const radioBtnNo = document.getElementById('radioBtnNo');
const serviceInfoName = document.querySelector('.service__info-name');
const inputName = document.getElementById('name');
const inputLink = document.getElementById('link');
const inputComment = document.getElementById('comment');
const serviceChat = document.querySelector('.service__chat');


const spamList = [
    /viagra/gi,
    /XXX/gi,
    /ХХХ/gi //русская раскладка
];

const avatarList = [
    './assets/images/default-img-1.jpg',
    './assets/images/default-img-2.jpg',
    './assets/images/default-img-3.jpg',
    './assets/images/default-img-4.jpg',
    './assets/images/default-img-5.jpg',
    './assets/images/default-img-6.jpg',
]


button.addEventListener('mouseover', () => button.classList.toggle('cursor'));

radioBtnNo.addEventListener('click', () => serviceInfoName.classList.add('display'));
radioBtnYes.addEventListener('click', () => serviceInfoName.classList.remove('display'));


//Функция проверяет время на наличие первого символа '0' и добавляет его если нужно
timeWithLeadingZero = (number) => number < 10 ? '0' + number : number;

//Текущая дата и время
function currentDateTime() {
    let currentDate = new Date();

    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDateofMonth = currentDate.getDate();

    let currentHours = timeWithLeadingZero(currentDate.getHours());
    let currentMinutes = timeWithLeadingZero(currentDate.getMinutes());
    let currentSeconds = timeWithLeadingZero(currentDate.getSeconds());

    return `${currentYear}/${currentMonth}/${currentDateofMonth} ${currentHours}:${currentMinutes}:${currentSeconds}`;
}

//Валидация имени
function validationName(userName) {
    let isValidUserName = /^[a-zA-Z]+$/.test(userName) || /^[а-яА-яёЁ]+$/.test(userName);
    if (!isValidUserName) {
        alert(`1. Имя должно состоять из букв (только латиница или кириллица) \n2. Также вы можете скрыть свое имя`);
        return false;
    }
    return true;
}

//Перевод первого символа в верхний регистр, в случае, если значение существует
function checkName(userName) {
    if (validationName(userName)) {
        userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
    } else {
        return false
    }
    return userName
}

//Получение имени пользователя
function getUserName() {
    if (serviceInfoName.classList.contains('display')) {
        return 'Username';
    } else {
        return checkName(inputName.value.trim());
    }
}

//Проверка на спам
function checkSpam(userComment) {
    for(let spam of spamList) {
        userComment = userComment.replace(spam, '***');
    }
    return userComment;
}

//Присвоение дефолтного аватара
function defaultAvatar() {
    numberIndex = Math.floor(Math.random() * avatarList.length);
    return avatarList[numberIndex];
}


function addData() {
    let userName = getUserName();
    if (userName === false) return;

    let userComment = checkSpam(inputComment.value.trim());

    let userAvatar = inputLink.value;
    if (!inputLink.value) {
        userAvatar = defaultAvatar();
    }

    //Новый тег с общей информацией
    const newElemInfo = document.createElement('div');
    newElemInfo.classList.add('service__chat-info');

    //Новый тег с личной информацией
    const newElemIdentity = document.createElement('div');
    newElemIdentity.classList.add('service__chat-identity');

    //Новый тег для аватара
    const newElemAvatar = document.createElement('img');
    newElemAvatar.classList.add('service__chat-identity-avatar');
    newElemAvatar.src = userAvatar;
    newElemAvatar.alt = 'img';
    
    //Новый тег для имени
    const newElemName = document.createElement('div');
    newElemName.classList.add('service__chat-identity-name');
    newElemName.textContent = userName;
    
    //Новый тег для даты
    const newElemDate = document.createElement('div');
    newElemDate.classList.add('service__chat-date');
    newElemDate.textContent = currentDateTime();

    //Добавляю в тег с личной информацией детей: аватар, имя
    newElemIdentity.appendChild(newElemAvatar);
    newElemIdentity.appendChild(newElemName);

    //Добавляю в тег с информацией детей: личная информация, дата
    newElemInfo.appendChild(newElemIdentity);
    newElemInfo.appendChild(newElemDate);

    //Новый тег для комментария
    const newElemComment = document.createElement('div');
    newElemComment.classList.add('service__chat-comment');
    newElemComment.textContent = userComment;

    //Новый тег для разделительной границы
    const newElemBorder = document.createElement('div');
    newElemBorder.classList.add('service__chat-border');

    //Добавляю в тег с чатом детей: информация, комментарий, граница
    serviceChat.appendChild(newElemInfo);
    serviceChat.appendChild(newElemComment);
    serviceChat.appendChild(newElemBorder);
    
    serviceInfoName.classList.remove('display');
    radioBtnYes.checked = true;
    inputName.value = '';
    inputLink.value = '';
    inputComment.value = '';
}


button.addEventListener('click', addData);


//Тестовые ссылки
// https://zloiprogramist1.github.io/images/cat2.jpg

// https://avatars.dzeninfra.ru/get-zen_doc/1626348/pub_5c6d4d8637874700af707bb7_5c6d4e65d1f38a00c7d10543/scale_1200

// https://chudo-prirody.com/uploads/posts/2021-08/thumbs/1628706202_166-p-milie-koti-foto-179.jpg