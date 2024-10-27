const themeToggleButton = document.querySelector('#themeToggle');
const body = document.body;
const vector = document.querySelector('.vector');

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    vector.style.backgroundImage = "url('images/vectorwhite.svg')";
} else {
    body.classList.remove('dark-mode');
    vector.style.backgroundImage = "url('images/vector.svg')";
}

themeToggleButton.textContent = currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';

themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const newTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';

    if (newTheme === 'dark') {
        vector.style.backgroundImage = "url('images/vectorwhite.svg')";
    } else {
        vector.style.backgroundImage = "url('images/vector.svg')";
    }

    localStorage.setItem('theme', newTheme);
    themeToggleButton.textContent = newTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});
