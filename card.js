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


const pagination = document.querySelector("#search")
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")
const limit = 10;
//? текущая страница
// let currentPage = 1;
//? max num of pages
let pageTotalCount = 1;

getPosts();



async function getPosts(){
    const res = await fetch(`${API}?user_like=${searchVal}||text_like=${searchVal}&_limit=${limit}&_page=${currentPage}`)

    const count = res.headers.get('x-total-count')
    // console.log(count);
    pageTotalCount = Math.ceil(count / limit)
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
    renderPagination()
}



window.onscroll = function() {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop; // Получаем положение скролла
    if(scrolled !== 0){
      // Если прокрутка есть, то делаем блок прозрачным
      document.querySelector('.header').style.opacity = '0.5';
    }else{
      // Если нет, то делаем его полностью видимым
      document.querySelector('.header').style.opacity = '1';
    };
  };

searchTwitter.addEventListener('input', () => {
    searchVal = searchInput.value;
    currentPage = 1;
    getPosts();
})

//? отображение кнопок пагинации 

function renderPagination() {
    paginationList.innerHTML = "";
    for(let i = 1; i < pageTotalCount; i++){
        
    }
}

let currentPage = 1;
let totalItems = 0;
let totalPages = 0;

const listContainer = document.querySelector('.list');
const paginationContainer = document.querySelector('.pagination');

function getItems(page) {
	const start = (page - 1) * limit;
	const end = start + limit;

	fetch(`${API}/items?_start=${start}&_end=${end}`)
		.then(response => response.json())
		.then(items => {
			displayItems(items);
			updatePagination();
		})
		.catch(error => console.log(error));
}

function displayItems(items) {
	listContainer.innerHTML = '';

	items.forEach(item => {
		const li = document.createElement('li');
		li.innerText = item.name;
		listContainer.appendChild(li);
	});
}

function updatePagination() {
	paginationContainer.innerHTML = '';

	for (let i = 1; i <= totalPages; i++) {
		const button = document.createElement('button');
		button.innerText = i;
		button.addEventListener('click', () => {
			currentPage = i;
			getItems(currentPage);
		});

		if (i === currentPage) {
			button.disabled = true;
		}

		paginationContainer.appendChild(button);
	}
}

fetch(`${API}/items`)
	.then(response => {
		totalItems = response.headers.get('X-Total-Count');
		totalPages = Math.ceil(totalItems / limit);
		getItems(currentPage);
	})
  .catch(error => console.log(error));