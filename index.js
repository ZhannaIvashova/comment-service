const button = document.querySelector('.service__info-btn');
const inputName = document.getElementById('name');
const inputLink = document.getElementById('link');
const inputComment = document.getElementById('comment');
const serviceChat = document.querySelector('.service__chat');

userData = [
    inputName,
    inputComment
];

spamList = [
    /viagra/gi,
    /XXX/gi,
    /ХХХ/gi //русская раскладка
];


button.addEventListener('mouseover', () => {
    button.classList.toggle('cursor');
});


function checkSpam(item) {
    let userComment = item;
    for(let spam of spamList) {
        userComment = userComment.replace(spam, '***');
    }
    return userComment;
}


function checkInput() {
    
    let userName = '';
    let userComment = '';

    for(let data of userData) {
        let item = data.value.trim();
        
        //Проверка поля userName
        if (data === inputName) {
            if ((/^[a-zA-Z]+$/.test(item) || /^[а-яА-яёЁ]+$/.test(item)) == false) {
                return alert(`Поле ${data.name} должно состоять из букв (только латиница или кариллица)`);
            }
            userName = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
        };
        
        //Проверка поля userComment
        if (data === inputComment) {
            userComment = checkSpam(item);
        }
    };
    addData(userName, userComment);
}


function addData(userName, userComment) {
    //Новый тег с личной информацией
    const newElemIdentity = document.createElement('div');
    newElemIdentity.classList.add('service__chat-identity');

    //Новый тег для аватара
    const newElemAvatar = document.createElement('img');
    newElemAvatar.classList.add('service__chat-identity-avatar');
    newElemAvatar.src = inputLink.value;
    newElemAvatar.alt = 'img';
    
    //Новый тег для имени
    const newElemName = document.createElement('div');
    newElemName.classList.add('service__chat-identity-name');
    newElemName.textContent = userName;
    
    //Добавляю в тег с личной информацией детей: аватар, имя
    newElemIdentity.appendChild(newElemAvatar);
    newElemIdentity.appendChild(newElemName);

    //Новый тег для комментария
    const newElemComment = document.createElement('div');
    newElemComment.classList.add('service__chat-comment');
    newElemComment.textContent = userComment;

    //Новый тег для разделительной границы
    const newElemBorder = document.createElement('div');
    newElemBorder.classList.add('service__chat-border');

    //Добавляю в тег с чатом детей: личная информация, комментарий, граница
    serviceChat.appendChild(newElemIdentity);
    serviceChat.appendChild(newElemComment);
    serviceChat.appendChild(newElemBorder);
    
    inputName.value = '';
    inputLink.value = '';
    inputComment.value = '';
}

button.addEventListener('click', checkInput);


//Тестовые ссылки
// https://zloiprogramist1.github.io/images/cat2.jpg

// https://avatars.dzeninfra.ru/get-zen_doc/1626348/pub_5c6d4d8637874700af707bb7_5c6d4e65d1f38a00c7d10543/scale_1200

// https://chudo-prirody.com/uploads/posts/2021-08/thumbs/1628706202_166-p-milie-koti-foto-179.jpg