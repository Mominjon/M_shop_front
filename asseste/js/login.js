let login_button = document.querySelector(".login_button")
let login_username = document.querySelector(".login-username")
let password_username = document.querySelector(".password-username")

login_button.addEventListener("click", () => {
    document.querySelector(".loader").style.display = "block"
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": login_username.value,
        "userpassword": password_username.value
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://m-shop-001.herokuapp.com/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result == "user not faund") {
                document.querySelector(".loader").style.display = "none"
                alert("user not faund")
            }else {
                console.log(result)
                window.localStorage.setItem("token", result[0])
                if(result[1] != null){
                    window.location = "admin.html"
                }else {
                    window.location = "index.html"
                }
                // window.location = "index.html"
            }
        })
        .catch(error => console.log('error', error));
})
let input_username_register = document.querySelector(".input_username_register")
let input_surname_register = document.querySelector(".input_surname_register")
let input_password_register = document.querySelector(".input_password_register")
let button_register = document.querySelector(".button_register")

button_register.addEventListener("click", () => {
    document.querySelector(".loader").style.display = "block"
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": input_username_register.value,
        "surname": input_surname_register.value,
        "password": input_password_register.value,
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
            window.localStorage.setItem("token", result)
            window.location = "/index.html"
        })
        .catch(error => console.log('error', error));
})