// Advanced Interactive Form JavaScript

// DOM Elements
const loginToggle = document.getElementById('loginToggle');
const registerToggle = document.getElementById('registerToggle');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');
const toastContainer = document.getElementById('toastContainer');

// Form validation patterns
const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[1-9][\d]{0,15}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    name: /^[a-zA-Z\s]{2,50}$/
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupFormToggle();
    setupPasswordToggles();
    setupFormValidation();
    setupPasswordStrength();
    setupModalHandlers();
    addFloatingLabels();
    setupSocialButtons();
    
    console.log('SecureAuth form initialized successfully! 🔐');
}

// Form Toggle Functionality
function setupFormToggle() {
    loginToggle.addEventListener('click', () => switchForm('login'));
    registerToggle.addEventListener('click', () => switchForm('register'));
}

function switchForm(formType) {
    if (formType === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
    } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        registerToggle.classList.add('active');
        loginToggle.classList.remove('active');
    }
    
    // Clear any existing error messages
    clearAllErrors();
}

// Password Toggle Functionality
function setupPasswordToggles() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Form Validation Setup
function setupFormValidation() {
    // Login form validation
    loginForm.addEventListener('submit', handleLoginSubmit);
    
    // Register form validation
    registerForm.addEventListener('submit', handleRegisterSubmit);
    
    // Real-time validation
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    
    let isValid = true;
    
    if (!validateField(email)) isValid = false;
    if (!validateField(password)) isValid = false;
    
    if (isValid) {
        submitForm('login', {
            email: email.value,
            password: password.value,
            rememberMe: document.getElementById('rememberMe').checked
        });
    }
}

function handleRegisterSubmit(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('registerEmail');
    const phone = document.getElementById('phone');
    const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const agreeTerms = document.getElementById('agreeTerms');
    
    let isValid = true;
    
    if (!validateField(firstName)) isValid = false;
    if (!validateField(lastName)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(phone)) isValid = false;
    if (!validateField(password)) isValid = false;
    if (!validateField(confirmPassword)) isValid = false;
    if (!agreeTerms.checked) {
        showToast('Please agree to the Terms of Service and Privacy Policy', 'error');
        isValid = false;
    }
    
    if (isValid) {
        submitForm('register', {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
            password: password.value
        });
    }
}

// Field Validation
function validateField(input) {
    const value = input.value.trim();
    const fieldName = input.name;
    let isValid = true;
    let errorMessage = '';
    
    // Check if field is empty
    if (!value) {
        errorMessage = `${getFieldLabel(fieldName)} is required`;
        isValid = false;
    } else {
        // Specific validation based on field type
        switch (fieldName) {
            case 'email':
                if (!validationPatterns.email.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
                
            case 'phone':
                if (!validationPatterns.phone.test(value)) {
                    errorMessage = 'Please enter a valid phone number';
                    isValid = false;
                }
                break;
                
            case 'password':
                if (value.length < 8) {
                    errorMessage = 'Password must be at least 8 characters long';
                    isValid = false;
                } else if (!validationPatterns.password.test(value)) {
                    errorMessage = 'Password must contain uppercase, lowercase, number and special character';
                    isValid = false;
                }
                break;
                
            case 'confirmPassword':
                const originalPassword = document.getElementById('registerPassword').value;
                if (value !== originalPassword) {
                    errorMessage = 'Passwords do not match';
                    isValid = false;
                }
                break;
                
            case 'firstName':
            case 'lastName':
                if (!validationPatterns.name.test(value)) {
                    errorMessage = 'Please enter a valid name (2-50 characters, letters only)';
                    isValid = false;
                }
                break;
        }
    }
    
    // Update UI based on validation result
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        hideFieldError(input);
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        showFieldError(input, errorMessage);
    }
    
    return isValid;
}

function getFieldLabel(fieldName) {
    const labels = {
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        firstName: 'First Name',
        lastName: 'Last Name',
        phone: 'Phone Number'
    };
    return labels[fieldName] || fieldName;
}

