// Enhanced Netflix Clone JavaScript - Real-time Features
class NetflixApp {
    constructor() {
        this.apiKey = '4e44d9029b1270a757cddc766a1bcb63'; // TMDB API key
        this.baseUrl = 'https://api.themoviedb.org/3';
        this.imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
        this.backdropBaseUrl = 'https://image.tmdb.org/t/p/original';
        
        this.init();
        this.setupEventListeners();
        this.loadTrendingMovies();
        this.setupScrollEffects();
        this.startRealTimeUpdates();
    }

    init() {
        this.showLoadingScreen();
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 2000);
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
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
        // Navigation scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Category navigation
        document.querySelectorAll('.category-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                const category = link.textContent.toLowerCase().replace(' ', '-');
                this.loadMoviesByCategory(category);
            });
        });

        // Banner buttons
        const playButton = document.querySelector('.banner_button.play');
        const infoButton = document.querySelector('.banner_button.info');
        
        if (playButton) {
            playButton.addEventListener('click', () => {
                this.playTrailer();
            });
        }

        if (infoButton) {
            infoButton.addEventListener('click', () => {
                this.showMovieInfo();
            });
        }

        // Search functionality
        this.setupSearch();
    }

    setupSearch() {
        // Create search input
        const nav = document.querySelector('.nav');
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" id="searchInput" placeholder="🔍 Search movies..." class="search-input">
            <div id="searchResults" class="search-results"></div>
        `;
        
        nav.insertBefore(searchContainer, nav.querySelector('.netflix-avatar'));

        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length > 2) {
                this.searchMovies(query);
            } else {
                searchResults.style.display = 'none';
            }
        });

        // Hide search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    async searchMovies(query) {
        try {
            const response = await fetch(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`);
            const data = await response.json();
            
            const searchResults = document.getElementById('searchResults');
            if (data.results && data.results.length > 0) {
                searchResults.innerHTML = data.results.slice(0, 5).map(movie => `
                    <div class="search-result-item" onclick="netflixApp.showMovieDetails(${movie.id})">
                        <img src="${movie.poster_path ? this.imageBaseUrl + movie.poster_path : 'https://via.placeholder.com/50x75'}" alt="${movie.title}">
                        <div>
                            <h4>${movie.title}</h4>
                            <p>${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                        </div>
                    </div>
                `).join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<div class="no-results">No movies found</div>';
                searchResults.style.display = 'block';
            }
        } catch (error) {
            console.error('Search error:', error);
        }
    }

    async loadTrendingMovies() {
        try {
            const response = await fetch(`${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`);
            const data = await response.json();
            
            if (data.results) {
                this.updateBannerMovie(data.results[0]);
                this.updateMovieSection('trending', data.results);
            }
        } catch (error) {
            console.error('Error loading trending movies:', error);
        }
    }

    async loadMoviesByCategory(category) {
        let endpoint = '';
        switch(category) {
            case 'trending':
                endpoint = '/trending/movie/week';
                break;
            case 'top-rated':
                endpoint = '/movie/top_rated';
                break;
            case 'action':
                endpoint = '/discover/movie?with_genres=28';
                break;
            case 'comedy':
                endpoint = '/discover/movie?with_genres=35';
                break;
            case 'horror':
                endpoint = '/discover/movie?with_genres=27';
                break;
            case 'romance':
                endpoint = '/discover/movie?with_genres=10749';
                break;
            case 'documentaries':
                endpoint = '/discover/movie?with_genres=99';
                break;
            default:
                endpoint = '/trending/movie/week';
        }

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}?api_key=${this.apiKey}`);
            const data = await response.json();
            
            if (data.results) {
                this.updateMovieSection(category, data.results);
            }
        } catch (error) {
            console.error(`Error loading ${category} movies:`, error);
        }
    }

    updateBannerMovie(movie) {
        const banner = document.querySelector('.banner');
        const bannerTitle = document.querySelector('.banner_title');
        const bannerDescription = document.querySelector('.banner_description');

        if (movie.backdrop_path) {
            banner.style.backgroundImage = `url(${this.backdropBaseUrl}${movie.backdrop_path})`;
        }

        if (bannerTitle) {
            bannerTitle.textContent = movie.title;
        }

        if (bannerDescription) {
            bannerDescription.textContent = movie.overview || 'No description available.';
        }

        // Store current banner movie for trailer
        this.currentBannerMovie = movie;
    }

    updateMovieSection(sectionId, movies) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const postersContainer = section.querySelector('.row_posters');
        if (!postersContainer) return;

        postersContainer.innerHTML = movies.map(movie => `
            <img 
                src="${movie.poster_path ? this.imageBaseUrl + movie.poster_path : 'https://via.placeholder.com/200x300'}" 
                class="row_poster" 
                alt="${movie.title}"
                onclick="netflixApp.showMovieDetails(${movie.id})"
                data-movie-id="${movie.id}"
            >
        `).join('');

        // Add hover effects
        this.setupPosterHoverEffects();
    }

    setupPosterHoverEffects() {
        document.querySelectorAll('.row_poster').forEach(poster => {
            poster.addEventListener('mouseenter', () => {
                poster.style.transform = 'scale(1.08) translateY(-10px)';
                poster.style.zIndex = '10';
                poster.style.boxShadow = '0 8px 25px rgba(0,0,0,0.8)';
            });
            
            poster.addEventListener('mouseleave', () => {
                poster.style.transform = 'scale(1) translateY(0)';
                poster.style.zIndex = '1';
                poster.style.boxShadow = 'none';
            });
        });
    }

    async showMovieDetails(movieId) {
        try {
            const response = await fetch(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&append_to_response=videos,credits`);
            const movie = await response.json();
            
            this.createMovieModal(movie);
        } catch (error) {
            console.error('Error loading movie details:', error);
        }
    }

    createMovieModal(movie) {
        // Remove existing modal
        const existingModal = document.getElementById('movieModal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'movieModal';
        modal.className = 'movie-modal';
        
        const trailer = movie.videos?.results?.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <div class="modal-header" style="background-image: url(${movie.backdrop_path ? this.backdropBaseUrl + movie.backdrop_path : ''})">
                    <div class="modal-header-content">
                        <h2>${movie.title}</h2>
                        <div class="movie-meta">
                            <span class="rating">⭐ ${movie.vote_average.toFixed(1)}</span>
                            <span class="year">${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
                            <span class="runtime">${movie.runtime ? movie.runtime + ' min' : 'N/A'}</span>
                        </div>
                        <div class="modal-buttons">
                            ${trailer ? `<button class="modal-btn play-btn" onclick="netflixApp.playVideo('${trailer.key}')">▶️ Play Trailer</button>` : ''}
                            <button class="modal-btn info-btn">➕ My List</button>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="movie-overview">
                        <h3>Overview</h3>
                        <p>${movie.overview || 'No overview available.'}</p>
                    </div>
                    <div class="movie-details">
                        <p><strong>Genres:</strong> ${movie.genres?.map(g => g.name).join(', ') || 'N/A'}</p>
                        <p><strong>Cast:</strong> ${movie.credits?.cast?.slice(0, 5).map(c => c.name).join(', ') || 'N/A'}</p>
                        <p><strong>Director:</strong> ${movie.credits?.crew?.find(c => c.job === 'Director')?.name || 'N/A'}</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'block';

        // Close modal events
        modal.querySelector('.close').addEventListener('click', () => {
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

    playVideo(videoKey) {
        const videoModal = document.createElement('div');
        videoModal.className = 'video-modal';
        videoModal.innerHTML = `
            <div class="video-container">
                <span class="video-close">&times;</span>
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/${videoKey}?autoplay=1" 
                    frameborder="0" 
                    allowfullscreen>
                </iframe>
            </div>
        `;

        document.body.appendChild(videoModal);

        videoModal.querySelector('.video-close').addEventListener('click', () => {
            videoModal.remove();
        });

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.remove();
            }
        });
    }

    playTrailer() {
        if (this.currentBannerMovie && this.currentBannerMovie.id) {
            this.showMovieDetails(this.currentBannerMovie.id);
        } else {
            this.showNotification('Trailer not available', 'error');
        }
    }

    showMovieInfo() {
        if (this.currentBannerMovie && this.currentBannerMovie.id) {
            this.showMovieDetails(this.currentBannerMovie.id);
        } else {
            this.showNotification('Movie information not available', 'error');
        }
    }

    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.row').forEach(row => {
            observer.observe(row);
        });
    }

    startRealTimeUpdates() {
        // Update trending movies every 30 minutes
        setInterval(() => {
            this.loadTrendingMovies();
        }, 30 * 60 * 1000);

        // Real-time clock
        this.updateClock();
        setInterval(() => {
            this.updateClock();
        }, 1000);

        // Random banner movie rotation every 10 seconds
        setInterval(() => {
            this.rotateBannerMovie();
        }, 10000);
    }

    updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        
        // Add clock to navigation if it doesn't exist
        let clock = document.getElementById('realTimeClock');
        if (!clock) {
            clock = document.createElement('div');
            clock.id = 'realTimeClock';
            clock.className = 'real-time-clock';
            document.querySelector('.nav').appendChild(clock);
        }
        
        clock.textContent = timeString;
    }

    async rotateBannerMovie() {
        try {
            const response = await fetch(`${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`);
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                const randomIndex = Math.floor(Math.random() * Math.min(data.results.length, 10));
                this.updateBannerMovie(data.results[randomIndex]);
            }
        } catch (error) {
            console.error('Error rotating banner movie:', error);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the Netflix app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.netflixApp = new NetflixApp();
});
