// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation and interactions
    initializePasswordToggle();
    initializeFormValidation();
    initializePasswordStrength();
    initializeFormAnimations();
    initializeSocialLogin();
});

// Password visibility toggle functionality
function initializePasswordToggle() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const fieldId = input.id;
            togglePassword(fieldId);
        });
    });
}

function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const showIcon = document.getElementById(fieldId + '-show');
    const hideIcon = document.getElementById(fieldId + '-hide');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        showIcon.style.display = 'none';
        hideIcon.style.display = 'block';
    } else {
        passwordField.type = 'password';
        showIcon.style.display = 'block';
        hideIcon.style.display = 'none';
    }
}

// Form validation
function initializeFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
        
        // Real-time validation for login form
        const emailField = loginForm.querySelector('#email');
        const passwordField = loginForm.querySelector('#password');
        
        if (emailField) {
            emailField.addEventListener('blur', validateEmail);
            emailField.addEventListener('input', clearValidationState);
        }
        
        if (passwordField) {
            passwordField.addEventListener('blur', validatePassword);
            passwordField.addEventListener('input', clearValidationState);
        }
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
        
        // Real-time validation for signup form
        const fields = signupForm.querySelectorAll('input[required]');
        fields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            field.addEventListener('input', function() {
                clearValidationState(this);
                
                // Special handling for password confirmation
                if (this.id === 'confirmPassword') {
                    validatePasswordMatch();
                }
            });
        });
        
        // Password strength validation
        const passwordField = signupForm.querySelector('#password');
        if (passwordField) {
            passwordField.addEventListener('input', updatePasswordStrength);
        }
    }
}

function validateEmail(event) {
    const field = event.target;
    const email = field.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showFieldError(field, 'Email is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    } else {
        showFieldSuccess(field);
        return true;
    }
}

function validatePassword(event) {
    const field = event.target;
    const password = field.value;
    
    if (!password) {
        showFieldError(field, 'Password is required');
        return false;
    } else if (password.length < 6) {
        showFieldError(field, 'Password must be at least 6 characters long');
        return false;
    } else {
        showFieldSuccess(field);
        return true;
    }
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    if (!value) {
        showFieldError(field, `${getFieldLabel(field)} is required`);
        return false;
    }
    
    switch (fieldType) {
        case 'email':
            return validateEmail({ target: field });
        case 'password':
            if (fieldName === 'confirmPassword') {
                return validatePasswordMatch();
            }
            return validatePassword({ target: field });
        case 'text':
            if (value.length < 2) {
                showFieldError(field, `${getFieldLabel(field)} must be at least 2 characters long`);
                return false;
            }
            break;
        case 'checkbox':
            if (field.required && !field.checked) {
                showFieldError(field, 'This field is required');
                return false;
            }
            break;
    }
    
    showFieldSuccess(field);
    return true;
}

function validatePasswordMatch() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (!password || !confirmPassword) return true;
    
    if (password.value !== confirmPassword.value) {
        showFieldError(confirmPassword, 'Passwords do not match');
        return false;
    } else {
        showFieldSuccess(confirmPassword);
        return true;
    }
}

function getFieldLabel(field) {
    const label = field.labels && field.labels[0];
    return label ? label.textContent : field.name;
}

function showFieldError(field, message) {
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
    
    let feedback = field.parentNode.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = message;
        feedback.classList.add('d-block');
    }
}

function showFieldSuccess(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    
    let feedback = field.parentNode.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.classList.remove('d-block');
    }
}

function clearValidationState(field) {
    if (typeof field === 'object' && field.target) {
        field = field.target;
    }
    
    field.classList.remove('is-invalid', 'is-valid');
    
    let feedback = field.parentNode.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.classList.remove('d-block');
    }
}

// Password strength indicator
function initializePasswordStrength() {
    const passwordField = document.getElementById('password');
    if (passwordField && document.getElementById('strengthFill')) {
        passwordField.addEventListener('input', updatePasswordStrength);
    }
}

function updatePasswordStrength(event) {
    const password = event.target.value;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthFill || !strengthText) return;
    
    const strength = calculatePasswordStrength(password);
    
    // Remove all strength classes
    strengthFill.classList.remove('weak', 'fair', 'good', 'strong');
    
    switch (strength.level) {
        case 1:
            strengthFill.classList.add('weak');
            strengthText.textContent = 'Weak password';
            strengthText.style.color = 'var(--danger)';
            break;
        case 2:
            strengthFill.classList.add('fair');
            strengthText.textContent = 'Fair password';
            strengthText.style.color = 'var(--warning)';
            break;
        case 3:
            strengthFill.classList.add('good');
            strengthText.textContent = 'Good password';
            strengthText.style.color = 'var(--info)';
            break;
        case 4:
            strengthFill.classList.add('strong');
            strengthText.textContent = 'Strong password';
            strengthText.style.color = 'var(--success)';
            break;
        default:
            strengthText.textContent = 'Enter a password';
            strengthText.style.color = 'var(--text-light)';
    }
}

