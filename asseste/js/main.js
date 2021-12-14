//設定變數
//設定 URL 變數
const base_URL = 'https://movie-list.alphacamp.io'
const index_URL = base_URL + '/api/v1/movies/'
const poster_URL = base_URL + '/posters/'
//MOvies資料變數
const dataPanel = document.querySelector('#data-panel')
const movies = []
//篩選Movies資料變數
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
let filteredMovies = []
//Movies分頁變數
const paginator = document.querySelector('#paginator')
const MOVIES_PER_PAGE = 12
let pageNumber = 1
//Change Mode變數
const changeMode = document.querySelector('#change-mode')
let mode = 'cardmode'

window.onload = () => {
    fetch("https://m-shop-001.herokuapp.com/allproduct", {
        method: "GET"
    }).then(response => response.json()).then(res => renderMovieList(res))
}

function renderMovieList(data) {
  let rawHTML = ''
  if (mode === 'cardmode') {
    data.forEach((item) => {
      rawHTML +=
        ` <div class="col-sm-3">
          <div class="mb-2">
            <div class="card">
              <img src="${item.product_photo}" class="card-img-top" alt="Movie Poster">
              <div class="card-body">
                <h5 class="card-title">${item.product_name}</h5>
                <p>${item.product_text}</p>
              </div>
              <div class="card-footer">
                <button class="btn btn-primary btn-show-movie" data-toggle="modal"
                  data-target="#movie-modal" data-id="${item.product_id}">More</button>
                <button class="btn btn-info btn-add-favorite" data-id="${item.product_id}">${item.product_like} like</button>
              </div>
            </div>
          </div>
        </div>
        `
    })
  }
  if (mode === 'listmode') {
    rawHTML += `
      <ul class="list-group" style="width: 100rem"> 
      `
    data.forEach((item) => {
      rawHTML += `
      <li class="list-group-item d-flex justify-content-between">${item.product_text}
        <div class="button">
          <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal"
            data-id="${item.product_id}">More</button>
          <button class="btn btn-info btn-add-favorite" data-id="${item.product_id}"><img src="./asseste/images/like.png" alt=""></button>
        </div>
      </li>    
      `
    })
    rawHTML += `</ul>`
  }
  dataPanel.innerHTML = rawHTML
}

//Function for Madal
function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-decription')

  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "product_id": id
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://m-shop-001.herokuapp.com/oneproduct", requestOptions)
  .then(response => response.json())
  .then(result => {
    const data = result
    console.log(data)
    modalTitle.innerText = data.product_name
    modalImage.innerHTML = `<img src="${data.product_photo}" alt="movie-poster" class="img-fluid">`
    modalDescription.innerText = data.product_text
  })
  .catch(error => console.log('error', error));
}

//Function for Favorite
function addToFavorite(id) {
  document.querySelector(".loader").style.display = "block"
  console.log("ok")
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "product_id": id
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://m-shop-001.herokuapp.com/likes", requestOptions)
    .then(response => response.text())
    .then(result => {
    document.querySelector(".loader").style.display = "none"
      console.log(result)
      window.location.reload()
    })
    .catch(error => console.log('error', error));
}

//Function for Pagination
//渲染分頁頁碼
function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  let rawHTML = ''

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}"> ${page} </a></li>`
  }
  paginator.innerHTML = rawHTML
}


dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    console.log(event.target.dataset)
    showMovieModal(Number(event.target.dataset.id))
  }
  else if (event.target.matches('.btn-add-favorite')) {
    addToFavorite(Number(event.target.dataset.id))
  }
})
