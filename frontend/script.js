
const home_url = "/home.html"
const frameworks_url = "/framework.html"

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

document.getElementById("SubmitContactButton").onclick = function() {
    window.location.href = "https://example.com";
    alert("Submit Contact button clicked!");
};

document.getElementById("TwitterIcon").onclick = TwitterRedirect;
document.getElementById("YouTubeIcon").onclick = YouTubeRedirect;
document.getElementById("DiscordIcon").onclick = DiscordRedirect;
document.getElementById("InstagramIcon").onclick = InstagramRedirect;

