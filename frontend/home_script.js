const contact_api_url = "/api/contact"
const purchase_api_url = "/api/purchase"


//Elements
const message_input = document.getElementById('MessageInput')
const name_input = document.getElementById('NameInput')
const email_input = document.getElementById('EmailInput')
const discord_input = document.getElementById('DiscordInput')
const phone_number_input = document.getElementById('PhoneInput')

const hoverUrls = {}



function ContactButtonClick() {
    document.getElementById("ContactSection").scrollIntoView({ behavior: 'smooth' });
}

function DevTeamButtonClick() {
    document.getElementById("TeamSection").scrollIntoView({ behavior: 'smooth' });
}

function FrameworksButtonClick() {
    window.location.replace(frameworks_url)
}

function GamesButtonClick() {
    document.getElementById("GamesSection").scrollIntoView({ behavior: 'smooth' });
}

function SubmitButtonClick() {
    alert('your current message is ' + message_input.value)
    
    const url = window.location.origin + contact_api_url
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "name" : name_input.value,
            "email" : email_input.value,
            "phone" : phone_number_input.value,
            "discord" : discord_input.value,
            "message" : message_input.value,
            "type" : "contact"
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}

// Assign the functions to the buttons

document.getElementById("DevTeamButton").onclick = DevTeamButtonClick;

document.getElementById("FrameworksButton").onclick = FrameworksButtonClick;
document.getElementById("MenuFrameworkButton").onclick = FrameworksButtonClick;
document.getElementById("GamesButton").onclick = GamesButtonClick;

document.getElementById("SubmitContactButton").onclick = SubmitButtonClick;
