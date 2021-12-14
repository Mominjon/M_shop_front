// window.onscroll = function() {getSticky()};

// var titleBar = document.getElementById("title-bar");
// var sticky = titleBar.offsetTop;

// var statusBox = document.getElementById("status");
// var statusSticky = statusBox.offsetTop;

// function getSticky() {
//   if (window.pageYOffset >= sticky) {
//     titleBar.classList.add("sticky")
//   } else {
//     titleBar.classList.remove("sticky");
//   }
//   if (window.pageYOffset >= 100) {
//     statusBox.classList.add("stickyside")
//   } else {
//     statusBox.classList.remove("stickyside");
//   }
// }

n = new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("date").innerHTML = m + "/" + d + "/" + y;

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");



let box1 = document.querySelector(".box")
let box2 = document.querySelector(".box2")
let box3 = document.querySelector(".box3")
let box4 = document.querySelector(".box4")
let box5 = document.querySelector(".box5")

let button_1 = document.querySelector(".button_1")
let button_2 = document.querySelector(".button_2")
let button_3 = document.querySelector(".button_3")
let button_4 = document.querySelector(".button_4")
let button_5 = document.querySelector(".button_5")


button_1.addEventListener("click", () => {
    box1.classList.add("show")
    box2.classList.remove("show")
    box3.classList.remove("show")
    box4.classList.remove("show")
    box5.classList.remove("show")

    box1.classList.remove("hide")
    box2.classList.add("hide")
    box3.classList.add("hide")
    box4.classList.add("hide")
    box5.classList.add("hide")
})


button_4.addEventListener("click", () => {
    box4.classList.add("show")
    box2.classList.remove("show")
    box1.classList.remove("show")
    box3.classList.remove("show")
    box5.classList.remove("show")

    box4.classList.remove("hide")
    box2.classList.add("hide")
    box1.classList.add("hide")
    box3.classList.add("hide")
    box5.classList.add("hide")
})
button_5.addEventListener("click", () => {
    box5.classList.add("show")
    box2.classList.remove("show")
    box1.classList.remove("show")
    box4.classList.remove("show")
    box3.classList.remove("show")

    box5.classList.remove("hide")
    box2.classList.add("hide")
    box1.classList.add("hide")
    box4.classList.add("hide")
    box3.classList.add("hide")
})



const groupBtn = document.querySelector(".button_5")
window.addEventListener('load', (evt) => {
    evt.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "token": window.localStorage.getItem("token")
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("https://m-shop-001.herokuapp.com/users", requestOptions)
        .then(respone => respone.text())
        .then(datas => {
            let data = JSON.parse(datas)
            console.log(data)
            const groupTable = document.querySelector(".group__table")
            for (let i = 0; i < data.length; i++) {
                const tableList = document.createElement("tr")
                tableList.classList.add(".table__group__list")
                let tablelistItem__1 = document.createElement("td")
                let tablelistItem__2 = document.createElement("td")
                let tablelistItem__3 = document.createElement("td")
                let tablelistItem__4 = document.createElement("td")
                let tablelistItem__5 = document.createElement("td")

                tablelistItem__1.classList.add("table__item")
                tablelistItem__2.classList.add("table__item")
                tablelistItem__3.classList.add("table__item")
                tablelistItem__4.classList.add("table__item")
                tablelistItem__5.classList.add("table__item")

                tablelistItem__1.textContent = data[i].user_id
                tablelistItem__2.textContent = data[i].user_name
                tablelistItem__3.textContent = data[i].user_surname
                tablelistItem__4.textContent = data[i].user_password
                tablelistItem__5.textContent = data[i].role_user

                tableList.appendChild(tablelistItem__1)
                tableList.appendChild(tablelistItem__2)
                tableList.appendChild(tablelistItem__3)
                tableList.appendChild(tablelistItem__4)
                tableList.appendChild(tablelistItem__5)
                groupTable.appendChild(tableList)
            }
        })
})


let button_add_admin = document.querySelector(".send_admin")
let input_register_name = document.querySelector(".input_register_name")
let input_register_surname = document.querySelector(".input_register_surname")
let input_register_password = document.querySelector(".input_register_password")
let input_register_role = document.querySelector(".input_register_role")

button_add_admin.addEventListener("click", () => {
    document.querySelector(".loader").style.display = "block"
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": input_register_name.value,
        "surname": input_register_surname.value,
        "password": input_register_password.value,
        "role": "admin"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://m-shop-001.herokuapp.com/newuser", requestOptions)
        .then(response => response.text())
        .then(result => {
            document.querySelector(".loader").style.display = "none"
            console.log(result)
        })
        .catch(error => console.log('error', error));
})
let product_photo = document.querySelector(".product_photo")
let create_photo = ""

product_photo.addEventListener("change", (e) => {
    document.querySelector(".loader").style.display = "block"
    
    var formdata = new FormData();
    formdata.append("myImage", product_photo.files[0]);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://m-shop-001.herokuapp.com/upload_img", requestOptions)
        .then(response => response.text())
        .then(result => {
            create_photo = result
        document.querySelector(".loader").style.display = "none"

        })
        .catch(error => {
        document.querySelector(".loader").style.display = "none"

            alert(error)
        });
})


let button_add_product = document.querySelector(".button_add_product")
let product_name = document.querySelector(".product_name")
let product_text = document.querySelector(".product_text")

button_add_product.addEventListener("click", () => {
    document.querySelector(".loader").style.display = "block"

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "token": window.localStorage.getItem("token"),
      "product_name": product_name.value,
      "product_text": product_text.value,
      "product_photo": create_photo
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://m-shop-001.herokuapp.com/newproduct", requestOptions)
      .then(response => response.text())
      .then(result => {
        document.querySelector(".loader").style.display = "none"

      })
      .catch(error => console.log('error', error));
})