document.addEventListener('DOMContentLoaded', () => { 
    const email = document.querySelector(".form-control");
    const submitButton = document.querySelector("#submit");
    const passwordInput = document.querySelector("#exampleInputPassword1");
    const infoPanel = document.querySelector('.add');

    if (submitButton) {
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();

            if (!email.value.includes('@') || !email.value.includes('.')) {
                alert('Please enter a valid email address.');
            } else {
                alert('Hello');
            }

            if (passwordInput.value.length >= 8) {
                alert('hello 2 raza');
            } else {
                alert('cop cerek');
            }

            document.querySelectorAll('input').forEach(input => input.value = '');
        });
    }

    const showingCheck = document.querySelector("#showing");
    const list = document.querySelector(".list-of");

    if (showingCheck) {
        showingCheck.addEventListener('change', () => {
            list.style.display = showingCheck.checked ? 'block' : 'none';
        });
    }

    const footer = document.querySelector('#coloredfooter');
    const footerButton = document.querySelector('#colorfooter');

    if (footerButton) {
        footerButton.addEventListener('click', () => {
            footer.style.backgroundColor = footer.style.backgroundColor === 'red' ? 'rgb(39, 39, 39)' : 'red';
        });
    }

    function updateDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        const formattedDate = now.toLocaleString('en-US', options);
        const dateTimeBlock = document.getElementById('date-time');
        if (dateTimeBlock) {
            dateTimeBlock.textContent = formattedDate;
        }
    }

    setInterval(updateDateTime, 60000);
    updateDateTime();

    const teachers = [
        { "name": "BatMen", "subject": "Algebra", "experience": "12 years", "image": "images/person.png" },
        { "name": "Superman", "subject": "Geometry", "experience": "10 years", "image": "images/person.png" },
        { "name": "Wonder Woman", "subject": "Calculus", "experience": "8 years", "image": "images/person.png" },
    ];
    
    function showInfoPanel() {
        infoPanel.style.display = 'block';
        setTimeout(() => {
            infoPanel.classList.add('show');
        }, 5);
    }
    
    function createTeacherCards(teachers) {
        const container = document.getElementById('teacher-cards-container');
        if (!container) {
            console.error('Container not found.');
            return;
        }
        container.innerHTML = '';
    
        teachers.forEach(teacher => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'col-md-3';
            cardDiv.innerHTML = `
                <div class="card teach text-center">
                    <img src="${teacher.image}" class="card-img-top" alt="${teacher.name}">
                    <div class="card-body text-black">
                        <h3 class="card-title">${teacher.name}</h3>
                        <p class="card-text">${teacher.subject}, ${teacher.experience}</p>
                        <button class="btn btn-primary search-teacher-course">Course</button>
                    </div>
                </div>
            `;
            container.appendChild(cardDiv);
        });
    
        const openInfoButtons = document.querySelectorAll('.search-teacher-course');
        openInfoButtons.forEach(button => {
            button.addEventListener('click', showInfoPanel);
        });
    }
    
    createTeacherCards(teachers);
    
    function searchTeachersBySubject() {
        const searchInput = document.querySelector('.searching').value.toLowerCase();
        const filteredTeachers = teachers.filter(teacher =>
            teacher.subject.toLowerCase().includes(searchInput)
        );
        createTeacherCards(filteredTeachers);
    }
    
    document.getElementById('search').addEventListener('click', searchTeachersBySubject);
    
    const crossButton = document.querySelector('#cross');
    if (crossButton) {
        crossButton.addEventListener('click', () => {
            infoPanel.classList.remove('show');
            setTimeout(() => {
                infoPanel.style.display = 'none';
            }, 500);
        });
    }
    let mySound = new Audio('images/audio.mp3');
    const soundButton = document.querySelector("#sound-effect");

    if (soundButton) {
        soundButton.addEventListener('click', () => {
            mySound.play().catch(error => console.error('Error playing sound:', error));
            infoPanel.style.display = 'none';
            infoPanel.classList.remove('show');
        });
    }
})