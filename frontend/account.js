const FrameworkHolder = document.getElementById("frameworks_holder");
//alert("f");
function AddDownloadElement(item_name, image_url) {
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

const url =  window.location.origin   + "/api/get_owned_frameworks"

fetch(url, {
    method: "POST",
    body: JSON.stringify({
        "password" : localStorage.getItem("password"),
        "username" : localStorage.getItem("username")
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
}).then(response => {
    if (!response.ok) {
        console.log("teslse")
        return {}
    }
    return response.json();
})
.then(response => {
    console.log("fdf")
    alert(response);
})

