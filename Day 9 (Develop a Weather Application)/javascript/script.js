// Enhanced Weather Application - Real-time Features
class WeatherApp {
    constructor() {
        this.apiKey = '0cefbdd8089c7b724b58eac94e84c704';
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.defaultCity = 'Visakhapatnam';
        this.currentCity = this.defaultCity;
        this.weatherData = null;
        this.forecastData = null;
        
        this.init();
        this.setupEventListeners();
        this.startRealTimeUpdates();
    }

    init() {
        this.updateDateTime();
        this.loadWeatherData();
        this.setupGeolocation();
        this.showWelcomeAnimation();
    }

    showWelcomeAnimation() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate');
            }, index * 200);
        });
    }

    setupEventListeners() {
        // Search button
        const searchButton = document.querySelector('.submit');
        const searchInput = document.getElementById('city-name');

        if (searchButton) {
            searchButton.addEventListener('click', () => {
                this.handleCitySearch();
            });
        }

        // Enter key for search
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleCitySearch();
                }
            });

            // Auto-suggestions
            searchInput.addEventListener('input', (e) => {
                this.handleAutoSuggestions(e.target.value);
            });
        }

        // Quick location buttons
        document.querySelectorAll('[onclick*="setQuickLocation"]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const city = button.textContent.split(' ')[1];
                this.setQuickLocation(city);
            });
        });

        // Unit toggle
        this.setupUnitToggle();

        // Refresh button
        this.setupRefreshButton();

        // Theme toggle
        this.setupThemeToggle();
    }

    setupUnitToggle() {
        const unitToggle = document.createElement('div');
        unitToggle.className = 'unit-toggle';
        unitToggle.innerHTML = `
            <button class="unit-btn active" data-unit="celsius">°C</button>
            <button class="unit-btn" data-unit="fahrenheit">°F</button>
        `;
        
        const box1 = document.querySelector('.box-1');
        if (box1) {
            box1.appendChild(unitToggle);
        }

        unitToggle.addEventListener('click', (e) => {
            if (e.target.classList.contains('unit-btn')) {
                document.querySelectorAll('.unit-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                this.currentUnit = e.target.dataset.unit;
                this.updateTemperatureDisplay();
            }
        });

        this.currentUnit = 'celsius';
    }

    setupRefreshButton() {
        const refreshButton = document.createElement('button');
        refreshButton.className = 'refresh-btn';
        refreshButton.innerHTML = '🔄 Refresh';
        refreshButton.addEventListener('click', () => {
            this.loadWeatherData();
            this.showNotification('Weather data refreshed!', 'success');
        });

        const searchSection = document.querySelector('.search-section');
        if (searchSection) {
            searchSection.appendChild(refreshButton);
        }
    }

    setupThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '☀️';
        }

        const container = document.querySelector('.container');
        if (container) {
            container.appendChild(themeToggle);
        }
    }

    setupGeolocation() {
        const geoButton = document.createElement('button');
        geoButton.className = 'geo-btn';
        geoButton.innerHTML = '📍 Use My Location';
        geoButton.addEventListener('click', () => {
            this.getCurrentLocation();
        });

        const searchSection = document.querySelector('.search-section .sec');
        if (searchSection) {
            searchSection.appendChild(geoButton);
        }
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            this.showNotification('Getting your location...', 'info');
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.loadWeatherByCoords(latitude, longitude);
                },
                (error) => {
                    this.showNotification('Location access denied', 'error');
                    console.error('Geolocation error:', error);
                }
            );
        } else {
            this.showNotification('Geolocation not supported', 'error');
        }
    }

    async loadWeatherByCoords(lat, lon) {
        try {
            const weatherResponse = await fetch(`${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
            const forecastResponse = await fetch(`${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
            
            if (weatherResponse.ok && forecastResponse.ok) {
                this.weatherData = await weatherResponse.json();
                this.forecastData = await forecastResponse.json();
                this.currentCity = this.weatherData.name;
                this.updateWeatherDisplay();
                this.updateForecastDisplay();
                this.showNotification(`Weather loaded for ${this.currentCity}`, 'success');
            }
        } catch (error) {
            this.showNotification('Failed to load weather data', 'error');
            console.error('Weather API error:', error);
        }
    }

    handleCitySearch() {
        const cityInput = document.getElementById('city-name');
        const cityName = cityInput.value.trim();
        
        if (cityName) {
            this.currentCity = cityName;
            this.loadWeatherData();
            cityInput.value = '';
        } else {
            this.showNotification('Please enter a city name', 'warning');
        }
    }

    handleAutoSuggestions(query) {
        // In a real app, this would connect to a city suggestions API
        if (query.length > 2) {
            const suggestions = this.getCitySuggestions(query);
            this.showSuggestions(suggestions);
        } else {
            this.hideSuggestions();
        }
    }

    getCitySuggestions(query) {
        // Mock city suggestions - in real app, use a proper API
        const cities = [
            'New York', 'London', 'Tokyo', 'Sydney', 'Paris', 'Berlin', 'Mumbai', 
            'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Visakhapatnam'
        ];
        return cities.filter(city => city.toLowerCase().includes(query.toLowerCase()));
    }

    showSuggestions(suggestions) {
        let suggestionBox = document.getElementById('suggestions');
        if (!suggestionBox) {
            suggestionBox = document.createElement('div');
            suggestionBox.id = 'suggestions';
            suggestionBox.className = 'suggestions-box';
            document.querySelector('.search-section').appendChild(suggestionBox);
        }

        suggestionBox.innerHTML = suggestions.map(city => 
            `<div class="suggestion-item" onclick="weatherApp.selectSuggestion('${city}')">${city}</div>`
        ).join('');

        suggestionBox.style.display = suggestions.length > 0 ? 'block' : 'none';
    }

    hideSuggestions() {
        const suggestionBox = document.getElementById('suggestions');
        if (suggestionBox) {
            suggestionBox.style.display = 'none';
        }
    }

    selectSuggestion(city) {
        document.getElementById('city-name').value = city;
        this.hideSuggestions();
        this.currentCity = city;
        this.loadWeatherData();
    }

    setQuickLocation(city) {
        this.currentCity = city;
        this.loadWeatherData();
        this.showNotification(`Loading weather for ${city}...`, 'info');
    }

    async loadWeatherData() {
        try {
            this.showLoadingState();
            
            const weatherResponse = await fetch(`${this.baseUrl}/weather?q=${this.currentCity}&appid=${this.apiKey}&units=metric`);
            const forecastResponse = await fetch(`${this.baseUrl}/forecast?q=${this.currentCity}&appid=${this.apiKey}&units=metric`);
            
            if (weatherResponse.ok && forecastResponse.ok) {
                this.weatherData = await weatherResponse.json();
                this.forecastData = await forecastResponse.json();
                this.updateWeatherDisplay();
                this.updateForecastDisplay();
                this.hideLoadingState();
                this.showNotification(`Weather updated for ${this.weatherData.name}`, 'success');
            } else {
                throw new Error('City not found');
            }
        } catch (error) {
            this.hideLoadingState();
            this.showNotification('City not found. Please try again.', 'error');
            console.error('Weather API error:', error);
        }
    }

    showLoadingState() {
        const tempElement = document.getElementById('temp');
        const feelElement = document.getElementById('feel');
        const nameElement = document.getElementById('name');

        if (tempElement) tempElement.innerHTML = '...';
        if (feelElement) feelElement.innerHTML = 'Loading...';
        if (nameElement) nameElement.innerHTML = '🌍 Loading...';
    }

    hideLoadingState() {
        // Loading state will be replaced by actual data
    }

    updateWeatherDisplay() {
        if (!this.weatherData) return;

        const { main, weather, name, wind, visibility, sys } = this.weatherData;
        
        // Update basic info
        document.getElementById('name').innerHTML = `🌍 ${name}, ${sys.country}`;
        document.getElementById('feel').innerHTML = `${weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}`;
        
        // Update temperature
        this.updateTemperatureDisplay();

        // Update or create additional weather info
        this.updateWeatherDetails(main, wind, visibility, sys);

        // Update weather icon
        this.updateWeatherIcon(weather[0].icon);
    }

    updateTemperatureDisplay() {
        if (!this.weatherData) return;

        const tempCelsius = this.weatherData.main.temp;
        const tempFahrenheit = (tempCelsius * 9/5) + 32;
        
        const temperature = this.currentUnit === 'celsius' ? tempCelsius : tempFahrenheit;
        const unit = this.currentUnit === 'celsius' ? '°C' : '°F';
        
        document.getElementById('temp').innerHTML = Math.round(temperature);
        document.querySelector('.t-real').innerHTML = unit;
    }

    updateWeatherDetails(main, wind, visibility, sys) {
        let detailsContainer = document.getElementById('weather-details');
        if (!detailsContainer) {
            detailsContainer = document.createElement('div');
            detailsContainer.id = 'weather-details';
            detailsContainer.className = 'weather-details';
            document.querySelector('.box-2').appendChild(detailsContainer);
        }

        const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();

        detailsContainer.innerHTML = `
            <div class="detail-item">
                <span class="detail-label">💧 Humidity</span>
                <span class="detail-value">${main.humidity}%</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">🌡️ Feels Like</span>
                <span class="detail-value">${Math.round(main.feels_like)}°C</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">💨 Wind Speed</span>
                <span class="detail-value">${wind.speed} m/s</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">👁️ Visibility</span>
                <span class="detail-value">${(visibility / 1000).toFixed(1)} km</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">🌅 Sunrise</span>
                <span class="detail-value">${sunrise}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">🌇 Sunset</span>
                <span class="detail-value">${sunset}</span>
            </div>
        `;
    }

    updateWeatherIcon(iconCode) {
        let iconContainer = document.getElementById('weather-icon-main');
        if (!iconContainer) {
            iconContainer = document.createElement('div');
            iconContainer.id = 'weather-icon-main';
            iconContainer.className = 'weather-icon-main';
            document.querySelector('.temp').appendChild(iconContainer);
        }

        iconContainer.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">`;
    }

    updateForecastDisplay() {
        if (!this.forecastData) return;

        let forecastContainer = document.getElementById('forecast-container');
        if (!forecastContainer) {
            forecastContainer = document.createElement('div');
            forecastContainer.id = 'forecast-container';
            forecastContainer.className = 'forecast-container';
            
            const forecastTitle = document.createElement('h3');
            forecastTitle.textContent = '📅 5-Day Forecast';
            forecastTitle.className = 'forecast-title';
            
            document.querySelector('.container').appendChild(forecastTitle);
            document.querySelector('.container').appendChild(forecastContainer);
        }

        // Group forecast by day (take one forecast per day)
        const dailyForecasts = this.groupForecastByDay(this.forecastData.list);

        forecastContainer.innerHTML = dailyForecasts.map(forecast => {
            const date = new Date(forecast.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temp = Math.round(forecast.main.temp);
            const icon = forecast.weather[0].icon;
            const description = forecast.weather[0].description;

            return `
                <div class="forecast-item">
                    <div class="forecast-day">${dayName}</div>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}" class="forecast-icon">
                    <div class="forecast-temp">${temp}°C</div>
                    <div class="forecast-desc">${description}</div>
                </div>
            `;
        }).join('');
    }

    groupForecastByDay(forecastList) {
        const dailyForecasts = [];
        const processedDays = new Set();

        forecastList.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const dayKey = date.toDateString();

            if (!processedDays.has(dayKey) && dailyForecasts.length < 5) {
                dailyForecasts.push(forecast);
                processedDays.add(dayKey);
            }
        });

        return dailyForecasts;
    }

    updateDateTime() {
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const now = new Date();
        
        document.getElementById('year').innerHTML = now.getFullYear();
        document.getElementById('date').innerHTML = now.getDate();
        document.getElementById('month').innerHTML = months[now.getMonth()];
        document.getElementById('day').innerHTML = days[now.getDay()];
    }

    startRealTimeUpdates() {
        // Update date/time every second
        setInterval(() => {
            this.updateDateTime();
        }, 1000);

        // Update weather data every 10 minutes
        setInterval(() => {
            this.loadWeatherData();
        }, 10 * 60 * 1000);

        // Add live clock
        this.addLiveClock();
    }

    addLiveClock() {
        let clockContainer = document.getElementById('live-clock');
        if (!clockContainer) {
            clockContainer = document.createElement('div');
            clockContainer.id = 'live-clock';
            clockContainer.className = 'live-clock';
            document.querySelector('.date').appendChild(clockContainer);
        }

        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            clockContainer.innerHTML = `🕐 ${timeString}`;
        };

        updateClock();
        setInterval(updateClock, 1000);
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

// Global functions for backward compatibility
function cityNameChange() {
    if (window.weatherApp) {
        window.weatherApp.handleCitySearch();
    }
}

function setQuickLocation(city) {
    if (window.weatherApp) {
        window.weatherApp.setQuickLocation(city);
    }
}

// Initialize the weather app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.weatherApp = new WeatherApp();
});