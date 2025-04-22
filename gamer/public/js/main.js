// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-Mode-Toggle');
const body = document.body;

// Load dark mode preference from localStorage
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('dark-mode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Text Resizing
const textSizeButtons = document.querySelectorAll('.text-size-button');
textSizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.body.style.fontSize = button.dataset.size;
    });
});