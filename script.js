let body = document.body;
let url = window.location.toString();
let nowDate = new Date();

let getUserName = (url) => {
let urlSeparation = url.split('=');
console.log(urlSeparation);
let userName = urlSeparation[1];
console.log(userName);
if (userName == undefined) {
userName = 'aaanastasiia';
}
return userName;
}
let name = getUserName(url);

let getNowDate = new Promise((resolve, reject) => {
setTimeout(() => nowDate ? resolve(nowDate) : reject('Текущее время не определено'), 3000);
});

let getUserInfo = fetch('https://api.github.com/users/' + name);


Promise.all([getUserInfo, getNowDate])
.then(([ourUserInfo, ourNowData]) => {
userInfo = ourUserInfo;
currentData = ourNowData;
})

.then(response => userInfo.json())
.then(json => {
if (json.message == "Not Found") {
let div = document.createElement('div');
document.body.appendChild(div);
div.innerText = "Пользователь не найден";
}

else {
let createName = () => {
let h1 = document.createElement('h1');
document.body.appendChild(h1);
h1.innerHTML = json.name;
}

let createBio = () => {
let div = document.createElement('div');
document.body.appendChild(div);
div.innerHTML = json.bio;
}

let createAvatar = () => {
let img = document.createElement('img');
document.body.appendChild(img);
img.src = json.avatar_url;
}

let createBioUrl = () => {
let a = document.createElement('a');
document.body.appendChild(a);
a.innerHTML = 'BIO URL'
a.href = json.html_url;
}

let createDate = () => {
let p = document.createElement('p');
document.body.appendChild(p);
p.innerHTML = currentData;
}

createName();
createBio();
createAvatar();
createBioUrl();
createDate();
}
let preloader = document.getElementById('preloader');
preloader.style.display = 'none'
})

.catch(err => alert(err + 'Ошибка сервера'));
