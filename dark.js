(() => {
    const themeToggleButton = document.querySelector('#themeToggle');
    const body = document.body;
    const vector = document.querySelector('.vector');

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (vector) {
                vector.style.backgroundImage = "url('images/vectorwhite.svg')";
            }
            if (themeToggleButton) {
                themeToggleButton.textContent = 'Switch to Light Mode';
            }
        } else {
            body.classList.remove('dark-mode');
            if (vector) {
                vector.style.backgroundImage = "url('images/vector.svg')";
            }
            if (themeToggleButton) {
                themeToggleButton.textContent = 'Switch to Dark Mode';
            }
        }
        localStorage.setItem('theme', theme);
    }

    // Add event listener only if the toggle button exists
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(currentTheme);

            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                storedUser.darkmode = (currentTheme === 'dark');
                localStorage.setItem('user', JSON.stringify(storedUser));

                // Optional: Update the user's theme preference on the backend
                fetch(`http://localhost:3000/users/${storedUser.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ darkmode: storedUser.darkmode }),
                })
                    .then(response => response.json())
                    .then(data => console.log('Theme preference updated:', data))
                    .catch(error => console.error('Error updating theme:', error));
            }
        });
    }

    // Apply theme on page load
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);
})();
