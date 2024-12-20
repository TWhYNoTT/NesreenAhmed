const navbar = document.getElementById('navbar');
const humgerButton = document.getElementById('humgerButton');

if (navbar) {
    if (humgerButton) {

        humgerButton.addEventListener('click', () => {
            navbar.classList.toggle('active')
        })
    }
}






const DB = {
    init() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
        if (!localStorage.getItem('carts')) {
            localStorage.setItem('carts', JSON.stringify({}));
        }
        if (!localStorage.getItem('orders')) {
            localStorage.setItem('orders', JSON.stringify([]));
        }
        if (!localStorage.getItem('currentUser')) {
            localStorage.setItem('currentUser', '');
        }
    },

    users: {

        create(userData) {
            let users = JSON.parse(localStorage.getItem('users'));


            let emailExists = users.some(user => user.email === userData.email);


            if (emailExists) {
                throw new Error('Email already registered');
            }




            let newUser = {
                id: Date.now().toString(),
                ...userData,
                createdAt: new Date().toISOString()
            };



            users.push(newUser);

            localStorage.setItem('users', JSON.stringify(users));

            return newUser;
        },


        login(email, password) {

            let users = JSON.parse(localStorage.getItem('users'));

            let foundUser = users.find(u => u.email === email && u.password === password);

            if (!foundUser) {
                throw new Error('Invalid credentials');
            }

            localStorage.setItem('currentUser', foundUser.id);
            return foundUser;
        },

        logout() {
            localStorage.setItem('currentUser', '');
            return true;
        },





        getCurrentUser() {
            let userId = localStorage.getItem('currentUser');
            if (!userId) return null;

            let users = JSON.parse(localStorage.getItem('users'));

            let currentUser = users.find(u => u.id === userId);

            return currentUser || null;
        }
    }
};


document.addEventListener('DOMContentLoaded', () => {
    DB.init();
    updateAuthUI();
    // Add this to your JavaScript file or <script> tag
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");


    if (scrollToTopBtn) {

        scrollToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});






const registerForm = document.getElementById('registerForm');


const namePattern = /^[a-zA-Z]{3,}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phonePattern = /^01[0125][0-9]{8}$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


function validateField(input, pattern, errorMessage) {
    if (!pattern.test(input.value)) {
        throw new Error(errorMessage);
    }
}

if (registerForm) {

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');


    nameInput.addEventListener('input', () => {
        const nameError = document.getElementById('nameError');
        if (!namePattern.test(nameInput.value)) {
            nameError.classList.add('display-block');
            nameInput.classList.add('is-invalid');
        } else {
            nameError.classList.remove('display-block');
            nameInput.classList.remove('is-invalid');
        }
    });


    emailInput.addEventListener('input', () => {
        const emailError = document.getElementById('emailError');
        if (!emailPattern.test(emailInput.value)) {
            emailError.classList.add('display-block');
            emailInput.classList.add('is-invalid');
        } else {
            emailError.classList.remove('display-block');
            emailInput.classList.remove('is-invalid');
        }
    });


    phoneInput.addEventListener('input', () => {
        const phoneError = document.getElementById('phoneError');
        if (!phonePattern.test(phoneInput.value)) {
            phoneError.classList.add('display-block');
            phoneInput.classList.add('is-invalid');
        } else {
            phoneError.classList.remove('display-block');
            phoneInput.classList.remove('is-invalid');
        }
    });


    passwordInput.addEventListener('input', () => {
        const passwordError = document.getElementById('passwordError');
        if (!passwordPattern.test(passwordInput.value)) {
            passwordError.classList.add('display-block');
            passwordInput.classList.add('is-invalid');
        } else {
            passwordError.classList.remove('display-block');
            passwordInput.classList.remove('is-invalid');
        }
    });


    confirmPasswordInput.addEventListener('input', () => {
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.classList.add('display-block');
            confirmPasswordInput.classList.add('is-invalid');
        } else {
            confirmPasswordError.classList.remove('display-block');
            confirmPasswordInput.classList.remove('is-invalid');
        }
    });


    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        try {

            validateField(nameInput, namePattern, 'Name must be at least 3 characters long and contain only letters');
            validateField(emailInput, emailPattern, 'Please enter a valid email address');
            validateField(phoneInput, phonePattern, 'Please enter a valid Egyptian phone number');
            validateField(passwordInput, passwordPattern, 'Password must be at least 8 characters long and contain at least one letter and one number');


            if (passwordInput.value !== confirmPasswordInput.value) {
                throw new Error('Passwords do not match');
            }




            DB.users.create({
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                password: passwordInput.value
            });


            showNotification('Registration successful! Redirecting to login...');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);

        } catch (error) {
            showNotification(error.message, 'error');
        }
    });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {


        e.preventDefault();


        let emailInput = document.getElementById('loginEmail');


        let passwordInput = document.getElementById('loginPassword');

        try {

            DB.users.login(emailInput.value, passwordInput.value);


            showNotification('Login successful! Redirecting...');

            setTimeout(() => {

                window.location.href = 'index.html';

            }, 3000);

        } catch (error) {

            showNotification(error.message, 'error');

        }
    });
}


function handleLogout() {
    DB.users.logout();
    window.location.href = 'login.html';
}



function updateAuthUI() {

    let currentUser = DB.users.getCurrentUser();

    let userNav = document.querySelector('.navbar ul');

    if (userNav) {
        if (currentUser) {


            userNav.innerHTML = `
                  <li><a href="index.html">Home</a></li>
                  <li><a href="shopping.html">Shopping</a></li>
                  <li><a href="cart.html">
                      <i class="fa-solid fa-cart-shopping fa-xl"></i>
                      <span class="badge">0</span>
                  </a></li>
                  <li><a href="order.html">${currentUser.name}</a></li>
                  <li><a href="#" onclick="handleLogout()">Logout</a></li>
              `;
        } else {

            userNav.innerHTML = `
                  <li><a href="index.html">Home</a></li>
                  <li><a href="login.html">Login</a></li>
                  <li><a href="register.html">Register</a></li>
              `;
        }
    }
}


function showNotification(message, type = 'success') {
    let notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}



