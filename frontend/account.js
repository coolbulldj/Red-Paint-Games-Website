

const FrameworkHolder = document.getElementById("frameworks_holder");
const HeaderMain = document.getElementById("HeaderTitle")
//alert("f");
const downloadAPI_URL = 'typeshittt'
const LoginB = document.getElementById("login_button")

function DownloadElem(name) {
    const password = localStorage.getItem("password")
    const username = localStorage.getItem("username")

    const url = window.location.origin + '/api/download'
    console.log(name)
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "password" : password,
            "username" : username,
            "download_name": name
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.blob())
    .then(blob => {
        const a = document.createElement('a')

        const url = window.URL.createObjectURL(blob)

        a.href = url
        a.download = 'random_shit.jpg'

        a.style.display = "none";
        document.body.append(a)

        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
    })
}

function AddDownloadElement(data, name) {
    const purchaseFrame = document.createElement("div");
    purchaseFrame.className = "framework_box";

    const downloadB = document.createElement("button");
    downloadB.innerHTML = "Download"
    downloadB.className = "download_b";

    const framework_name = document.createElement("p");
    framework_name.innerHTML = name
    framework_name.className = "framework_box_name";


    purchaseFrame.appendChild(downloadB);
    purchaseFrame.appendChild(framework_name);


    const urlString = 'url(' + data.image_url + ')';
    purchaseFrame.style.backgroundImage = urlString

    downloadB.onclick = function() {
        DownloadElem(name)
    }

    FrameworkHolder.appendChild(purchaseFrame);
}

function LoadOwnedFrameworks(data) {
    fetch('/framework_games.json')
    .then(res => res.json())
    .then(framework_data => {
        data.forEach(name => {
            const value = framework_data[name]
            
            if (!value) {
                return
            }

            AddDownloadElement(value, name)
        })
    })
}

const url =  window.location.origin + "/api/get_owned_frameworks"
console.log(localStorage.getItem("password"), localStorage.getItem("username"))
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
    if (response.status != 200) {
        HeaderMain.innerHTML = "No Frameworks Owned"
        return []
    }

    return response.json();
})
.then(response => {
    LoadOwnedFrameworks(response);
})
.catch(err => {
    console.log(err)
})

LoginB.onclick = function() {
    window.location.replace('/login.html')
}
