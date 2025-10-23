
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

const FrameworkHolder = document.getElementById("frameworks_holder");
//alert("f");
function AddCheckoutElement(item_name, image_url) {
    const checkout_list = document.getElementById("CheckoutList");

    const checkout_framework = document.createElement("div");
    checkout_framework.id = item_name+"_checkout_item";
    checkout_framework.className = "checkout_cart_item";

    const framework_name = document.createElement("p");
    framework_name.className = "checkout_cart_item_name";
    framework_name.innerText = item_name;

    const remove_button = document.createElement("button");
    remove_button.className = "checkout_remove_from_cart";
    remove_button.innerText = "Remove from cart";

    remove_button.addEventListener("click", () => {
        checkout_framework.remove();
    })

    checkout_framework.style.backgroundImage = image_url

    //Add remove button to the checkout item
    checkout_framework.appendChild(remove_button);

    //Add framework name to the checkout item
    checkout_framework.appendChild(framework_name);

    //Add the checkout item to the checkout list
    checkout_list.appendChild(checkout_framework);
}

let cart = []

function AddToCartButtonClick(item_name, image_url) {
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
        AddCheckoutElement(item_name, image_url);
    }
}

function AddPurchaseElement(data) {
    const purchaseFrame = document.createElement("div");
    purchaseFrame.className = "framework_box";

    const price_range_label = document.createElement("p");
    price_range_label.innerHTML = data.price_string
    price_range_label.className = "framework_box_price_range";

    const framework_name = document.createElement("p");
    framework_name.innerHTML = data.name
    framework_name.className = "framework_box_name";

    const add_to_cart_b = document.createElement("button");
    add_to_cart_b.innerHTML = "Add to Cart"
    add_to_cart_b.className = "framework_box_add_to_cart";

    purchaseFrame.appendChild(price_range_label);
    purchaseFrame.appendChild(framework_name);
    purchaseFrame.appendChild(add_to_cart_b);

    const urlString = 'url(' + data.image_url + ')';
    purchaseFrame.style.backgroundImage = urlString

    add_to_cart_b.addEventListener("click", AddToCartButtonClick(data.name, urlString))

    FrameworkHolder.appendChild(purchaseFrame);
}

fetch('/framework_games.json')
.then(res => res.json())
.then(data => {
    data.forEach(item => {
        AddPurchaseElement(item);
    })
})

function RemoveCheckoutElement(elem) { 
    elem.remove();
}



function OnCheckout() {
    alert('Checking out!');
    alert(cart);
}


function ClearCheckoutElements() {
    const checkout_list = document.getElementById("CheckoutList");
    checkout_list.innerHTML = "";
}

const checkout_button = document.getElementById("CheckoutButton");

checkout_button.onclick = OnCheckout;