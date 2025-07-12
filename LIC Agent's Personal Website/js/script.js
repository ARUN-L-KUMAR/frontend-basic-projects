// ===== LIC WEBSITE JAVASCRIPT =====

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// Initialize application
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    hideLoadingScreen();
    setupNavigation();
    setupScrollEffects();
    setupAnimations();
    setupForms();
    setupCounters();
    console.log('🏢 LIC Website initialized successfully!');
}

// Loading Screen
function hideLoadingScreen() {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2500);
}

// Navigation
function setupNavigation() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            closeMobileMenu();
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
}

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Scroll Effects
function setupScrollEffects() {
    window.addEventListener('scroll', handleBackToTopVisibility);
    backToTop.addEventListener('click', scrollToTop);
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });
}

function handleBackToTopVisibility() {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Trigger counter animation if it's a stat item
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.classList.contains('counted')) {
                    animateCounter(stat);
                }
            });
        }
    });
}

// Animations
function setupAnimations() {
    // Add staggered animation delay to plan cards
    document.querySelectorAll('.plan-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Counter Animation
function setupCounters() {
    // This will be triggered by intersection observer
}

function animateCounter(element) {
    const targetNumber = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentNumber = Math.floor(targetNumber * easeOutCubic);
        
        // Add + or % suffix based on element
        let suffix = '';
        if (element.textContent.includes('%') || element.closest('.stat-item').querySelector('.stat-label').textContent.includes('Rate')) {
            suffix = '%';
        } else if (targetNumber > 50) {
            suffix = '+';
        }
        
        element.textContent = currentNumber + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetNumber + suffix;
            element.classList.add('counted');
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Forms
function setupForms() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email
    if (!validateEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your inquiry! I will contact you within 24 hours.', 'success');
    e.target.reset();
}

// Plan Details
function openPlanDetails(planType) {
    const planNames = {
        'term': 'Term Insurance Plans',
        'endowment': 'Endowment Plans',
        'money-back': 'Money Back Plans',
        'child': 'Child Insurance Plans',
        'pension': 'Pension Plans',
        'health': 'Health Insurance Plans'
    };
    
    showNotification(`For detailed information about ${planNames[planType]}, please contact me directly.`, 'info');
}

// Utilities
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        max-width: 350px;
        font-weight: 500;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function getNotificationColor(type) {
    const colors = {
        success: '#059669',
        error: '#dc2626',
        warning: '#d97706',
        info: '#1e40af'
    };
    return colors[type] || colors.info;
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

// Make functions globally available
window.openPlanDetails = openPlanDetails;
window.scrollToSection = scrollToSection;
