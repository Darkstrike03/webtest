// Show sign-up form and hide login form
document.getElementById('signupLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('signupContainer').style.display = 'block';
});

// Show login form and hide sign-up form
document.getElementById('loginLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('signupContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
});
