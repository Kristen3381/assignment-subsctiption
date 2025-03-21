
let subscribedEmails = new Set();

document.getElementById('subscriptionForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let nameError = document.getElementById('nameError');
    let emailError = document.getElementById('emailError');
    let passwordError = document.getElementById('passwordError');

    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    let isValid = true;
    if (!isNaN(name)) {
        nameError.textContent = 'Name cannot contain numbers.';
        isValid = false;
    }
    if (!email.includes('@')) {
        emailError.textContent = 'Invalid email format.';
        isValid = false;
    }
    if (password.length < 4) {
        passwordError.textContent = 'Password must be at least 4 characters.';
        isValid = false;
    }
    if (subscribedEmails.has(email)) {
        alert('You have already subscribed with this email.');
        return; 
    }

    
    if (email.endsWith('@gmail.com') && subscribedEmails.has(email)) {
        alert('This Gmail address has already been used for subscription.');
        return; 
    }

    if (!isValid) {
        return; 
    }

    
    setTimeout(() => {
        let isEmailValidOnServer = Math.random() < 0.9; 

        if (isEmailValidOnServer) {
            let plan = document.querySelector('input[name="plan"]:checked');
            let planName = plan.value;
            let planPrice = plan.dataset.price;

            subscribedEmails.add(email); 

            alert(`Subscription successful! Welcome to Bloom.`);

            
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.querySelectorAll('input[name="plan"]').forEach(radio => radio.checked = false);
            document.querySelector('input[name="plan"][value="basic"]').checked = true; 

        } else {
            alert('Email validation failed on the server. Please check your email and try again.');
        }
    }, 500);
});