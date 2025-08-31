
const home_url = "/home.html"
const frameworks_url = "/framework.html"

const contact_api_url = "/api/contact"
const purchase_api_url = ""


//Elements
const message_input = document.getElementById('MessageInput')
const name_input = document.getElementById('NameInput')
const email_input = document.getElementById('EmailInput')
const discord_input = document.getElementById('DiscordInput')
const phone_number_input = document.getElementById('PhoneInput')

function HomeButtonClick() {
    if (window.location.pathname !== home_url) {
        window.location.replace(home_url)
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

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
    alert(url)
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

//Social Media redirects
function TwitterRedirect() {
    window.open("https://twitter.com/RedPaintGames", "_blank");
}

function YouTubeRedirect() {
    window.open("InstagramIcon", "_blank");
}

function DiscordRedirect() {
    window.open("https://discord.gg/wHB59j9Z3H", "_blank");
}

function InstagramRedirect() {
    window.open("https://www.instagram.com/redpaintgames/", "_blank");
}

// Assign the functions to the buttons

document.getElementById("HomeButton").onclick = HomeButtonClick;

document.getElementById("ContactButton").onclick = ContactButtonClick;

document.getElementById("DevTeamButton").onclick = DevTeamButtonClick;

document.getElementById("FrameworksButton").onclick = FrameworksButtonClick;

document.getElementById("GamesButton").onclick = GamesButtonClick;

document.getElementById("SubmitContactButton").onclick = SubmitButtonClick;

document.getElementById("TwitterIcon").onclick = TwitterRedirect;
document.getElementById("YouTubeIcon").onclick = YouTubeRedirect;
document.getElementById("DiscordIcon").onclick = DiscordRedirect;
document.getElementById("InstagramIcon").onclick = InstagramRedirect;

