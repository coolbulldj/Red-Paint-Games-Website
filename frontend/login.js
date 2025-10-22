const PasswordElem = document.getElementById("password_input");
const UsernameElem = document.getElementById("username_input");
const MainB = document.getElementById("main_b");
const SubB = document.getElementById("sub_b");
const NoteLabel = document.getElementById("notification_label")

let SignInPage = true

function AttemptSignIn() {
    if (!UsernameElem.value) {
       NoteLabel.innerHTML = "Provide username"
       return
    }

    if (!PasswordElem.value) {
        NoteLabel.innerHTML = "Provide password"
        return
    }
}

function DisplaySignIn() {
    MainB.innerHTML = "Sign In"
    SubB.innerHTML = "Don't have an account	‍<mark class = 'red_mark'> Sign Up Now</mark>"
    NoteLabel.innerHTML = ""
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

MainB.onclick = AttemptSignIn;
SubB.onclick = SubBPress;