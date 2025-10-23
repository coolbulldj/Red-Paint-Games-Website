const PasswordElem = document.getElementById("password_input");
const UsernameElem = document.getElementById("username_input");
const MainB = document.getElementById("main_b");
const SubB = document.getElementById("sub_b");
const NoteLabel = document.getElementById("notification_label")

const verfiyLoginUrl = '/api/verify_login'

const home_url = '/home.html'



let SignInPage = true

function verifyLogin() {
    const url = window.location.origin + verfiyLoginUrl
    
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "password" : PasswordElem.value,
            "username" :UsernameElem.value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.text())
    .then(text => {
        if (!text) {
            sessionStorage.setItem("username", UsernameElem.value)
            sessionStorage.setItem("password", PasswordElem.value)
            window.location.replace(home_url)
        }
        NoteLabel.innerHTML = text
    })
    .catch(err => {
        NoteLabel.innerHTML = "Login error: " + err.message;
    });
}

function AttemptSignIn() {
    if (!UsernameElem.value) {
       NoteLabel.innerHTML = "Provide username"
       return
    }

    if (!PasswordElem.value) {
        NoteLabel.innerHTML = "Provide password"
        return
    }
    NoteLabel.innerHTML = ""
    //alert("fdfas")
    verifyLogin()
}

function DisplaySignIn() {
    MainB.innerHTML = "Sign In"
    SubB.innerHTML = "Don't have an account	‍<mark class = 'red_mark'> Sign Up Now</mark>"
    NoteLabel.innerHTML = ""
    MainB.onclick = AttemptSignIn;
}

function DisplayCreateAcc () {
    MainB.innerHTML = "Create Account"
    SubB.innerHTML = "Have an account	‍<mark class = 'red_mark'> Sign In</mark>"
    NoteLabel.innerHTML = ""
}

function SubBPress() {
    if (SignInPage) {
        DisplayCreateAcc()
    } else {
        DisplaySignIn()
    }
    SignInPage = !SignInPage
}

SubB.onclick = SubBPress;