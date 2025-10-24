const purchase_api_url = "/api/purchase_framework"

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

function AddPurchaseElement(data, name) {
    const purchaseFrame = document.createElement("div");
    purchaseFrame.className = "framework_box";

    const price_range_label = document.createElement("p");
    price_range_label.innerHTML = data.price_string
    price_range_label.className = "framework_box_price_range";

    const framework_name = document.createElement("p");
    framework_name.innerHTML = name
    framework_name.className = "framework_box_name";

    const add_to_cart_b = document.createElement("button");
    add_to_cart_b.innerHTML = "Add to Cart"
    add_to_cart_b.className = "framework_box_add_to_cart";

    purchaseFrame.appendChild(price_range_label);
    purchaseFrame.appendChild(framework_name);
    purchaseFrame.appendChild(add_to_cart_b);

    const urlString = 'url(' + data.image_url + ')';
    purchaseFrame.style.backgroundImage = urlString

    add_to_cart_b.addEventListener("click", AddToCartButtonClick(name, urlString))

    FrameworkHolder.appendChild(purchaseFrame);
}

fetch('/framework_games.json')
.then(res => res.json())
.then(data => {
    for (const key in data) {
        const value = data[key];
        AddPurchaseElement(value, key);
    }
})

function RemoveCheckoutElement(elem) { 
    elem.remove();
}



function ClearCheckoutElements() {
    const checkout_list = document.getElementById("CheckoutList");
    checkout_list.innerHTML = "";
}

const checkout_button = document.getElementById("CheckoutButton");


// Get ticker information and minimums
const getTickerInfo = async (token) => {
  const response = await fetch('https://api.cryptapi.io/'+ token +'/info/');
  const data = await response.json();
  return data;
};

// Convert USD to token for ecommerce payments
const convertAmount = async (usdAmount, token) => {
  const params = new URLSearchParams({
    value: usdAmount,
    from: 'USD'
  });
  
  const response = await fetch(`https://api.cryptapi.io/`+ token +`/convert/?${params}`);
  const data = await response.json();
  return data.value_coin; // token amount
};

// Get QR code for payment address
const getQRCode = async (address, amount = null, token) => {
  const params = new URLSearchParams({
    address: address,
    size: 200
  });
  
  if (amount) {
    params.append('value', amount);
  }
  
  const response = await fetch(`https://api.cryptapi.io/`+ token +`/qrcode/?${params}`);
  const data = await response.json();
  return data.qr_code; // Base64 image
};

// Display payment information - Ecommerce Payment
const displayEcommercePayment = async (address, usdAmount, ticket_token) => {
  const crypto_amount = await convertAmount(usdAmount, ticket_token);
  const tickerInfo = await getTickerInfo(ticket_token);
  const minimumAmount = tickerInfo.minimum_transaction_coin;
  const CryptoName = tickerInfo.coin
  const TickerName = tickerInfo.ticker.toUpperCase();

  // Validate minimum amount
  if (crypto_amount < minimumAmount) {
    alert('can not partake in transaction')
    const paymentContainer = document.getElementById('payment_holder');
    paymentContainer.innerHTML = `
    <div class = "crypto_qr_code_holder">
      <img class = "crypto_qr_code">
      <h1 class = "qr_code_main">N/A</h1>
      <p class = "qr_code_sub">ADDRESS</p>
    </div>
    <h1 class = "requested_amount">CAN NOT FALICALATE THIS TRANSACTION</h1>
    <p class = "detail_note">Note: CAN NOT FALICALATE THIS TRANSACTION, as the USD Amount is below the exchange minimum meaning funds will be lost</p>
    <div class = "address_box">
      <p class = "address_text">N/A</p>
      <button class = "copy_address_icon"></button>
    </div>`;
    return;
  }

  const qrCode = await getQRCode(address, crypto_amount, ticket_token);


  const paymentContainer = document.getElementById("payment_holder")
  
  paymentContainer.innerHTML = 
  `<div class = "crypto_qr_code_holder">
      <img class = "crypto_qr_code" src="data:image/png;base64,${qrCode}" alt="Payment QR Code">
      <h1 class = "qr_code_main">${CryptoName}(${TickerName})</h1>
      <p class = "qr_code_sub">ADDRESS</p>
    </div>
    <h1 class = "requested_amount">PLEASE SEND  ‍<mark class = "gray_mark" id ="CryptoOwed">${crypto_amount} ${TickerName}</mark> ‍ ($${usdAmount})</h1>
    <p class = "detail_note">Note: If using an exchange please add the exchange fee to the sent amount. Exchanges usually deduct the fee from the sent amount.</p>
    <div class = "address_box">
      <p class = "address_text">${address}</p>
      <button class = "copy_address_icon" id = "CopyB"></button>
    </div>`

    const CopyButton = document.getElementById("CopyB")
  
    CopyButton.onclick = function() {
      navigator.clipboard.writeText(address)
      .then(() => {
        console.log('copied to clipboard')
      })
      .catch(err => {
        console.warn('Failed to copy: ', err)
      })
    }

    const CryptoB = document.getElementById("CryptoOwed")

    CryptoB.onclick = function() {
      navigator.clipboard.writeText(crypto_amount)
      .then(() => {
        console.log('copied to clipboard')
      })
      .catch(err => {
        console.warn('Failed to copy: ', err)
      })
    }
};

const copyAddress = (address) => {
  navigator.clipboard.writeText(address);
  alert('Address copied to clipboard!');
};

const copyAmount = (amount) => {
  navigator.clipboard.writeText(amount);
  alert('Amount copied to clipboard!');
};


checkout_button.onclick = function() {
  //FrameworkGamesJson = await fetch('/framework_games.json')
  
  if (Array.isArray(cart) && cart.length === 0) {
    alert("No items to check out")
    return
  }


  const url = window.location.origin + purchase_api_url

  fetch(url, {
      method: "POST",
      body: JSON.stringify({
        "frameworks" : cart
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  })
  .then(response => response.json())
  .then(response =>  {
    const USD = response.usd
    const Ticker = response.ticker
    const Address = response.address

    displayEcommercePayment(Address, USD, Ticker)
  })
};