function showFieldError(input, message) {
    const errorElement = document.getElementById(input.id + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function hideFieldError(input) {
    const errorElement = document.getElementById(input.id + 'Error');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

function clearFieldError(input) {
    if (input.classList.contains('invalid')) {
        input.classList.remove('invalid');
        hideFieldError(input);
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => element.classList.remove('show'));
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
}

// Password Strength Checker
function setupPasswordStrength() {
    const passwordInput = document.getElementById('registerPassword');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        updatePasswordStrengthUI(strength, strengthFill, strengthText);
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    if (password.length >= 8) score += 1;
    else feedback.push('at least 8 characters');
    
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('lowercase letter');
    
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('uppercase letter');
    
    if (/\d/.test(password)) score += 1;
    else feedback.push('number');
    
    if (/[@$!%*?&]/.test(password)) score += 1;
    else feedback.push('special character');
    
    return { score, feedback };
}

function updatePasswordStrengthUI(strength, strengthFill, strengthText) {
    strengthFill.className = 'strength-fill';
    
    if (strength.score <= 2) {
        strengthFill.classList.add('weak');
        strengthText.textContent = 'Weak password';
    } else if (strength.score <= 4) {
        strengthFill.classList.add('medium');
        strengthText.textContent = 'Medium password';
    } else {
        strengthFill.classList.add('strong');
        strengthText.textContent = 'Strong password';
    }
    
    if (strength.feedback.length > 0) {
        strengthText.textContent += ` - Add: ${strength.feedback.join(', ')}`;
    }
}

// Form Submission
function submitForm(formType, data) {
    const submitBtn = document.querySelector(`#${formType}Form .submit-btn`);
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        if (formType === 'login') {
            showToast('Login successful! Welcome back!', 'success');
            showSuccessModal('Welcome Back!', 'You have been successfully logged in.');
        } else {
            showToast('Account created successfully!', 'success');
            showSuccessModal('Account Created!', 'Welcome to SecureAuth! Your account has been created successfully.');
        }
        
        // Store user data (in real app, this would be handled by backend)
        localStorage.setItem('secureauth_user', JSON.stringify({
            ...data,
            loginTime: new Date().toISOString()
        }));
        
    }, 2000);
}

// Modal Handlers
function setupModalHandlers() {
    closeModal.addEventListener('click', hideSuccessModal);
    
    successModal.addEventListener('click', function(e) {
        if (e.target === this) hideSuccessModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') hideSuccessModal();
    });
}

function showSuccessModal(title, message) {
    document.getElementById('successTitle').textContent = title;
    document.getElementById('successMessage').textContent = message;
    successModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideSuccessModal() {
    successModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Reset forms after successful submission
    loginForm.reset();
    registerForm.reset();
    clearAllErrors();
}

// Toast Notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = getToastIcon(type);
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

function getToastIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Floating Labels Enhancement
function addFloatingLabels() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        // Handle autofill detection
        setTimeout(() => {
            if (input.value) {
                input.dispatchEvent(new Event('input'));
            }
        }, 100);
        
        // Handle browser autofill
        input.addEventListener('animationstart', function(e) {
            if (e.animationName === 'autofill') {
                this.classList.add('has-value');
            }
        });
    });
}

// Social Authentication (Mock Implementation)
function setupSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'Google' :
                           this.classList.contains('facebook-btn') ? 'Facebook' : 'GitHub';
            
            showToast(`${provider} authentication is not available in demo mode`, 'info');
        });
    });
}

// Accessibility Enhancements
function enhanceAccessibility() {
    // Add ARIA labels
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.setAttribute('aria-describedby', input.id + 'Error');
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Form Analytics (Mock)
function trackFormInteraction(event, data) {
    console.log('Form Analytics:', { event, data, timestamp: new Date().toISOString() });
}

// Advanced Features
function setupAdvancedFeatures() {
    // Auto-save form data
    setupAutoSave();
    
    // Form progress tracking
    setupProgressTracking();
    
    // Enhanced security features
    setupSecurityFeatures();
}

function setupAutoSave() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', debounce(() => {
            const formData = new FormData(input.closest('form'));
            const data = Object.fromEntries(formData);
            localStorage.setItem('secureauth_draft', JSON.stringify(data));
        }, 1000));
    });
    
    // Restore draft data
    const draftData = localStorage.getItem('secureauth_draft');
    if (draftData) {
        try {
            const data = JSON.parse(draftData);
            Object.keys(data).forEach(key => {
                const input = document.querySelector(`input[name="${key}"]`);
                if (input && input.type !== 'password') {
                    input.value = data[key];
                }
            });
        } catch (e) {
            console.warn('Failed to restore draft data');
        }
    }
}

function setupProgressTracking() {
    const registerInputs = document.querySelectorAll('#registerForm input[required]');
    let completedFields = 0;
    
    registerInputs.forEach(input => {
        input.addEventListener('input', () => {
            const newCompletedFields = Array.from(registerInputs).filter(inp => inp.value.trim()).length;
            if (newCompletedFields !== completedFields) {
                completedFields = newCompletedFields;
                const progress = (completedFields / registerInputs.length) * 100;
                trackFormInteraction('progress', { progress: Math.round(progress) });
            }
        });
    });
}

function setupSecurityFeatures() {
    // Prevent copy/paste on password confirmation
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('paste', function(e) {
            e.preventDefault();
            showToast('For security reasons, pasting is not allowed in the confirm password field', 'warning');
        });
    }
    
    // Caps lock detection
    document.addEventListener('keydown', function(e) {
        if (e.getModifierState('CapsLock')) {
            const activeInput = document.activeElement;
            if (activeInput && activeInput.type === 'password') {
                showToast('Caps Lock is on', 'warning');
            }
        }
    });
}

// Utility Functions
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

// Initialize advanced features
setupAdvancedFeatures();
enhanceAccessibility();

console.log('SecureAuth advanced features loaded! 🚀');
