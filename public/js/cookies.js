// Cookie consent script
document.addEventListener('DOMContentLoaded', function() {
    // Check if cookie consent has been given
    if (!getCookie('cookieConsent')) {
        // Show the cookie banner
        document.getElementById('cookieConsentBanner').classList.remove('d-none');
    }

    // Handle Accept button click
    document.getElementById('acceptCookies').addEventListener('click', function() {
        setCookie('cookieConsent', 'accepted', 365); // Store consent for 1 year
        document.getElementById('cookieConsentBanner').classList.add('d-none');
    });

    // Handle Decline button click
    document.getElementById('declineCookies').addEventListener('click', function() {
        setCookie('cookieConsent', 'declined', 365); // Store decline for 1 year
        document.getElementById('cookieConsentBanner').classList.add('d-none');
    });

    // Function to set cookies
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }

    // Function to get cookie value
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});