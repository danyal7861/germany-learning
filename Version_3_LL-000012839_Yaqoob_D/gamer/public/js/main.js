// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-Mode-Toggle'); // Get the dark mode toggle button element
const body = document.body; // Reference to the <body> element

// Load dark mode preference from localStorage (to persist dark mode between page reloads)
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode'); // Apply dark mode class to the body
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change toggle button icon to "sun" (indicating dark mode is active)
}

// Add an event listener to the dark mode toggle button
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode'); // Toggle the "dark-mode" class on the body

    if (body.classList.contains('dark-mode')) { // If dark mode is active
        localStorage.setItem('dark-mode', 'enabled'); // Store dark mode preference in localStorage
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change the button icon to "sun"
    } else { // If dark mode is not active
        localStorage.setItem('dark-mode', 'disabled'); // Store light mode preference in localStorage
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change the button icon to "moon"
    }
});

// Text Resizing
const textSizeButtons = document.querySelectorAll('.text-size-button'); // Get all elements with the class "text-size-button"

// Iterate over each button and add a click event listener
textSizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.body.style.fontSize = button.dataset.size; // Set the font size of the body based on the button's data-size attribute
    });
});
