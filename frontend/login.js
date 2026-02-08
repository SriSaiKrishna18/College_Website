// SPARK Student Portal - Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const usernameInput = document.getElementById('username');

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            // Validate inputs
            if (!username || !password) {
                showError('Please enter both username and password');
                return;
            }

            // Show loading state
            loginBtn.classList.add('loading');
            hideError();

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Login failed');
                }

                // Store student ID and remember preference
                const rememberMe = document.getElementById('rememberMe').checked;
                if (rememberMe) {
                    localStorage.setItem('studentId', data.student_id);
                }
                sessionStorage.setItem('studentId', data.student_id);

                // Success animation before redirect
                loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                loginBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 800);

            } catch (error) {
                console.error('Login error:', error);
                showError(error.message || 'Login failed. Please try again.');
                loginBtn.classList.remove('loading');
            }
        });
    }

    // Show error message
    function showError(message) {
        errorText.textContent = message;
        errorMessage.classList.add('show');
        
        // Shake the login card
        const loginCard = document.querySelector('.login-card');
        loginCard.style.animation = 'none';
        setTimeout(() => {
            loginCard.style.animation = '';
        }, 10);
    }

    // Hide error message
    function hideError() {
        errorMessage.classList.remove('show');
    }

    // Clear error on input
    usernameInput.addEventListener('input', hideError);
    passwordInput.addEventListener('input', hideError);

    // Add input focus effects
    const inputs = document.querySelectorAll('.login-form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Check if user is already logged in
    const storedStudentId = localStorage.getItem('studentId') || sessionStorage.getItem('studentId');
    if (storedStudentId && window.location.pathname === '/') {
        window.location.href = '/dashboard';
    }

    // Add keyboard shortcut for login (Enter key)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && document.activeElement.tagName !== 'BUTTON') {
            if (usernameInput.value && passwordInput.value) {
                loginForm.dispatchEvent(new Event('submit'));
            }
        }
    });
});