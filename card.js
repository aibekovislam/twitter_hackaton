const API = 'http://localhost:8000/cards';


const tweetBtn = document.querySelector("#tweetBtn");
const tweetInput = document.querySelector("#text");
const list = document.querySelector(".list");
const mainForm = document.querySelector("#add-form");
const srcImg = document.querySelector(".imgSrc");
const imgInput = document.querySelector("#imgInput");

const editText = document.querySelector("#edit-text");
const saveBtn = document.querySelector("#btn-save-edit");

let searchVal = '';
const searchInp = document.querySelector("#search");

const paginationList = document.querySelector('.pagination-list');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const limit = 10;

let currentPage = 1;

let pageTotalCount = 1;

// let currentPage = 1;
getCards();

async function getCards() {
  const res = await fetch(`${API}?text_like=${searchVal}&_limit=${limit}&_page=${currentPage}`);
  const count = res.headers.get('x-total-count');
  pageTotalCount = Math.ceil(count / limit);
  const data = await res.json();
  const orderedData = data.reverse();
  render(orderedData)
}

async function getOneTweet(id) {
  const res = await fetch(`${API}/${id}`)
  const data = await res.json()
  return data;
};

async function editProduct(id, editedTweet) {
  await fetch(`${API}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(editedTweet),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  getCards()
};

async function addPost(post) {
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  getCards();
}

async function deleteTweet(id) {
  await fetch(`${API}/${id}`, {
    method: 'DELETE'
  })
  getCards()
}

function render(arr) {
  list.innerHTML = '';
  arr.forEach((item) => {
    list.innerHTML += `
    <div class="post">
      <div class="post_profile-image">
        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="logo" />
      </div>
          <div class="post_body">
            <div class="post_header">
              <div class="post_header-text">
                <h3>
                  User
                  <span class="header-icon-section">
                    @anonymous
                  </span>
                </h3>
                <div class="dropdown mx-5">
                  <button class="btn btnModal dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  •••
                  </button>
                  <ul class="dropdown-menu">
                    <li><a id="${item.id}" class="dropdown-item text-danger btn-delete" href="#">Delete</a></li>
                    <li"><a class="dropdown-item btn-edit" data-bs-target="#exampleModal" data-bs-toggle="modal" id="${item.id}" href="#">Edit</a></li>
                  </ul>
              </div>
              </div>

              <div class="post_header-discription">
                <p>
                  ${item.text}
                </p>
              </div>
            </div>
          
            <img src="./images/${item.img}" alt="" />

            <div class="post_footer">
              <span id="icon_retweet" class="material-icons">repeat</span>
              <span id="${item.id}" class="material-icons liked">favorite_border</span>
            </div>
          </div>
        </div>
    </div>
    `
  });
  renderPagination()
}


mainForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // if(!tweetInput.value.trim() || !imgInput.) {
  //   alert("Need TWEEEEET!");
  //   return;
  // };
  const post = {
    text: tweetInput.value,
  };
  if(imgInput.files[0] != undefined) {
    post.img = imgInput.files[0].name
  };
  addPost(post);
  tweetInput.value = ''; 
  srcImg.innerHTML = '';
});



function renderImg() {
  let res = imgInput.files[0].name;
  return res;
}

function waitImg() {
  srcImg.innerHTML += `
    <img src="./images/${renderImg()}">
  `
};

imgInput.addEventListener('change', (e) => {
  waitImg();
});

document.addEventListener('click', (e) => {
  if(e.target.classList.contains('btn-delete')) {
      deleteTweet(e.target.id);
  };
});

document.addEventListener('click', (e) => {
  count = 0;
  if(e.target.classList.contains('liked')) {
      console.log(e.target.textContent += `${count+1}`)
  };
});


searchInp.addEventListener('input', () => {
  searchVal = searchInp.value;
  currentPage = 1;
  getCards();
});

let id = null;
document.addEventListener("click", async (e) => {
  if(e.target.classList.contains('btn-edit')) {
      id = e.target.id;
      const tweet = await getOneTweet(e.target.id);

      editText.value = tweet.text;
  }
})

saveBtn.addEventListener('click', (e) => {
  if(
      !editText.value.trim()
  ) {
      alert("Заполните все поля");
      return;
  };
  const editedTweet = {
      text: editText.value,
  }
  editProduct(id, editedTweet)
});

function renderPagination() {
	paginationList.innerHTML = '';
	for (let i = 1; i <= pageTotalCount; i++) {
		paginationList.innerHTML += `
			<li class="page-item ${currentPage == i ? 'active' : ''}">
				<button class="page-link page_number">${i}</button>
			</li>`;
	}

	//? чтобы кропка prev была неактивна на первой странице
	if (currentPage == 1) {
		prev.classList.add('disabled');
	} else {
		prev.classList.remove('disabled');
	}
	//? чтобы кропка next была неактивна на последней странице
	if (currentPage == pageTotalCount) {
		next.classList.add('disabled');
	} else {
		next.classList.remove('disabled');
	}
}


document.addEventListener('click', (e) => {
	if (e.target.classList.contains('page_number')) {
		currentPage = e.target.innerText;
		getCards();
	}
});

//? обработчик события чтобы перейти на следующую страницу
next.addEventListener('click', () => {
	if (currentPage == pageTotalCount) {
		return;
	}
	currentPage++;
	getCards();
});

//? обработчик события чтобы перейти на предыдущую страницу
prev.addEventListener('click', () => {
	if (currentPage == 1) {
		return;
	}
	currentPage--;
	getCards();
});