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
                <button class="btn btn-info btn-add-favorite" data-id="${item.product_id}">+</button>
                <button class="btn btn-info btn-add-edit button_edits" data-id="${item.product_id}">edit</button>
                <button class="btn btn-info btn-add-delete button_edits" data-id="${item.product_id}">DELETE</button>
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
          <button class="btn btn-info btn-add-favorite" data-id="${item.product_id}">+</button>
          <button class="btn btn-edit btn-add-edit" data-id="${item.product_id}">edit</button>
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
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
    const movie = movies.find((movie) => movie.id === id)
    // function isMovieIdMatched(movie) {
    //   return movie.id === id
    // }

    if (list.some((movie) => movie.id === id)) {
        return alert('The movie is already in favorite list.')
    }
    list.push(movie)
    localStorage.setItem('favoriteMovies', JSON.stringify(list))
    // const jsonString = JSON.stringify(list)
    // console.log('json string:', jsonString)
    // console.log('json object: ', JSON.parse(jsonString))
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
let modal_body = document.querySelector(".edit-modal")
let img_edit_img = document.querySelector(".product_edit_img")
let title_edit_input = document.querySelector(".title_edit_input")
let body_edit_input = document.querySelector(".body_edit_input")
let button_summbit_edit = document.querySelector(".button_summbit_edit")
let edit_poto = ""

function edit_button(id) {
    modal_body.classList.add("show")
    modal_body.classList.remove("hide")
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
    button_summbit_edit.dataset.id = id
    fetch("https://m-shop-001.herokuapp.com/oneproduct", requestOptions)
        .then(response => response.json())
        .then(result => {
            const data = result
            edit_poto = data.product_photo
            title_edit_input.value = data.product_name
            body_edit_input.value = data.product_text
            img_edit_img.src = data.product_photo
        })
        .catch(error => console.log('error', error));

}
let delete_modal = document.querySelector(".delete_modal")

function deleteModal(id) {
    delete_modal.classList.add("show")
    delete_modal.classList.remove("hide")
    document.querySelector(".tastiqlash_delete").dataset.id = id
}
dataPanel.addEventListener('click', function onPanelClicked(event) {
    if (event.target.matches('.btn-show-movie')) {
        console.log(event.target.dataset)
        showMovieModal(Number(event.target.dataset.id))
    } else if (event.target.matches('.btn-add-favorite')) {
        addToFavorite(Number(event.target.dataset.id))
    } else if (event.target.matches('.btn-add-edit')) {
        edit_button(Number(event.target.dataset.id))
    }else if (event.target.matches('.btn-add-delete')){
        deleteModal(Number(event.target.dataset.id))
    }
})

let close_edit_button = document.querySelector(".close_edit_button")
let modal_delete = document.querySelector(".close_modal_delete")
close_edit_button.addEventListener("click", () => {
    modal_body.classList.remove("show")
    modal_body.classList.add("hide")
})

modal_delete.addEventListener("click", () => {
    delete_modal.classList.remove("show")
    delete_modal.classList.add("hide")
})

let photo_input_change = document.querySelector(".img_edit_input")
photo_input_change.addEventListener("change", (e) => {
    
    console.log(photo_input_change.files[0])
    var formdata = new FormData();
    formdata.append("myImage", photo_input_change.files[0]);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://oquvmarkazi.herokuapp.com/upload_img", requestOptions)
        .then(response => response.text())
        .then(result => {
            edit_poto = result
        })
        .catch(error => console.log('error', error));
})
let delete_001 = document.querySelector(".tastiqlash_delete")

delete_001.addEventListener("click", (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    document.querySelector(".loader").style.display = "block"

    var raw = JSON.stringify({
        "product_id": e.target.dataset.id
    });
    console.log(e.target.dataset.id)
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://m-shop-001.herokuapp.com/delete", requestOptions)
        .then(response => response.text())
        .then(result => {
            if(result == "ok"){
                document.querySelector(".loader").style.display = "none"
                window.location.reload()
            }
        })
        .catch(error => console.log('error', error));
})
button_summbit_edit.addEventListener("click", (e) => {
    document.querySelector(".loader").style.display = "block"

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "token": window.localStorage.getItem("token"),
        "product_name": title_edit_input.value,
        "product_text": body_edit_input.value,
        "product_photo": edit_poto,
        "product_id": e.target.dataset.id
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://m-shop-001.herokuapp.com/updateproduct", requestOptions)
        .then(response => response.text())
        .then(result => {
            if(result == "ok"){
                document.querySelector(".loader").style.display = "none"
                window.location.reload()
            }
        })
        .catch(error => console.log('error', error));
})