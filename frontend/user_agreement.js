const continueB = document.getElementById('ContinueB');



continueB.addEventListener('click', () => {
    fetch('/api/verifyUserAgreement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ensure cookies go with the request
    });
    window.location.reload()
})