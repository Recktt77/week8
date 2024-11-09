// DOM Elements
const submitRegister = document.querySelector('#submit');
const emailRegister = document.querySelector('#exampleInputEmail1');
const passwordRegister = document.querySelector('#exampleInputPassword1');
const numberRegister = document.querySelector('#exampleNumber1');
const submitLogin = document.querySelector('#submitLogin');
const emailLogin = document.querySelector('#emailLogin');
const passwordLogin = document.querySelector('#passwordLogin');
const logoutBtn = document.querySelector('#logout-btn');
const registerPanel = document.querySelector(".reg");
const loginPanel = document.querySelector(".log");
const buttonToLog = document.querySelector(".regist");
const buttonToReg = document.querySelector(".login");
const adminPanel = document.querySelector('.admin-panel');
const addCourseForm = document.querySelector('#add-course-form');

// Apply Theme Functionality
const themeToggleButton = document.querySelector('#themeToggle');
const body = document.body;
const vector = document.querySelector('.vector');

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        vector.style.backgroundImage = "url('images/vectorwhite.svg')";
        themeToggleButton.textContent = 'Switch to Light Mode';
    } else {
        body.classList.remove('dark-mode');
        vector.style.backgroundImage = "url('images/vector.svg')";
        themeToggleButton.textContent = 'Switch to Dark Mode';
    }
    localStorage.setItem('theme', theme);
}

// Check Login Status and Update UI
function checkLoginStatus() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        console.log('User logged in:', storedUser);
        applyTheme(storedUser.darkmode ? 'dark' : 'light');
        showLogoutUI();
        if (storedUser.isAdmin) {
            adminPanel.style.display = 'block'; // Show admin panel for admin
        } else {
            adminPanel.style.display = 'none'; // Hide admin panel for regular users
        }
    } else {
        showLoginUI();
        adminPanel.style.display = 'none'; // Hide admin panel if no user is logged in
    }
}

// Show Login UI
function showLoginUI() {
    loginPanel.style.display = 'flex';
    registerPanel.style.display = 'none';
    logoutBtn.style.display = 'none';
}

// Show Logout UI
function showLogoutUI() {
    loginPanel.style.display = 'none';
    registerPanel.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
}

// Handle User Registration
submitRegister.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            email: emailRegister.value,
            password: passwordRegister.value,
            number: numberRegister.value,
            darkmode: false,
            isAdmin: false, // Default to non-admin
        }),
    })
    .then(response => response.json())
    .then(json => {
        console.log('User registered:', json);
        alert('Registration successful! You can now log in.');
    })
    .catch(error => console.error('Error:', error));
});

// Handle User Login
submitLogin.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.email === emailLogin.value && u.password === passwordLogin.value);
            if (user) {
                console.log('Login successful:', user);
                localStorage.setItem('user', JSON.stringify(user));
                applyTheme(user.darkmode ? 'dark' : 'light');
                emailLogin.value = '';
                passwordLogin.value = '';
                alert('Login successful!');
                checkLoginStatus();
            } else {
                alert('Invalid credentials. Please try again.');
            }
        })
        .catch(error => console.error('Error:', error));
});

// Handle Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    alert('Logged out successfully!');
    checkLoginStatus();
});

// Add Course (Admin Only)
if (addCourseForm) {
    addCourseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.querySelector('#course-name').value;
        const subject = document.querySelector('#course-subject').value;
        const experience = document.querySelector('#course-experience').value;
        const image= document.querySelector('#course-image').value;

        fetch('http://localhost:3000/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                subject,
                experience,
                image,
            }),
        })
        .then(response => response.json())
        .then(() => {
            alert('Course added successfully!');
            addCourseForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add course.');
        });
    });
}

// Initialize Theme and Login Status
const currentTheme = localStorage.getItem('theme') || 'light';
applyTheme(currentTheme);
checkLoginStatus();
