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

function checkLoginStatus() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        applyTheme(storedUser.darkmode ? 'dark' : 'light');
        showLogoutUI();
    } else {
        showLoginUI();
    }
}

function showLoginUI() {
    loginPanel.style.display = 'flex';
    registerPanel.style.display = 'none';
    logoutBtn.style.display = 'none';
}

function showLogoutUI() {
    loginPanel.style.display = 'none';
    registerPanel.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
}


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
        }),
    })
    .then(response => response.json())
    .then(json => {
        console.log('User registered:', json);
        alert('Registration successful! You can now log in.');
    })
    .catch(error => console.error('Error:', error));
});

// Login
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
            showLogoutUI();
        } else {
            alert('Invalid credentials. Please try again.');
        }
    })
    .catch(error => console.error('Error:', error));
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    alert('Logged out successfully!');
    showLoginUI();
});

themeToggleButton.addEventListener('click', () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(newTheme);

    if (storedUser) {
        storedUser.darkmode = (newTheme === 'dark');
        localStorage.setItem('user', JSON.stringify(storedUser));
        
        fetch(`http://localhost:3000/users/${storedUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ darkmode: storedUser.darkmode }),
        })
        .then(response => response.json())
        .then(data => console.log('Theme preference updated:', data))
        .catch(error => console.error('Error:', error));
    }
});

const currentTheme = localStorage.getItem('theme') || 'light';
applyTheme(currentTheme);

checkLoginStatus();

if (registerPanel) {
    buttonToReg.addEventListener('click', () => {
        loginPanel.classList.add('hide');
        setTimeout(() => {
            loginPanel.style.display = 'none';
            registerPanel.style.display = 'flex';
            setTimeout(() => {
                registerPanel.classList.remove('hide');
            }, 20);
        }, 300);
    });
}

if (loginPanel) {
    buttonToLog.addEventListener('click', () => {
        registerPanel.classList.add('hide');
        setTimeout(() => {
            registerPanel.style.display = 'none';
            loginPanel.style.display = 'flex';
            setTimeout(() => {
                loginPanel.classList.remove('hide');
            }, 20);
        }, 300);
    });
}
