const base_url = window.location.origin;
const userdb_url = base_url + '/api/users';

async function getUserData(given_password) {

    const userdata = await fetch(userdb_url, {
        method: "POST",
        body: JSON.stringify({ password:  given_password}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const result = await userdata.json();

    return result
}

function createTextElement(className, text, parent) {
    //Create text element
    const text_element = document.createElement("p");
    text_element.className = className;
    text_element.innerText = text;

    parent.appendChild(text_element)

    return text_element
}

function createButtonElement(className, text, parent) {
    //Create text element
    const button_element = document.createElement("p");
    button_element.className = className;
    button_element.innerText = text;

    parent.appendChild(button_element)

    return button_element
}

function createUserDataBlock(Catogory, Read, Name, Phone, Discord, Email, Message) {
    const UserDataHolder = document.getElementById("UserDataHolder");

    const UserDataBox = document.createElement("div");
    UserDataBox.id = Name;
    UserDataBox.className = "user_data_box";
    alert(Read);
    //Header
    createTextElement("user_data_text catogory", "Catogory: "+Catogory, UserDataBox);
    //Button
    createButtonElement("user_data_mark_read", toString(Read), UserDataBox);
    //Name
    createTextElement("user_data_text name", "Name:"+Name, UserDataBox);
    //Discord
    createTextElement("user_data_text phone", "Phone: "+Phone, UserDataBox);
    //Phone
    createTextElement("user_data_text discord", "Discord: "+Discord, UserDataBox);
    //Email
    createTextElement("user_data_text email", "Email: " + Email, UserDataBox);
    //Message
    createTextElement("user_data_text message", "Message:" + Message, UserDataBox);

    //Add the User Data box to the User data holder
    UserDataHolder.appendChild(UserDataBox);
}

//Set up login connections
const LoginB = document.getElementById("LoginB");
const PasswordInput = document.getElementById("PasswordBox");

LoginB.addEventListener("click", () => {
    getUserData(PasswordInput.value).then(user_data => {
        user_data.forEach(element => {
            createUserDataBlock(
                element.type,
                element.read,
                element.name,
                element.phone,
                element.discord,
                element.email,
                element.message
            );
        });
    });
})
