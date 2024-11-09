document.addEventListener('DOMContentLoaded', () => {
    const email = document.querySelector(".form-control");
    const submitButton = document.querySelector("#submit");
    const passwordInput = document.querySelector("#exampleInputPassword1");
    const infoPanel = document.querySelector('.add');
    const teachersContainer = document.getElementById('teacher-cards-container');
    const showingCheck = document.querySelector("#showing");
    const list = document.querySelector(".list-of");
    const footer = document.querySelector('#coloredfooter');
    const footerButton = document.querySelector('#colorfooter');
    const searchButton = document.getElementById('search');
    const soundButton = document.querySelector("#sound-effect");
    const crossButton = document.querySelector('#cross');
    const mySound = new Audio('images/audio.mp3');
    let teachers = [];

    // Fetch teachers from JSON
    function fetchTeachers() {
        fetch('http://localhost:3000/courses') // Replace with your API endpoint if needed
            .then(response => response.json())
            .then(data => {
                teachers = data;
                createTeacherCards(teachers);
            })
            .catch(error => console.error('Error fetching teachers:', error));
    }

    // Create teacher cards dynamically
    function createTeacherCards(teachers) {
        if (!teachersContainer) {
            console.error('Teacher container not found.');
            return;
        }
        teachersContainer.innerHTML = '';
        teachers.forEach(teacher => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'col-md-3';
            cardDiv.innerHTML = `
                <div class="card teach text-center">
                    <img src="${teacher.image}" class="card-img-top" alt="${teacher.name}">
                    <div class="card-body text-black">
                        <h3 class="card-title">${teacher.name}</h3>
                        <p class="card-text">${teacher.subject}, ${teacher.experience}</p>
                        <button class="btn btn-primary search-teacher-course">Details</button>
                    </div>
                </div>
            `;
            teachersContainer.appendChild(cardDiv);
        });

        document.querySelectorAll('.search-teacher-course').forEach((button, index) => {
            button.addEventListener('click', () => showInfoPanel(teachers[index]));
        });
    }

    // Display teacher details in the info panel
    function showInfoPanel(teacher) {
        if (!infoPanel) return;
    
        // Populate the info panel with teacher details
        infoPanel.innerHTML = `
        <div class="add-container">
            <h3>${teacher.name}</h3>
            <p>${teacher.subject}</p>
            <p>${teacher.experience}</p>
            <img id="cross" src="images/cross.png" alt="X" width="30px" style="cursor: pointer;">
            <button id="sound-effect" class="btn btn-primary bg-light text-black">12$ for a month</button>
        </div>
        `;
    
        // Show the info panel
        infoPanel.style.display = 'block';
        setTimeout(() => {
            infoPanel.classList.add('show');
        }, 5);
    
        // Add functionality to dynamically rendered elements
        const crossButton = document.querySelector('#cross');
        if (crossButton) {
            crossButton.addEventListener('click', () => {
                infoPanel.classList.remove('show');
                setTimeout(() => {
                    infoPanel.style.display = 'none';
                }, 500);
            });
        }
    
        const soundButton = document.querySelector("#sound-effect");
        if (soundButton) {
            const mySound = new Audio('images/audio.mp3');
            soundButton.addEventListener('click', () => {
                mySound.play()
                    .then(() => console.log('Sound played successfully.'))
                    .catch(error => console.error('Error playing sound:', error));
                infoPanel.classList.remove('show');
                setTimeout(() => {
                    infoPanel.style.display = 'none';
                }, 500);
            });
        }
    }

    // Search functionality
    function searchTeachersBySubject() {
        const searchInput = document.querySelector('.searching').value.toLowerCase();
        const filteredTeachers = teachers.filter(teacher =>
            teacher.subject.toLowerCase().includes(searchInput) ||
            teacher.name.toLowerCase().includes(searchInput)
        );
        createTeacherCards(filteredTeachers);
    }

    if (searchButton) {
        searchButton.addEventListener('click', searchTeachersBySubject);
    }

    // Toggle visibility of the list
    if (showingCheck) {
        showingCheck.addEventListener('change', () => {
            if (list) {
                list.style.display = showingCheck.checked ? 'block' : 'none';
            }
        });
    }

    // Toggle footer color
    if (footerButton) {
        footerButton.addEventListener('click', () => {
            if (footer) {
                footer.style.backgroundColor =
                    footer.style.backgroundColor === 'red' ? 'rgb(39, 39, 39)' : 'red';
            }
        });
    }

    // Play sound
    if (soundButton) {
        soundButton.addEventListener('click', () => {
            mySound.play()
                .then(() => console.log('Sound played successfully.'))
                .catch(error => console.error('Error playing sound:', error));
        });
    }

    // Close info panel
    if (crossButton) {
        crossButton.addEventListener('click', () => {
            if (infoPanel) {
                infoPanel.classList.remove('show');
                setTimeout(() => {
                    infoPanel.style.display = 'none';
                }, 500);
            }
        });
    }

    // Email and password validation
    if (submitButton) {
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();

            if (!email || !email.value.includes('@') || !email.value.includes('.')) {
                alert('Please enter a valid email address.');
            } else {
                alert('Valid email!');
            }

            if (!passwordInput || passwordInput.value.length < 8) {
                alert('Password must be at least 8 characters.');
            } else {
                alert('Password is valid!');
            }

            // Clear inputs
            document.querySelectorAll('input').forEach(input => input.value = '');
        });
    }

    // Update date and time
    function updateDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const formattedDate = now.toLocaleString('en-US', options);
        const dateTimeBlock = document.getElementById('date-time');
        if (dateTimeBlock) {
            dateTimeBlock.textContent = formattedDate;
        }
    }

    setInterval(updateDateTime, 60000); // Update every minute
    updateDateTime(); // Initial call

    // Fetch teachers on page load
    fetchTeachers();
});
