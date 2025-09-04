
const home_url = "/home.html"
const frameworks_url = "/framework.html"

const contact_api_url = "/api/contact"
const purchase_api_url = ""

function exit( status ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // +      input by: Paul
    // +   bugfixed by: Hyam Singer (http://www.impact-computing.com/)
    // +   improved by: Philip Peterson
    // +   bugfixed by: Brett Zamir (http://brettz9.blogspot.com)
    // %        note 1: Should be considered expirimental. Please comment on this function.
    // *     example 1: exit();
    // *     returns 1: null

    var i;

    if (typeof status === 'string') {
        alert(status);
    }

    window.addEventListener('error', function (e) {e.preventDefault();e.stopPropagation();}, false);

    var handlers = [
        'copy', 'cut', 'paste',
        'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
        'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
        'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
    ];

    function stopPropagation (e) {
        e.stopPropagation();
        // e.preventDefault(); // Stop for the form controls, etc., too?
    }
    for (i=0; i < handlers.length; i++) {
        window.addEventListener(handlers[i], function (e) {stopPropagation(e);}, true);
    }

    if (window.stop) {
        window.stop();
    }

    throw '';
}


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

let cart = []

function AddToCartButtonClick(item_name) {
    return function() {
        alert('Added to cart!');
        cart.splice(0, 0, item_name);
        alert(cart);    
    }
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

let add_to_cart_b = document.querySelectorAll(".framework_box_add_to_cart");

add_to_cart_b.forEach(function(elem) {
    elem.addEventListener("click", AddToCartButtonClick);
});


document.getElementById("TwitterIcon").onclick = TwitterRedirect;
document.getElementById("YouTubeIcon").onclick = YouTubeRedirect;
document.getElementById("DiscordIcon").onclick = DiscordRedirect;
document.getElementById("InstagramIcon").onclick = InstagramRedirect;