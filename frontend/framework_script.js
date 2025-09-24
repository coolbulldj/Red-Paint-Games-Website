
const home_url = "/home.html"
const frameworks_url = "/framework.html"

const contact_api_url = "/api/contact"
const purchase_api_url = ""

const AddCartBColors = {
    [true] : "#262626ff",
    [false] : "#3a3a3aff"
}

const AddCartBText = {
    [true] : "Remove from cart",
    [false] : "Add to Cart!"    
}

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

function AddCheckoutElement(item_name) {
    const checkout_list = document.getElementById("CheckoutList");

    const checkout_framework = document.createElement("div");
    checkout_framework.id = item_name+"_checkout_item";
    checkout_framework.className = "checkout_cart_item";

    const framework_name = document.createElement("p");
    framework_name.className = "checkout_cart_item_name";
    framework_name.innerText = item_name;

    const remove_button = document.createElement("button");
    remove_button.className = "framework_box_add_to_cart";
    remove_button.innerText = "Remove from cart";

    remove_button.addEventListener("click", () => {
        checkout_framework.remove();
    })

    //Add framework name to the checkout item
    checkout_framework.appendChild(framework_name);

    //Add remove button to the checkout item
    checkout_framework.appendChild(remove_button);

    //Add the checkout item to the checkout list
    checkout_list.appendChild(checkout_framework);
}

function RemoveCheckoutElement(elem) { 
    elem.remove();
}

let cart = []

function AddToCartButtonClick(item_name) {
    return function(elem) {
        elem.stopPropagation(); //this prevents the elem from behind from firing
        const cart_b = elem.currentTarget;

        const checkout_element = document.getElementById(item_name+"_checkout_item");
        //check if item already exists, stuff bottem is commented out because we want to only be able to remove the elem from the cart area.
        if (checkout_element) {
        
            //cart_b.textContent  = AddCartBText[false];
            //cart_b.style.backgroundColor = AddCartBColors[false];

            //RemoveCheckoutElement(checkout_element);
            return;
        } 
        //Redesign button
        //cart_b.textContent  = AddCartBText[true];
       // cart_b.style.backgroundColor = AddCartBColors[true];

        cart.splice(0, 0, item_name);
        AddCheckoutElement(item_name);
    }
}

function OnCheckout() {
    alert('Checking out!');
    alert(cart);
}


function ClearCheckoutElements() {
    const checkout_list = document.getElementById("CheckoutList");
    checkout_list.innerHTML = "";
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

function PlayHoverSound() {
    const hover_sound = new Audio("../assets/sounds/HoverSound.mp3");
    hover_sound.play();
}

// Assign the functions to the buttons

document.getElementById("HomeButton").onclick = HomeButtonClick;

document.getElementById("ContactButton").onclick = ContactButtonClick;

let add_to_cart_b = document.querySelectorAll(".framework_box_add_to_cart");

add_to_cart_b.forEach(function(elem) {
    const item_name = elem.parentNode.querySelector(".framework_box_name").innerText
    elem.addEventListener("click", AddToCartButtonClick(item_name));
});

const checkout_button = document.getElementById("CheckoutButton");

checkout_button.onclick = OnCheckout;

const TDSB = document.querySelector(".framework_box.Img1");
const ASGB = document.querySelector(".framework_box.Img2");
const FPSB = document.querySelector(".framework_box.Img3")
const CLGB = document.querySelector(".framework_box.Img4");

//These buttons should link to videos about how to use the frameworks

TDSB.addEventListener("click", function() {
    alert("You clicked the Avatar Shopping Game box!");
    window.open("https://www.youtube.com", "_blank");
});

ASGB.addEventListener("click", function() {
    alert("You clicked the Tower Defense Simulator Game box!");
    window.open("https://www.youtube.com", "_blank");
});

FPSB.addEventListener("click", function() {
    alert("You clicked the FPS Game box!");
    window.open("https://www.youtube.com", "_blank");
});

CLGB.addEventListener("click", function() {
    alert("You clicked the Collection Simulator Game box!");
    window.open("https://www.youtube.com", "_blank");
});



document.getElementById("TwitterIcon").onclick = TwitterRedirect;
document.getElementById("YouTubeIcon").onclick = YouTubeRedirect;
document.getElementById("DiscordIcon").onclick = DiscordRedirect;
document.getElementById("InstagramIcon").onclick = InstagramRedirect;