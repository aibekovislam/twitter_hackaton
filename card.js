const API = 'http://localhost:8000/cards';


const tweetBtn = document.querySelector("#tweetBtn");
const tweetInput = document.querySelector("#text");
const list = document.querySelector(".list");
const mainForm = document.querySelector("#add-form");
const srcImg = document.querySelector(".imgSrc");
const imgInput = document.querySelector("#imgInput")
getCards();

async function getCards() {
  const res = await fetch(API);
  const data = await res.json();
  render(data)
}

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

function render(arr) {
  list.innerHTML = '';
  arr.forEach((item) => {
    list.innerHTML += `
    <div class="post">
      <div class="post_profile-image">
        <img src="images/page-profile-image.png" alt="java-logo" />
      </div>
          <div class="post_body">
            <div class="post_header">
              <div class="post_header-text">
                <h3>
                  Java
                  <span class="header-icon-section">
                    <span class="material-icons post_badge">verified</span>@java
                  </span>
                  
                </h3>
              </div>

              <div class="post_header-discription">
                <p>
                  ${item.text}
                </p>
              </div>
            </div>
            <img src="./images/${item.img}" alt="java18" />

            <div class="post_footer">
              <span class="material-icons">chat</span>
              <span class="material-icons">repeat</span>
              <span class="material-icons">favorite_border</span>
              <span class="material-icons">file_upload</span>
            </div>
          </div>
        </div>
    </div>
    `
  })
}


mainForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if(!tweetInput.value.trim()) {
    alert("Need TWEEEEET!");
    return;
  };
  const post = {
    text: tweetInput.value,
    img: imgInput.files[0].name
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
})