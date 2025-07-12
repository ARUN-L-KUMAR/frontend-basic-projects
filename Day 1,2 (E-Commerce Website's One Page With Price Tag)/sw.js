// Enhanced Service Worker for StyleHub E-Commerce Platform
// Version: 2.0.0
// Developer: Arun L Kumar
// Contact: arunkumar582004@gmail.com

const CACHE_NAME = 'stylehub-v2.0.0';
const STATIC_CACHE = 'stylehub-static-v2.0.0';
const DYNAMIC_CACHE = 'stylehub-dynamic-v2.0.0';
const IMAGE_CACHE = 'stylehub-images-v2.0.0';

// Static assets to cache
const STATIC_ASSETS = [
    '/',
    '/html/enhanced-index.html',
    '/css/enhanced-style.css',
    '/js/enhanced-script.js',
    '/manifest.json',
    '/image/shirt1.jpg',
    '/image/shoe.jpg',
    '/image/T-shirt.jpg',
    '/image/s-half-sleeve-printed.webp',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css',
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'
];

// Dynamic content patterns
const DYNAMIC_PATTERNS = [
    'https://images.unsplash.com',
    'https://api.stylehub.com'
];

// Install event
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker: Installing...');
    
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE).then((cache) => {
                console.log('📦 Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            }),
            caches.open(DYNAMIC_CACHE),
            caches.open(IMAGE_CACHE)
        ])
    );
    
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== STATIC_CACHE && 
                        cacheName !== DYNAMIC_CACHE && 
                        cacheName !== IMAGE_CACHE) {
                        console.log('🗑️ Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Handle different types of requests
    if (request.destination === 'image') {
        event.respondWith(handleImageRequest(request));
    } else if (STATIC_ASSETS.includes(request.url) || request.url.includes('cdnjs.cloudflare.com')) {
        event.respondWith(handleStaticRequest(request));
    } else if (DYNAMIC_PATTERNS.some(pattern => request.url.includes(pattern))) {
        event.respondWith(handleDynamicRequest(request));
    } else {
        event.respondWith(handleDefaultRequest(request));
    }
});

// Handle static asset requests
async function handleStaticRequest(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, networkResponse.clone());
        
        return networkResponse;
    } catch (error) {
        console.error('Static request failed:', error);
        return caches.match('/html/enhanced-index.html');
    }
}

// Handle image requests
async function handleImageRequest(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(IMAGE_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Image request failed:', error);
        return new Response(
            '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="16" fill="#999">Image unavailable</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
        );
    }
}

// Handle dynamic content requests
async function handleDynamicRequest(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Dynamic request failed:', error);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        return new Response(
            JSON.stringify({ error: 'Content unavailable offline' }),
            { headers: { 'Content-Type': 'application/json' } }
        );
    }
}

// Handle default requests
async function handleDefaultRequest(request) {
    try {
        const networkResponse = await fetch(request);
        return networkResponse;
    } catch (error) {
        console.error('Default request failed:', error);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        return caches.match('/html/enhanced-index.html');
    }
}

// Push notification handling
self.addEventListener('push', (event) => {
    console.log('📨 Service Worker: Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/image/icon-192x192.png',
        badge: '/image/badge-72x72.png',
        tag: 'stylehub-notification',
        data: { url: '/' },
        actions: [
            { action: 'view', title: 'View' },
            { action: 'dismiss', title: 'Dismiss' }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('StyleHub', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    console.log('🔔 Service Worker: Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});

console.log('🎉 StyleHub Service Worker loaded successfully!');
console.log('👨‍💻 Developed by Arun L Kumar');
console.log('📧 Contact: arunkumar582004@gmail.com');
