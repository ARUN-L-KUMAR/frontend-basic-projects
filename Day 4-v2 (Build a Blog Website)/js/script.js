// ===== ENHANCED BLOG WEBSITE JAVASCRIPT =====

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');

// Search functionality
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchClose = document.getElementById('searchClose');

// Theme toggle
const themeToggle = document.getElementById('themeToggle');

// Blog filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

// Modal & Toast logic
const blogModal = document.getElementById('blogModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const toastContainer = document.getElementById('toastContainer');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    hideLoadingScreen();
    setupNavigation();
    setupScrollEffects();
    setupAnimations();
    setupForms();
    setupCounters();
    setupSearch();
    setupThemeToggle();
    setupBlogFiltering();
    setupAdvancedAnimations();
    setupReadingProgress();
    setupKeyboardShortcuts();
    setupBlogCardInteractions();
    console.log('🚀 LADUN Blog Website loaded successfully!');
}

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// ===== NAVIGATION =====
function setupNavigation() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                scrollToSection(targetId.substring(1));
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== SCROLL EFFECTS =====
function setupScrollEffects() {
    // Back to top button
    window.addEventListener('scroll', handleBackToTopVisibility);
    backToTop.addEventListener('click', scrollToTop);
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .blog-card, .contact-item, .stat-item');
    animatedElements.forEach(el => {
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
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Trigger counter animation if it's a stat item
            if (entry.target.classList.contains('stat-item')) {
                animateCounter(entry.target);
            }
        }
    });
}

// ===== SCROLL TO SECTION =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== ANIMATIONS =====
function setupAnimations() {
    // Add scroll animation class to elements
    const elementsToAnimate = document.querySelectorAll('.section-header, .blog-card, .about-content, .contact-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', handleParallaxEffect);
}

function handleParallaxEffect() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const particles = document.querySelectorAll('.particle');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// ===== COUNTERS =====
function setupCounters() {
    // This will be triggered by the intersection observer
}

function animateCounter(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    if (!numberElement || numberElement.classList.contains('counted')) return;
    
    const targetNumber = parseInt(numberElement.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentNumber = Math.floor(targetNumber * easeOutCubic);
        
        numberElement.textContent = currentNumber.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            numberElement.textContent = targetNumber.toLocaleString();
            numberElement.classList.add('counted');
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===== FORMS =====
function setupForms() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Thank you for subscribing!');
            newsletterForm.reset();
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Message sent! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Footer newsletter
    const footerNewsletter = document.querySelector('.footer-newsletter');
    if (footerNewsletter) {
        footerNewsletter.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Subscribed from footer!');
            footerNewsletter.reset();
        });
    }
}

// ===== SEARCH FUNCTIONALITY =====
function setupSearch() {
    if (searchToggle) {
        searchToggle.addEventListener('click', toggleSearch);
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Real-time search
        searchInput.addEventListener('input', debounce(performRealTimeSearch, 300));
    }
    
    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchBar.contains(e.target) && !searchToggle.contains(e.target)) {
            closeSearch();
        }
    });
}

function toggleSearch() {
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        searchInput.focus();
    }
}

function closeSearch() {
    searchBar.classList.remove('active');
    searchInput.value = '';
    resetBlogCards();
}

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
        filterBlogsBySearch(query);
        showNotification(`Searching for "${query}"...`, 'info');
    } else {
        resetBlogCards();
    }
}

function performRealTimeSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length > 2) {
        filterBlogsBySearch(query);
    } else if (query.length === 0) {
        resetBlogCards();
    }
}

