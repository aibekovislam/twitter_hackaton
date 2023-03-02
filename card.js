// ? API для запросов 
const API = "http://localhost:8000/cards"
//? cards наш контейнер куда мы добавляем post
const cards = document.querySelector("#cards")
// const post = document.querySelector(".post")
const inputText = document.querySelector("#text")
const addPost = document.querySelector(".tweet_btn")

//? инпуты и кнопка для модалки


//? input для поиска
const searchTwitter = document.querySelector("#search")
//? переменная по которой делаем запрос на поиск
let searchVal = ''; 

//? первоначальное отображение данных
//? первоначальный рендер, при загрузке стягиваем данные с сервера
getPosts();

async function getPosts(){
    const res = await fetch(`${API}?user_like=${searchVal}||text_like=${searchVal}`)
    const data = await res.json(); //? расшифровка данных
    // console.log(data);
    render(data);
}
//? добавление в db.json
async function addPost(post) {
    await fetch (API, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json",
        },
    });
    //? вызов для стягивания и отображения данных 
    getPosts();
}

function render(arr) {
    cards.innerHTML = "";
    arr.forEach((item) => {
        cards.innerHTML += `<div class="post_profile-image">
        <img src="images/page-profile-image.png" alt="java-logo" />
      </div>

      <div class="post_body">
        <div class="post_header">
          <div class="post_header-text">
            <h3>
              User123
              <span class="header-icon-section">
            </h3>
          </div>

          <div class="post_header-discription">
            <p>${item.text}</p>
          </div>
        </div>
        <br>
        <div class="post_footer">
          <span class="material-icons">chat</span>
          <span class="material-icons">repeat</span>
          <span class="material-icons">favorite_border</span>
          <span class="material-icons">file_upload</span>
        </div>
      </div>`
    })
}

addForm.addEventListener('click' (e) => {
    const post = {
        text: inputText.value,
    }
    addPost(post)
})






