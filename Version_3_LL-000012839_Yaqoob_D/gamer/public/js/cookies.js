// Cookie consent script
document.addEventListener('DOMContentLoaded', function() {
    // Check if cookie consent has been given
    if (!getCookie('cookieConsent')) {
        // Show the cookie banner if consent has not been given
        document.getElementById('cookieConsentBanner').classList.remove('d-none');
    }

    // Handle Accept button click
    document.getElementById('acceptCookies').addEventListener('click', function() {
        // Store the user's consent (accepted) in a cookie for 1 year
        setCookie('cookieConsent', 'accepted', 365);
        // Hide the cookie consent banner after accepting
        document.getElementById('cookieConsentBanner').classList.add('d-none');
    });

    // Handle Decline button click
    document.getElementById('declineCookies').addEventListener('click', function() {
        // Store the user's decline in a cookie for 1 year
        setCookie('cookieConsent', 'declined', 365);
        // Hide the cookie consent banner after declining
        document.getElementById('cookieConsentBanner').classList.add('d-none');
    });

    // Function to set cookies with an expiration time
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
            expires = '; expires=' + date.toUTCString(); // Set expiration date in UTC format
        }
        // Set the cookie with the specified name, value, expiration date, and path
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }

    // Function to get the value of a cookie by its name
    function getCookie(name) {
        const nameEQ = name + '='; // Prepare to search for the cookie
        const ca = document.cookie.split(';'); // Split all cookies into an array
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length); // Remove leading spaces
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length); // Return cookie value if found
        }
        return null; // Return null if the cookie isn't found
    }
});