function filterBlogsBySearch(query) {
    blogCards.forEach(card => {
        const title = card.querySelector('.blog-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
        const category = card.querySelector('.blog-category').textContent.toLowerCase();
        
        if (title.includes(query) || excerpt.includes(query) || category.includes(query)) {
            card.style.display = 'block';
            card.classList.add('filtered-in');
            card.classList.remove('filtered-out');
        } else {
            card.classList.add('filtered-out');
            card.classList.remove('filtered-in');
            setTimeout(() => {
                if (card.classList.contains('filtered-out')) {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
}

// ===== THEME TOGGLE =====
function setupThemeToggle() {
    if (themeToggle) {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    showNotification(`Switched to ${newTheme} theme`, 'success');
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ===== BLOG FILTERING =====
function setupBlogFiltering() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter blog cards
            filterBlogCards(filter);
            
            showNotification(`Showing ${filter === 'all' ? 'all posts' : filter + ' posts'}`, 'info');
        });
    });
}

function filterBlogCards(filter) {
    blogCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('filtered-in');
            card.classList.remove('filtered-out');
        } else {
            card.classList.add('filtered-out');
            card.classList.remove('filtered-in');
            setTimeout(() => {
                if (card.classList.contains('filtered-out')) {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
}

function resetBlogCards() {
    blogCards.forEach(card => {
        card.style.display = 'block';
        card.classList.remove('filtered-out', 'filtered-in');
    });
    
    // Reset active filter to "All"
    filterButtons.forEach(btn => btn.classList.remove('active'));
    const allButton = document.querySelector('[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
}

// ===== ADVANCED ANIMATIONS =====
function setupAdvancedAnimations() {
    // Stagger blog card animations
    blogCards.forEach((card, index) => {
        card.style.setProperty('--animation-delay', index);
    });
    
    // Parallax scrolling for hero elements
    window.addEventListener('scroll', debounce(handleAdvancedParallax, 10));
}

function handleAdvancedParallax() {
    const scrolled = window.pageYOffset;
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle) {
        heroTitle.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    if (heroDescription) {
        heroDescription.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
}

// ===== READING PROGRESS BAR =====
function setupReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', updateReadingProgress);
}

function updateReadingProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    const progress = (scrolled / documentHeight) * 100;
    
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${Math.min(progress, 100)}%`;
    }
}

// ===== KEYBOARD SHORTCUTS =====
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleSearch();
        }
        
        // Ctrl/Cmd + D for theme toggle
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            toggleTheme();
        }
        
        // Escape to close search
        if (e.key === 'Escape') {
            closeSearch();
        }
    });
}

// ===== BLOG CARD INTERACTIONS =====
function setupBlogCardInteractions() {
    const readMoreBtns = document.querySelectorAll('.btn-read-more');
    readMoreBtns.forEach((btn, idx) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.blog-card');
            if (!card) return;
            // Compose modal content from card
            const img = card.querySelector('img')?.outerHTML || '';
            const title = card.querySelector('.blog-title')?.textContent || '';
            const meta = card.querySelector('.blog-meta')?.outerHTML || '';
            const excerpt = card.querySelector('.blog-excerpt')?.textContent || '';
            const author = card.querySelector('.blog-author')?.outerHTML || '';
            const fullContent = `
                <div class="modal-blog-image">${img}</div>
                <h2 class="modal-blog-title">${title}</h2>
                <div class="modal-blog-meta">${meta}</div>
                <div class="modal-blog-content">${excerpt} <br><br><em>(Full article coming soon...)</em></div>
                <div class="modal-blog-author">${author}</div>
            `;
            openBlogModal(fullContent);
        });
    });
}

// ===== MODAL & TOAST LOGIC =====
function openBlogModal(contentHtml) {
    modalBody.innerHTML = contentHtml;
    blogModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBlogModal() {
    blogModal.classList.remove('active');
    document.body.style.overflow = '';
}

modalOverlay.addEventListener('click', closeBlogModal);
modalClose.addEventListener('click', closeBlogModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && blogModal.classList.contains('active')) closeBlogModal();
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce scroll events
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

// Apply debouncing to scroll handlers
const debouncedParallax = debounce(handleParallaxEffect, 10);
const debouncedNavbarScroll = debounce(handleNavbarScroll, 10);
const debouncedBackToTop = debounce(handleBackToTopVisibility, 10);

// Replace original scroll listeners with debounced versions
window.removeEventListener('scroll', handleParallaxEffect);
window.removeEventListener('scroll', handleNavbarScroll);
window.removeEventListener('scroll', handleBackToTopVisibility);

window.addEventListener('scroll', debouncedParallax);
window.addEventListener('scroll', debouncedNavbarScroll);
window.addEventListener('scroll', debouncedBackToTop);

// ===== ACCESSIBILITY =====
// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
    
    // Back to top with Page Up
    if (e.key === 'Home' && e.ctrlKey) {
        e.preventDefault();
        scrollToTop();
    }
});

// Focus management for mobile menu
navMenu.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        const focusableElements = navMenu.querySelectorAll('a[href]');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;