function calculatePasswordStrength(password) {
    if (!password) return { level: 0, score: 0 };
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Common patterns penalty
    if (/(.)\1{2,}/.test(password)) score -= 1;
    if (/123456|password|qwerty/i.test(password)) score -= 2;
    
    const level = Math.max(1, Math.min(4, Math.ceil(score / 1.5)));
    return { level, score };
}

// Form submission handlers
function handleLoginSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Validate form
    const emailValid = validateEmail({ target: form.querySelector('#email') });
    const passwordValid = validatePassword({ target: form.querySelector('#password') });
    
    if (!emailValid || !passwordValid) {
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('.btn-login');
    showButtonLoading(submitButton);
    
    // Simulate login process
    setTimeout(() => {
        // Here you would typically make an API call to authenticate the user
        console.log('Login attempt:', { email, password: '***' });
        
        // For demo purposes, redirect to main dashboard
        // In a real app, you would validate credentials with a backend
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        window.location.href = 'index.html';
        
        hideButtonLoading(submitButton);
    }, 1500);
}

function handleSignupSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validate all fields
    let isValid = true;
    const fields = form.querySelectorAll('input[required]');
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Additional validation for password match
    if (!validatePasswordMatch()) {
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('.btn-login');
    showButtonLoading(submitButton);
    
    // Simulate signup process
    setTimeout(() => {
        // Here you would typically make an API call to register the user
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            terms: formData.get('terms'),
            newsletter: formData.get('newsletter')
        };
        
        console.log('Signup attempt:', userData);
        
        // For demo purposes, store user data and redirect to main dashboard
        // In a real app, you would send this to a backend for registration
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userName', `${userData.firstName} ${userData.lastName}`);
        window.location.href = 'index.html';
        
        hideButtonLoading(submitButton);
    }, 2000);
}

function showButtonLoading(button) {
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    
    button.disabled = true;
    btnText.style.opacity = '0';
    btnLoader.style.display = 'block';
}

function hideButtonLoading(button) {
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    
    button.disabled = false;
    btnText.style.opacity = '1';
    btnLoader.style.display = 'none';
}

// Form animations
function initializeFormAnimations() {
    // Add staggered animation to form fields
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.animationDelay = `${index * 0.1}s`;
        group.classList.add('fade-in');
    });
    
    // Animate social buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach((button, index) => {
        button.style.animationDelay = `${0.5 + index * 0.1}s`;
        button.classList.add('fade-in');
    });
}

// Social login handlers
function initializeSocialLogin() {
    const googleButton = document.querySelector('.btn-google');
    const microsoftButton = document.querySelector('.btn-microsoft');
    
    if (googleButton) {
        googleButton.addEventListener('click', handleGoogleLogin);
    }
    
    if (microsoftButton) {
        microsoftButton.addEventListener('click', handleMicrosoftLogin);
    }
}

function handleGoogleLogin() {
    console.log('Google login initiated');
    // Here you would integrate with Google OAuth
    // For demo purposes, show a message
    showSocialLoginMessage('Google');
}

function handleMicrosoftLogin() {
    console.log('Microsoft login initiated');
    // Here you would integrate with Microsoft OAuth
    // For demo purposes, show a message
    showSocialLoginMessage('Microsoft');
}

function showSocialLoginMessage(provider) {
    // Create a temporary message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    message.textContent = `${provider} login would be implemented here`;
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Handle browser back/forward navigation
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Page was loaded from cache, reset form states
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.reset();
            const fields = form.querySelectorAll('.form-control');
            fields.forEach(field => {
                clearValidationState(field);
            });
        });
    }
});

// Keyboard navigation improvements
document.addEventListener('keydown', function(event) {
    // Submit form on Enter in password fields
    if (event.key === 'Enter' && event.target.type === 'password') {
        const form = event.target.closest('form');
        if (form) {
            const submitButton = form.querySelector('.btn-login');
            if (submitButton && !submitButton.disabled) {
                submitButton.click();
            }
        }
    }
});

// Auto-focus first input on page load
window.addEventListener('load', function() {
    const firstInput = document.querySelector('input:not([type="hidden"])');
    if (firstInput && window.innerWidth > 768) {
        setTimeout(() => {
            firstInput.focus();
        }, 500);
    }
});

// Form field formatting
document.addEventListener('input', function(event) {
    const field = event.target;
    
    // Auto-format email field
    if (field.type === 'email') {
        field.value = field.value.toLowerCase().trim();
    }
    
    // Auto-capitalize name fields
    if (field.name === 'firstName' || field.name === 'lastName') {
        const words = field.value.split(' ');
        const capitalizedWords = words.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        field.value = capitalizedWords.join(' ');
    }
});

// Prevent form resubmission on refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
