// Enhanced E-Commerce Platform - Full Professional Implementation
// Developer: Arun L Kumar
// Contact: arunkumar582004@gmail.com
// GitHub: https://github.com/arun-l-kumar
// LinkedIn: https://linkedin.com/in/arun-l-kumar

console.log('🚀 StyleHub - Enhanced E-Commerce Platform Loaded Successfully!');
console.log('👨‍💻 Developed by: Arun L Kumar');
console.log('📧 Contact: arunkumar582004@gmail.com');

// Immediate loading screen hide fallback
const hideLoadingScreen = () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        console.log('Hiding loading screen...');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            console.log('Loading screen hidden!');
        }, 500);
    }
};

// Hide loading screen immediately if page is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideLoadingScreen);
} else {
    hideLoadingScreen();
}

// Enhanced E-Commerce Website JavaScript
class ECommerceApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.heroSlideIndex = 0;
        this.isAutoSliding = true;
        this.testimonialIndex = 0;
        this.isTestimonialAutoSliding = true;
        this.mousePosition = { x: 0, y: 0 };
        this.isLoading = false;
        
        this.products = [
            {
                id: 1,
                name: 'Premium Cotton Shirt',
                category: 'clothing',
                price: 39.99,
                originalPrice: 49.99,
                image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
                rating: 4.5,
                colors: ['#3498db', '#e74c3c', '#2ecc71'],
                sizes: ['S', 'M', 'L', 'XL'],
                badge: 'new',
                discount: 20,
                stock: 15,
                description: 'High-quality cotton shirt with premium finish and comfortable fit'
            },
            {
                id: 2,
                name: 'Athletic Running Shoes',
                category: 'shoes',
                price: 89.99,
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
                rating: 5.0,
                colors: ['#000', '#fff', '#e74c3c'],
                sizes: ['7', '8', '9', '10', '11'],
                badge: 'bestseller',
                stock: 8,
                description: 'Professional running shoes with advanced cushioning technology'
            },
            {
                id: 3,
                name: 'Designer Graphic T-Shirt',
                category: 'clothing',
                price: 24.99,
                originalPrice: 34.99,
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
                rating: 4.2,
                colors: ['#34495e', '#e74c3c', '#f39c12'],
                sizes: ['XS', 'S', 'M', 'L'],
                badge: 'sale',
                discount: 30,
                stock: 25,
                description: 'Trendy graphic t-shirt with unique design and soft fabric'
            },
            {
                id: 4,
                name: 'Luxury Smartwatch',
                category: 'accessories',
                price: 299.99,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
                rating: 4.7,
                colors: ['#000', '#95a5a6', '#f39c12'],
                badge: 'limited',
                stock: 5,
                description: 'Advanced smartwatch with health monitoring and GPS features'
            },
            {
                id: 5,
                name: 'Wireless Bluetooth Headphones',
                category: 'accessories',
                price: 149.99,
                originalPrice: 199.99,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
                rating: 4.8,
                colors: ['#000', '#fff', '#3498db'],
                badge: 'trending',
                discount: 25,
                stock: 12,
                description: 'Premium wireless headphones with noise cancellation'
            },
            {
                id: 6,
                name: 'Leather Crossbody Bag',
                category: 'accessories',
                price: 79.99,
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
                rating: 4.6,
                colors: ['#8B4513', '#000', '#654321'],
                badge: 'new',
                stock: 18,
                description: 'Genuine leather crossbody bag with multiple compartments'
            },
            {
                id: 7,
                name: 'Casual Denim Jeans',
                category: 'clothing',
                price: 59.99,
                originalPrice: 79.99,
                image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
                rating: 4.3,
                colors: ['#4169E1', '#000080', '#36454F'],
                sizes: ['28', '30', '32', '34', '36'],
                badge: 'sale',
                discount: 25,
                stock: 22,
                description: 'Comfortable denim jeans with modern fit and premium quality'
            },
            {
                id: 8,
                name: 'Minimalist Sunglasses',
                category: 'accessories',
                price: 45.99,
                image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
                rating: 4.4,
                colors: ['#000', '#8B4513', '#708090'],
                badge: 'trending',
                stock: 30,
                description: 'Stylish sunglasses with UV protection and lightweight frame'
            },
            {
                id: 9,
                name: 'Fitness Tracker Watch',
                category: 'accessories',
                price: 129.99,
                originalPrice: 159.99,
                image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
                rating: 4.5,
                colors: ['#000', '#e74c3c', '#2ecc71'],
                badge: 'bestseller',
                discount: 19,
                stock: 14,
                description: 'Advanced fitness tracker with heart rate monitoring'
            },
            {
                id: 10,
                name: 'Premium Hoodie',
                category: 'clothing',
                price: 69.99,
                image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
                rating: 4.7,
                colors: ['#2F4F4F', '#800080', '#000'],
                sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                badge: 'new',
                stock: 16,
                description: 'Comfortable premium hoodie with soft fleece lining'
            },
            {
                id: 11,
                name: 'Casual Sneakers',
                category: 'shoes',
                price: 99.99,
                originalPrice: 129.99,
                image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
                rating: 4.6,
                colors: ['#fff', '#000', '#DC143C'],
                sizes: ['7', '8', '9', '10', '11', '12'],
                badge: 'sale',
                discount: 23,
                stock: 20,
                description: 'Comfortable casual sneakers for everyday wear'
            },
            {
                id: 12,
                name: 'Professional Laptop Backpack',
                category: 'accessories',
                price: 89.99,
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
                rating: 4.8,
                colors: ['#000', '#2F4F4F', '#8B4513'],
                badge: 'trending',
                stock: 11,
                description: 'Durable laptop backpack with multiple compartments and USB port'
            }
        ];

        this.searchSuggestions = [
            'Premium Cotton Shirt', 'Athletic Running Shoes', 'Designer T-Shirt', 
            'Luxury Smartwatch', 'Casual Wear', 'Sports Shoes', 'Accessories'
        ];

        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.initTheme();
        this.renderProducts(); // Add this line to render products dynamically
        this.updateCartCount();
        this.updateWishlistCount();
        this.updateWishlistButtons();
        this.startHeroSlider();
        this.startTestimonialSlider();
        this.initScrollEffects();
        this.initAnimationObserver();
        this.initCursorEffect();
        this.initFAQ();
        this.init3DEffects();
        this.initFloatingActionButtons();
        this.initContactForm();
        this.initScrollSpy();
        setTimeout(() => this.hideLoadingScreen(), 2000);
        
        // Trigger counter animation after page load
        setTimeout(() => this.triggerCounterAnimation(), 3000);
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            loadingScreen.style.opacity = '1';
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchSuggestions = document.getElementById('searchSuggestions');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('blur', () => {
                setTimeout(() => {
                    if (searchSuggestions) searchSuggestions.style.display = 'none';
                }, 200);
            });
        }

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(link);
            });
        });

        // Cart functionality
        const cartIcon = document.getElementById('cartIcon');
        const cartSidebar = document.getElementById('cartSidebar');
        const closeCart = document.getElementById('closeCart');

        if (cartIcon) {
            cartIcon.addEventListener('click', () => {
                cartSidebar?.classList.add('open');
                this.renderCartItems();
            });
        }

        if (closeCart) {
            closeCart.addEventListener('click', () => {
                cartSidebar?.classList.remove('open');
            });
        }

        // Product interactions
        this.setupProductEventListeners();

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.handleFilter(btn.dataset.filter);
            });
        });

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.handleViewToggle(btn.dataset.view);
            });
        });

        // Hero slider controls
        const prevBtn = document.querySelector('.hero-nav.prev');
        const nextBtn = document.querySelector('.hero-nav.next');
        const indicators = document.querySelectorAll('.indicator');

        if (prevBtn) prevBtn.addEventListener('click', () => this.previousSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Hero buttons
        document.querySelectorAll('.cta-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleHeroButton(btn);
            });
        });

        // Testimonial controls
        const testimonialPrev = document.querySelector('.testimonial-prev');
        const testimonialNext = document.querySelector('.testimonial-next');
        
        if (testimonialPrev) testimonialPrev.addEventListener('click', () => this.previousTestimonial());
        if (testimonialNext) testimonialNext.addEventListener('click', () => this.nextTestimonial());

        // Back to top
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Newsletter
        const newsletterBtn = document.querySelector('.newsletter-btn');
        if (newsletterBtn) {
            newsletterBtn.addEventListener('click', () => this.handleNewsletter());
        }

        // Live chat
        const liveChatBtn = document.getElementById('liveChatBtn');
        if (liveChatBtn) {
            liveChatBtn.addEventListener('click', () => this.openLiveChat());
        }

        // Load more products
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreProducts());
        }

        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Mouse move for cursor effect
        document.addEventListener('mousemove', (e) => {
            this.mousePosition = { x: e.clientX, y: e.clientY };
            this.updateCursorEffect();
        });

        // Modal close
        const modalOverlay = document.getElementById('quickViewModal');
        const closeModal = document.getElementById('closeModal');
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) this.closeModal();
            });
        }

        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeModal());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                document.getElementById('cartSidebar')?.classList.remove('open');
            }
        });
    }

    setupProductEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = parseInt(btn.dataset.id);
                this.addToCart(productId);
            });
        });

        // Wishlist buttons
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = parseInt(btn.dataset.id);
                this.toggleWishlist(productId);
            });
        });

        // Quick view buttons
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = parseInt(btn.dataset.id);
                this.showQuickView(productId);
            });
        });

        // Product variants
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', () => {
                const container = option.closest('.product-variants');
                container.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });

        document.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', () => {
                const container = option.closest('.product-variants');
                container.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });
    }

    handleNavigation(link) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get the target section
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Smooth scroll to target section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    }

    handleHeroButton(button) {
        const buttonText = button.textContent.trim();
        
        // Add button animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        switch (buttonText) {
            case 'Shop Now':
                this.showNotification('Taking you to our products!', 'success');
                // Scroll to products section
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                break;
                
            case 'View Collection':
                this.showNotification('Displaying our full collection!', 'success');
                // Scroll to products section and show all products
                const productsSection2 = document.getElementById('products');
                if (productsSection2) {
                    productsSection2.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Reset filter to show all products
                    setTimeout(() => {
                        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                        document.querySelector('.filter-btn[data-filter="all"]')?.classList.add('active');
                        this.handleFilter('all');
                    }, 500);
                }
                break;
                
            case 'Explore':
                this.showNotification('Exploring our story!', 'success');
                // Scroll to about section
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                break;
                
            case 'Learn More':
                this.showNotification('Learn about our services!', 'success');
                // Scroll to services section
                const servicesSection = document.querySelector('.services-section');
                if (servicesSection) {
                    servicesSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                break;
                
            default:
                this.showNotification('Button clicked!', 'info');
                console.log('Hero button clicked:', buttonText);
                break;
        }
    }

    initTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        // Apply theme to body class for additional styling
        document.body.className = this.currentTheme === 'dark' ? 'dark-theme' : 'light-theme';
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        document.body.className = this.currentTheme === 'dark' ? 'dark-theme' : 'light-theme';
        localStorage.setItem('theme', this.currentTheme);
        
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }

        // Add smooth transition effect
        document.documentElement.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);

        this.showNotification(`Switched to ${this.currentTheme} theme`, 'success');
    }

    handleSearch(query) {
        const suggestions = document.getElementById('searchSuggestions');
        if (!suggestions) return;

        if (query.length === 0) {
            suggestions.style.display = 'none';
            return;
        }

        const filteredSuggestions = this.searchSuggestions.filter(item =>
            item.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredSuggestions.length > 0) {
            suggestions.innerHTML = filteredSuggestions.map(suggestion => `
                <div class="suggestion-item" onclick="ecommerceApp.selectSuggestion('${suggestion}')">
                    ${suggestion}
                </div>
            `).join('');
            suggestions.style.display = 'block';
        } else {
            suggestions.style.display = 'none';
        }
    }

    selectSuggestion(suggestion) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = suggestion;
        }
        document.getElementById('searchSuggestions').style.display = 'none';
        this.performSearch(suggestion);
    }

    // Function to render products dynamically
    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        // Clear existing products
        const existingProducts = productsGrid.querySelectorAll('.product-card');
        existingProducts.forEach(product => product.remove());

        // Render all products
        this.products.forEach(product => {
            const productCard = this.createProductCard(product);
            productsGrid.appendChild(productCard);
        });

        // Re-setup event listeners for new products
        this.setupProductEventListeners();
    }

    // Create product card HTML
    createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-overlay">
                    <button class="overlay-btn wishlist-btn" data-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="overlay-btn quick-view-btn" data-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="overlay-btn compare-btn" data-id="${product.id}">
                        <i class="fas fa-exchange-alt"></i>
                    </button>
                </div>
                ${product.badge ? `<span class="product-badge ${product.badge.toLowerCase()}">${product.badge}</span>` : ''}
                ${product.discount ? `<span class="product-discount">-${product.discount}%</span>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${this.generateStars(product.rating)}
                    </div>
                    <span class="rating-text">(${product.rating})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                </div>
                ${this.generateProductVariants(product)}
                <button class="add-to-cart-btn" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        `;
        
        return productCard;
    }

    // Generate stars for rating
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    // Generate product variants
    generateProductVariants(product) {
        let variants = '<div class="product-variants">';
        
        if (product.colors) {
            variants += '<div class="color-options">';
            product.colors.forEach((color, index) => {
                const borderStyle = color === '#fff' ? 'border: 1px solid #ddd;' : '';
                const activeClass = index === 0 ? 'active' : '';
                variants += `<span class="color-option ${activeClass}" style="background-color: ${color}; ${borderStyle}"></span>`;
            });
            variants += '</div>';
        }
        
        if (product.sizes) {
            variants += '<div class="size-options">';
            product.sizes.forEach((size, index) => {
                const activeClass = index === 1 ? 'active' : '';
                variants += `<span class="size-option ${activeClass}">${size}</span>`;
            });
            variants += '</div>';
        }
        
        variants += '</div>';
        return variants;
    }

    // Enhanced load more functionality
    loadMoreProducts() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const btn = document.getElementById('loadMoreBtn');
        
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            btn.disabled = true;
        }

        // Simulate API call
        setTimeout(() => {
            const newProducts = [
                {
                    id: 13,
                    name: 'Vintage Leather Jacket',
                    category: 'clothing',
                    price: 189.99,
                    originalPrice: 249.99,
                    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
                    rating: 4.9,
                    colors: ['#000', '#8B4513', '#654321'],
                    sizes: ['S', 'M', 'L', 'XL'],
                    badge: 'limited',
                    discount: 24,
                    stock: 7,
                    description: 'Premium vintage leather jacket with timeless design'
                },
                {
                    id: 14,
                    name: 'Wireless Earbuds Pro',
                    category: 'accessories',
                    price: 199.99,
                    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
                    rating: 4.8,
                    colors: ['#000', '#fff', '#3498db'],
                    badge: 'bestseller',
                    stock: 25,
                    description: 'Professional wireless earbuds with noise cancellation'
                },
                {
                    id: 15,
                    name: 'Athletic Yoga Set',
                    category: 'clothing',
                    price: 79.99,
                    originalPrice: 99.99,
                    image: 'https://images.unsplash.com/photo-1506629905607-d00d1b4c5b9b?w=400&h=400&fit=crop',
                    rating: 4.6,
                    colors: ['#e74c3c', '#2ecc71', '#9b59b6'],
                    sizes: ['XS', 'S', 'M', 'L'],
                    badge: 'trending',
                    discount: 20,
                    stock: 19,
                    description: 'Comfortable yoga set for active lifestyle'
                },
                {
                    id: 16,
                    name: 'Professional Camera',
                    category: 'accessories',
                    price: 599.99,
                    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop',
                    rating: 4.9,
                    colors: ['#000', '#34495e'],
                    badge: 'new',
                    stock: 6,
                    description: 'High-quality digital camera for professional photography'
                }
            ];

            // Add new products to the array
            this.products = [...this.products, ...newProducts];
            
            // Render new products
            const productsGrid = document.getElementById('productsGrid');
            if (productsGrid) {
                newProducts.forEach(product => {
                    const productCard = this.createProductCard(product);
                    productCard.style.opacity = '0';
                    productCard.style.transform = 'translateY(20px)';
                    productsGrid.appendChild(productCard);
                    
                    // Animate in
                    setTimeout(() => {
                        productCard.style.transition = 'all 0.5s ease-out';
                        productCard.style.opacity = '1';
                        productCard.style.transform = 'translateY(0)';
                    }, 100);
                });
            }

            // Re-setup event listeners
            this.setupProductEventListeners();
            
            this.showNotification('New products loaded!', 'success');
            
            if (btn) {
                btn.innerHTML = '<i class="fas fa-plus"></i> Load More Products';
                btn.disabled = false;
            }
            
            this.isLoading = false;
        }, 1500);
    }

    // Enhanced search functionality
    performSearch(query) {
        const normalizedQuery = query.toLowerCase().trim();
        const products = document.querySelectorAll('.product-card');
        let visibleCount = 0;
        
        products.forEach(product => {
            const title = product.querySelector('.product-title').textContent.toLowerCase();
            const category = product.querySelector('.product-category').textContent.toLowerCase();
            
            if (title.includes(normalizedQuery) || category.includes(normalizedQuery) || normalizedQuery === '') {
                product.style.display = 'block';
                product.style.animation = 'fadeInUp 0.5s ease-out';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        // Update search results message
        const resultsMessage = document.getElementById('searchResults');
        if (resultsMessage) {
            resultsMessage.textContent = `Found ${visibleCount} products${query ? ` for "${query}"` : ''}`;
        }

        if (query) {
            this.showNotification(`Found ${visibleCount} products for "${query}"`, 'info');
        }
    }

    // Enhanced filter functionality
    handleFilter(filter) {
        const products = document.querySelectorAll('.product-card');
        let visibleCount = 0;
        
        products.forEach(product => {
            const productCategory = product.dataset.category;
            
            if (filter === 'all' || productCategory === filter) {
                product.style.display = 'block';
                product.style.animation = 'fadeInUp 0.5s ease-out';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        // Update filter message
        const filterMessage = document.getElementById('filterResults');
        if (filterMessage) {
            filterMessage.textContent = `Showing ${visibleCount} ${filter === 'all' ? 'products' : filter + ' products'}`;
        }

        this.showNotification(`Filtered to ${filter === 'all' ? 'all products' : filter}`, 'info');
    }

    // Enhanced wishlist functionality
    updateWishlistButtons() {
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const productId = parseInt(btn.dataset.id);
            const isInWishlist = this.wishlist.some(item => item.id === productId);
            const icon = btn.querySelector('i');
            
            if (isInWishlist) {
                icon.className = 'fas fa-heart';
                btn.style.color = '#e74c3c';
                btn.classList.add('in-wishlist');
            } else {
                icon.className = 'far fa-heart';
                btn.style.color = '';
                btn.classList.remove('in-wishlist');
            }
        });
    }

    // Enhanced cart functionality
    getSelectedVariants(productId) {
        const productCard = document.querySelector(`[data-id="${productId}"]`).closest('.product-card');
        const selectedColor = productCard.querySelector('.color-option.active')?.style.backgroundColor || null;
        const selectedSize = productCard.querySelector('.size-option.active')?.textContent || null;
        
        return { selectedColor, selectedSize };
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const variants = this.getSelectedVariants(productId);
        
        const existingItem = this.cart.find(item => 
            item.id === productId && 
            item.selectedColor === variants.selectedColor && 
            item.selectedSize === variants.selectedSize
        );
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1,
                selectedColor: variants.selectedColor,
                selectedSize: variants.selectedSize
            });
        }

        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
        this.showNotification(`${product.name} added to cart!`, 'success');
        this.animateCartIcon();
    }

    getSelectedColor(productId) {
        const productCard = document.querySelector(`[data-id="${productId}"]`).closest('.product-card');
        const activeColor = productCard.querySelector('.color-option.active');
        return activeColor ? activeColor.style.backgroundColor : null;
    }

    getSelectedSize(productId) {
        const productCard = document.querySelector(`[data-id="${productId}"]`).closest('.product-card');
        const activeSize = productCard.querySelector('.size-option.active');
        return activeSize ? activeSize.textContent : null;
    }

    toggleWishlist(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingIndex = this.wishlist.findIndex(item => item.id === productId);
        
        if (existingIndex > -1) {
            this.wishlist.splice(existingIndex, 1);
            this.showNotification(`${product.name} removed from wishlist`, 'info');
        } else {
            this.wishlist.push(product);
            this.showNotification(`${product.name} added to wishlist!`, 'success');
        }

        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistCount();
        this.updateWishlistButtons();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            if (totalItems > 0) {
                cartCount.style.display = 'flex';
                cartCount.style.animation = 'bounce 0.5s ease-out';
            } else {
                cartCount.style.display = 'none';
            }
        }
    }

    updateWishlistCount() {
        const wishlistCount = document.querySelector('.wishlist-count');
        if (wishlistCount) {
            wishlistCount.textContent = this.wishlist.length;
            
            if (this.wishlist.length > 0) {
                wishlistCount.style.display = 'flex';
                wishlistCount.style.animation = 'bounce 0.5s ease-out';
            } else {
                wishlistCount.style.display = 'none';
            }
        }
    }

    renderCartItems() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (!cartItems || !cartTotal) return;

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            cartTotal.textContent = '0.00';
            return;
        }

        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-variants">
                        ${item.selectedSize ? `Size: ${item.selectedSize}` : ''} 
                        ${item.selectedColor ? `• Color: ${item.selectedColor}` : ''}
                    </p>
                    <div class="quantity-controls">
                        <button onclick="ecommerceApp.updateCartQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="ecommerceApp.updateCartQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="item-price">
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                    <button onclick="ecommerceApp.removeFromCart(${item.id})" class="remove-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }

    updateCartQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.updateCartCount();
            this.renderCartItems();
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
        this.renderCartItems();
        this.showNotification('Item removed from cart', 'info');
    }

    showQuickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('quickViewModal');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalBody) return;

        modalBody.innerHTML = `
            <div class="quick-view-content">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details">
                    <h2>${product.name}</h2>
                    <div class="product-rating">
                        <div class="stars">
                            ${Array(5).fill('').map((_, i) => 
                                `<i class="fas fa-star${i < Math.floor(product.rating) ? '' : (i < product.rating ? '-half-alt' : ' far')}"></i>`
                            ).join('')}
                        </div>
                        <span>(${product.rating})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-variants">
                        ${product.colors ? `
                            <div class="color-options">
                                <h4>Colors:</h4>
                                ${product.colors.map(color => `
                                    <span class="color-option" style="background-color: ${color};"></span>
                                `).join('')}
                            </div>
                        ` : ''}
                        ${product.sizes ? `
                            <div class="size-options">
                                <h4>Sizes:</h4>
                                ${product.sizes.map(size => `
                                    <span class="size-option">${size}</span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    <button class="add-to-cart-btn" onclick="ecommerceApp.addToCart(${product.id}); ecommerceApp.closeModal();">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('open');
    }

    closeModal() {
        const modal = document.getElementById('quickViewModal');
        if (modal) {
            modal.classList.remove('open');
        }
    }

    handleFilter(filter) {
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            if (filter === 'all' || product.dataset.category === filter) {
                product.style.display = 'block';
                product.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                product.style.display = 'none';
            }
        });
    }

    handleViewToggle(view) {
        const productsGrid = document.getElementById('productsGrid');
        if (productsGrid) {
            productsGrid.className = view === 'grid' ? 'products-grid' : 'products-list';
        }
    }

    startHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        const indicators = document.querySelectorAll('.indicator');
        
        if (slides.length === 0) return;

        setInterval(() => {
            if (this.isAutoSliding) {
                this.nextSlide();
            }
        }, 5000);
    }

    nextSlide() {
        const slides = document.querySelectorAll('.hero-slide');
        const indicators = document.querySelectorAll('.indicator');
        
        if (slides.length === 0) return;

        slides[this.heroSlideIndex].classList.remove('active');
        indicators[this.heroSlideIndex].classList.remove('active');
        
        this.heroSlideIndex = (this.heroSlideIndex + 1) % slides.length;
        
        slides[this.heroSlideIndex].classList.add('active');
        indicators[this.heroSlideIndex].classList.add('active');
    }

    previousSlide() {
        const slides = document.querySelectorAll('.hero-slide');
        const indicators = document.querySelectorAll('.indicator');
        
        if (slides.length === 0) return;

        slides[this.heroSlideIndex].classList.remove('active');
        indicators[this.heroSlideIndex].classList.remove('active');
        
        this.heroSlideIndex = this.heroSlideIndex === 0 ? slides.length - 1 : this.heroSlideIndex - 1;
        
        slides[this.heroSlideIndex].classList.add('active');
        indicators[this.heroSlideIndex].classList.add('active');
    }

    goToSlide(index) {
        const slides = document.querySelectorAll('.hero-slide');
        const indicators = document.querySelectorAll('.indicator');
        
        if (slides.length === 0) return;

        slides[this.heroSlideIndex].classList.remove('active');
        indicators[this.heroSlideIndex].classList.remove('active');
        
        this.heroSlideIndex = index;
        
        slides[this.heroSlideIndex].classList.add('active');
        indicators[this.heroSlideIndex].classList.add('active');
    }

    startTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        
        if (testimonials.length === 0) return;

        setInterval(() => {
            if (this.isTestimonialAutoSliding) {
                this.nextTestimonial();
            }
        }, 4000);
    }

    nextTestimonial() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        
        if (testimonials.length === 0) return;

        testimonials[this.testimonialIndex].classList.remove('active');
        this.testimonialIndex = (this.testimonialIndex + 1) % testimonials.length;
        testimonials[this.testimonialIndex].classList.add('active');
    }

    previousTestimonial() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        
        if (testimonials.length === 0) return;

        testimonials[this.testimonialIndex].classList.remove('active');
        this.testimonialIndex = this.testimonialIndex === 0 ? testimonials.length - 1 : this.testimonialIndex - 1;
        testimonials[this.testimonialIndex].classList.add('active');
    }

    handleScroll() {
        const header = document.getElementById('header');
        const backToTop = document.getElementById('backToTop');
        
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Animate stats on scroll
        const statsSection = document.querySelector('.stats-section');
        if (statsSection && this.isElementInViewport(statsSection)) {
            this.animateCounters();
        }

        // Animate partner stats on scroll
        const partnersSection = document.querySelector('.partners-section');
        if (partnersSection && this.isElementInViewport(partnersSection)) {
            this.animateCounters();
        }
    }

    initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe all major sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    initAnimationObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.product-card, .service-card, .feature-item').forEach(el => {
            observer.observe(el);
        });
    }

    initCursorEffect() {
        const cursor = document.getElementById('cursorEffect');
        if (!cursor) return;

        document.addEventListener('mousemove', () => {
            cursor.classList.add('active');
        });

        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    }

    updateCursorEffect() {
        const cursor = document.getElementById('cursorEffect');
        if (cursor) {
            cursor.style.left = this.mousePosition.x + 'px';
            cursor.style.top = this.mousePosition.y + 'px';
        }
    }

    initFAQ() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.closest('.faq-item');
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }

    init3DEffects() {
        // Enhanced 3D product model interactions
        document.querySelectorAll('.product-3d-model').forEach(model => {
            let isMouseDown = false;
            let startX = 0;
            let startY = 0;
            let currentRotationY = 0;
            let currentRotationX = 0;
            let animationId = null;

            // Auto-rotation animation
            const autoRotate = () => {
                if (!isMouseDown && !model.matches(':hover')) {
                    currentRotationY += 0.5;
                    model.style.transform = `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;
                }
                animationId = requestAnimationFrame(autoRotate);
            };

            // Start auto-rotation
            autoRotate();

            // Mouse interaction events
            model.addEventListener('mousedown', (e) => {
                isMouseDown = true;
                startX = e.clientX;
                startY = e.clientY;
                model.style.cursor = 'grabbing';
                e.preventDefault();
            });

            model.addEventListener('mousemove', (e) => {
                if (!isMouseDown) return;
                
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                const rotationY = currentRotationY + deltaX * 0.5;
                const rotationX = Math.max(-45, Math.min(45, currentRotationX - deltaY * 0.3));
                
                model.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
            });

            model.addEventListener('mouseup', () => {
                if (isMouseDown) {
                    isMouseDown = false;
                    model.style.cursor = 'grab';
                    const transform = model.style.transform;
                    const rotateYMatch = transform.match(/rotateY\(([^)]+)\)/);
                    const rotateXMatch = transform.match(/rotateX\(([^)]+)\)/);
                    
                    currentRotationY = parseFloat(rotateYMatch?.[1] || 0);
                    currentRotationX = parseFloat(rotateXMatch?.[1] || 0);
                }
            });

            // Touch events for mobile
            model.addEventListener('touchstart', (e) => {
                isMouseDown = true;
                const touch = e.touches[0];
                startX = touch.clientX;
                startY = touch.clientY;
                e.preventDefault();
            });

            model.addEventListener('touchmove', (e) => {
                if (!isMouseDown) return;
                
                const touch = e.touches[0];
                const deltaX = touch.clientX - startX;
                const deltaY = touch.clientY - startY;
                const rotationY = currentRotationY + deltaX * 0.5;
                const rotationX = Math.max(-45, Math.min(45, currentRotationX - deltaY * 0.3));
                
                model.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
                e.preventDefault();
            });

            model.addEventListener('touchend', () => {
                if (isMouseDown) {
                    isMouseDown = false;
                    const transform = model.style.transform;
                    const rotateYMatch = transform.match(/rotateY\(([^)]+)\)/);
                    const rotateXMatch = transform.match(/rotateX\(([^)]+)\)/);
                    
                    currentRotationY = parseFloat(rotateYMatch?.[1] || 0);
                    currentRotationX = parseFloat(rotateXMatch?.[1] || 0);
                }
            });

            // Hover effects
            model.addEventListener('mouseenter', () => {
                model.style.cursor = 'grab';
            });

            model.addEventListener('mouseleave', () => {
                model.style.cursor = 'default';
            });

            // Clean up animation when element is removed
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.removedNodes.forEach((node) => {
                            if (node === model && animationId) {
                                cancelAnimationFrame(animationId);
                            }
                        });
                    }
                });
            });
            
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }

    initFloatingActionButtons() {
        const mainFab = document.getElementById('mainFab');
        const fabContainer = document.querySelector('.fab-container');
        
        if (mainFab && fabContainer) {
            mainFab.addEventListener('click', () => {
                fabContainer.classList.toggle('active');
                
                // Update main FAB icon
                const icon = mainFab.querySelector('i');
                if (fabContainer.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                    mainFab.style.transform = 'rotate(45deg)';
                } else {
                    icon.className = 'fas fa-plus';
                    mainFab.style.transform = 'rotate(0deg)';
                }
            });
        }

        // Handle option fab clicks
        document.querySelectorAll('.option-fab').forEach(fab => {
            fab.addEventListener('click', () => {
                const tooltip = fab.dataset.tooltip;
                this.showNotification(`${tooltip} feature coming soon!`, 'info');
                
                // Add click animation
                fab.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    fab.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // Close FAB menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!fabContainer.contains(e.target) && fabContainer.classList.contains('active')) {
                fabContainer.classList.remove('active');
                const icon = mainFab.querySelector('i');
                icon.className = 'fas fa-plus';
                mainFab.style.transform = 'rotate(0deg)';
            }
        });
    }

    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Simulate form submission
            this.showNotification('Thank you! Your message has been sent.', 'success');
            contactForm.reset();
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            if (counter.classList.contains('animated')) return;
            
            const targetStr = counter.dataset.target;
            if (!targetStr) return; // Skip if no target attribute
            
            const target = parseFloat(targetStr);
            if (isNaN(target)) return; // Skip if no valid target
            
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                
                // Format based on the target value and type
                if (target >= 1000000) {
                    // For millions
                    const displayValue = Math.floor(current / 1000000);
                    counter.textContent = displayValue + 'M+';
                } else if (target >= 1000) {
                    // For thousands
                    const displayValue = Math.floor(current / 1000);
                    counter.textContent = displayValue + 'K+';
                } else if (target < 10 && target % 1 !== 0) {
                    // For decimal values like rating
                    counter.textContent = Math.min(current, target).toFixed(1);
                } else {
                    // For regular numbers
                    counter.textContent = Math.floor(current);
                }
                
                if (current >= target) {
                    // Final formatting
                    if (target >= 1000000) {
                        counter.textContent = Math.floor(target / 1000000) + 'M+';
                    } else if (target >= 1000) {
                        counter.textContent = Math.floor(target / 1000) + 'K+';
                    } else if (target < 10 && target % 1 !== 0) {
                        counter.textContent = target.toFixed(1);
                    } else {
                        counter.textContent = target;
                    }
                    clearInterval(timer);
                }
            }, 20);
            
            counter.classList.add('animated');
        });
    }

    // Manual trigger for counter animation (for testing)
    triggerCounterAnimation() {
        // Reset all counters first
        document.querySelectorAll('.stat-number').forEach(counter => {
            counter.classList.remove('animated');
        });
        
        // Then animate them
        this.animateCounters();
    }

    handleNewsletter() {
        const email = document.querySelector('.newsletter-input').value;
        if (this.isValidEmail(email)) {
            this.showNotification('Thank you for subscribing!', 'success');
            document.querySelector('.newsletter-input').value = '';
        } else {
            this.showNotification('Please enter a valid email address', 'error');
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    openLiveChat() {
        this.showNotification('Live chat feature coming soon!', 'info');
    }

    loadMoreProducts() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const btn = document.getElementById('loadMoreBtn');
        
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            btn.disabled = true;
        }

        // Simulate API call
        setTimeout(() => {
            const newProducts = [
                {
                    id: 13,
                    name: 'Vintage Leather Jacket',
                    category: 'clothing',
                    price: 189.99,
                    originalPrice: 249.99,
                    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
                    rating: 4.9,
                    colors: ['#000', '#8B4513', '#654321'],
                    sizes: ['S', 'M', 'L', 'XL'],
                    badge: 'limited',
                    discount: 24,
                    stock: 7,
                    description: 'Premium vintage leather jacket with timeless design'
                },
                {
                    id: 14,
                    name: 'Wireless Earbuds Pro',
                    category: 'accessories',
                    price: 199.99,
                    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
                    rating: 4.8,
                    colors: ['#000', '#fff', '#3498db'],
                    badge: 'bestseller',
                    stock: 25,
                    description: 'Professional wireless earbuds with noise cancellation'
                },
                {
                    id: 15,
                    name: 'Athletic Yoga Set',
                    category: 'clothing',
                    price: 79.99,
                    originalPrice: 99.99,
                    image: 'https://images.unsplash.com/photo-1506629905607-d00d1b4c5b9b?w=400&h=400&fit=crop',
                    rating: 4.6,
                    colors: ['#e74c3c', '#2ecc71', '#9b59b6'],
                    sizes: ['XS', 'S', 'M', 'L'],
                    badge: 'trending',
                    discount: 20,
                    stock: 19,
                    description: 'Comfortable yoga set for active lifestyle'
                },
                {
                    id: 16,
                    name: 'Professional Camera',
                    category: 'accessories',
                    price: 599.99,
                    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop',
                    rating: 4.9,
                    colors: ['#000', '#34495e'],
                    badge: 'new',
                    stock: 6,
                    description: 'High-quality digital camera for professional photography'
                }
            ];

            // Add new products to the array
            this.products = [...this.products, ...newProducts];
            
            // Render new products
            const productsGrid = document.getElementById('productsGrid');
            if (productsGrid) {
                newProducts.forEach(product => {
                    const productCard = this.createProductCard(product);
                    productCard.style.opacity = '0';
                    productCard.style.transform = 'translateY(20px)';
                    productsGrid.appendChild(productCard);
                    
                    // Animate in
                    setTimeout(() => {
                        productCard.style.transition = 'all 0.5s ease-out';
                        productCard.style.opacity = '1';
                        productCard.style.transform = 'translateY(0)';
                    }, 100);
                });
            }

            // Re-setup event listeners
            this.setupProductEventListeners();
            
            this.showNotification('New products loaded!', 'success');
            
            if (btn) {
                btn.innerHTML = '<i class="fas fa-plus"></i> Load More Products';
                btn.disabled = false;
            }
            
            this.isLoading = false;
        }, 1500);
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : type === 'warning' ? 'exclamation' : 'info'}"></i>
            <span>${message}</span>
        `;

        container.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                container.removeChild(notification);
            }, 300);
        }, 5000);
    }

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Real-time features
    startRealTimeFeatures() {
        // Simulate real-time stock updates
        setInterval(() => {
            this.updateStock();
        }, 30000);

        // Simulate real-time price updates
        setInterval(() => {
            this.updatePrices();
        }, 60000);

        // Update visitor count
        setInterval(() => {
            this.updateVisitorCount();
        }, 10000);
    }

    updateStock() {
        this.products.forEach(product => {
            // Simulate stock changes
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            product.stock = Math.max(0, Math.min(50, product.stock + change));
        });
    }

    updatePrices() {
        // Simulate minor price fluctuations for realism
        this.products.forEach(product => {
            const fluctuation = (Math.random() - 0.5) * 0.02; // ±1% change
            product.price = Math.max(0.99, product.price * (1 + fluctuation));
        });
    }

    updateVisitorCount() {
        // Simulate visitor count updates
        const currentCount = parseInt(document.querySelector('[data-target="50000"]')?.textContent || '0');
        const newCount = currentCount + Math.floor(Math.random() * 5) + 1;
        
        const counter = document.querySelector('[data-target="50000"]');
        if (counter) {
            counter.textContent = newCount;
        }
    }

    initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    // Update active navigation link
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-20% 0% -20% 0%'
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Enhanced Partner Section Interactions
class PartnerSection {
    constructor() {
        this.initializePartnerAnimations();
        this.initializeStatsCounter();
        this.initializePartnerHoverEffects();
    }

    initializePartnerAnimations() {
        // Add floating animation to partner cards
        const partnerCards = document.querySelectorAll('.partner-card');
        partnerCards.forEach((card, index) => {
            // Add staggered animation delay
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Add random gentle floating animation
            const randomFloat = Math.random() * 2 + 1; // 1-3 seconds
            card.style.setProperty('--float-duration', `${randomFloat}s`);
            
            // Add intersection observer for on-scroll animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(card);
        });
    }

    initializeStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    animateCounter(element) {
        const target = element.textContent;
        const numStr = target.replace(/[^0-9]/g, '');
        const num = parseInt(numStr);
        const suffix = target.replace(/[0-9]/g, '');
        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepValue = num / steps;
        const stepTime = duration / steps;

        let currentValue = 0;
        const timer = setInterval(() => {
            currentValue += stepValue;
            if (currentValue >= num) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(currentValue) + suffix;
            }
        }, stepTime);
    }

    initializePartnerHoverEffects() {
        const partnerCards = document.querySelectorAll('.partner-card');
        
        partnerCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add ripple effect
                this.createRippleEffect(card);
                
                // Add 3D tilt effect
                card.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg)';
                card.style.transformStyle = 'preserve-3d';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: 20px;
            height: 20px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            animation: rippleAnimation 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        // Add CSS animation keyframes if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes rippleAnimation {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(10);
                        opacity: 0;
                    }
                }
                
                .partner-card {
                    animation: partnerFloat var(--float-duration, 2s) ease-in-out infinite alternate;
                }
                
                @keyframes partnerFloat {
                    0% {
                        transform: translateY(0px);
                    }
                    100% {
                        transform: translateY(-5px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Initialize the E-Commerce App
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen after delay
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);

    window.ecommerceApp = new ECommerceApp();
    
    // Initialize Partner Section
    new PartnerSection();
    
    // Start real-time features
    ecommerceApp.startRealTimeFeatures();
    
    console.log('🎉 StyleHub E-Commerce Platform Initialized Successfully!');
    console.log('👨‍💻 Developed by Arun L Kumar');
    console.log('📧 Contact: arunkumar582004@gmail.com');
    console.log('🔗 LinkedIn: https://linkedin.com/in/arun-l-kumar');
    console.log('🔗 GitHub: https://github.com/arun-l-kumar');
});

// Handle page load errors gracefully
window.addEventListener('error', (e) => {
    console.warn('Non-critical error:', e.message);
    // Hide loading screen even if there are errors
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && loadingScreen.style.display !== 'none') {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
});

// Fallback loading screen removal
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 3000);
});

// Performance optimization - ServiceWorker registration
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered successfully');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed');
            });
    });
} else if (location.protocol === 'file:') {
    console.log('ServiceWorker not supported with file:// protocol. Use HTTP server for full functionality.');
}
