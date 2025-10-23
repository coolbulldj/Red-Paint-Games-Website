
const home_url = "/home.html"
const frameworks_url = "/framework.html"
const account_url = "/account.html"
const login_url = "/login.html"

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
    if (window.location.pathname !== home_url) {
        window.location.replace(home_url)
    }
    document.getElementById("ContactSection").scrollIntoView({ behavior: 'smooth' });
}

function FrameworksButtonClick() {
    window.location.replace(frameworks_url)
}

function OwnedFrameworks() {
    window.location.replace(account_url)
}

function LoginButtonClick() {
    window.location.replace(login_url);
}


// Assign the functions to the buttons

document.getElementById("HomeButton").onclick = HomeButtonClick;

//document.getElementById("ContactButton").onclick = ContactButtonClick;

document.getElementById("MenuFrameworkButton").onclick = FrameworksButtonClick;

document.getElementById("OwnedFrameworks").onclick = OwnedFrameworks;