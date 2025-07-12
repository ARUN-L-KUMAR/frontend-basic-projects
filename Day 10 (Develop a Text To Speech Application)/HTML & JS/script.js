// VoiceSync Pro - Enhanced Text-to-Speech Application
// Advanced AI-Powered Speech Synthesis with Modern UI

class VoiceSyncPro {
    constructor() {
        this.speechSynthesis = window.speechSynthesis;
        this.currentUtterance = null;
        this.voices = [];
        this.isPlaying = false;
        this.isPaused = false;
        this.currentText = '';
        this.currentPosition = 0;
        this.totalDuration = 0;
        this.progressInterval = null;
        this.visualizerInterval = null;
        
        // Enhanced settings with AI features
        this.settings = {
            rate: 1,
            pitch: 1,
            volume: 1,
            voice: null,
            autoPlayback: false,
            wordHighlight: true,
            saveSettings: true,
            repeatMode: false,
            enhancement: 'none',
            accent: 'neutral',
            ssmlSupport: false,
            pauseOnPunctuation: true,
            visualizerEnabled: true
        };
        
        // UI State
        this.expandedPanels = {
            voice: true,
            features: false
        };
        
        // Statistics
        this.stats = {
            sessions: parseInt(localStorage.getItem('voicesync_sessions') || '247'),
            wordsSpoken: parseInt(localStorage.getItem('voicesync_words') || '12500'),
            totalTime: parseInt(localStorage.getItem('voicesync_time') || '0')
        };
        
        this.init();
    }
    
    async init() {
        this.showLoading();
        
        try {
            await this.loadVoices();
            this.setupEventListeners();
            this.loadSettings();
            this.updateUI();
            this.updateStats();
            this.initializeVisualizer();
            
            // Simulate loading time for better UX
            setTimeout(() => {
                this.hideLoading();
                this.showNotification('VoiceSync Pro initialized successfully! 🎉', 'success');
                console.log('🎤 VoiceSync Pro v2.0 - Ready to synthesize!');
            }, 1500);
            
        } catch (error) {
            console.error('Initialization error:', error);
            this.hideLoading();
            this.showNotification('Failed to initialize VoiceSync Pro', 'error');
        }
    }
    
    showLoading() {
        const loading = document.getElementById('loadingOverlay');
        if (loading) {
            loading.classList.add('active');
        }
    }
    
    hideLoading() {
        const loading = document.getElementById('loadingOverlay');
        if (loading) {
            loading.classList.remove('active');
        }
    }
    
    async loadVoices() {
        return new Promise((resolve) => {
            const loadVoicesCallback = () => {
                this.voices = this.speechSynthesis.getVoices();
                if (this.voices.length > 0) {
                    this.populateVoiceSelect();
                    resolve();
                } else {
                    // Try again after a short delay
                    setTimeout(loadVoicesCallback, 100);
                }
            };
            
            this.speechSynthesis.addEventListener('voiceschanged', loadVoicesCallback);
            loadVoicesCallback();
        });
    }
    
    populateVoiceSelect() {
        const select = document.getElementById('voiceSelect');
        if (!select) return;
        
        select.innerHTML = '';
        
        // Group voices by language
        const voicesByLang = this.groupVoicesByLanguage();
        
        Object.keys(voicesByLang).sort().forEach(lang => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = this.getLanguageName(lang);
            
            voicesByLang[lang].forEach(voice => {
                const option = document.createElement('option');
                option.value = voice.name;
                option.textContent = `${voice.name} ${voice.localService ? '🔒' : '☁️'}`;
                option.dataset.lang = voice.lang;
                
                if (voice.default && !this.settings.voice) {
                    option.selected = true;
                    this.settings.voice = voice;
                }
                
                optgroup.appendChild(option);
            });
            
            select.appendChild(optgroup);
        });
    }
    
    groupVoicesByLanguage() {
        const grouped = {};
        this.voices.forEach(voice => {
            const lang = voice.lang.split('-')[0];
            if (!grouped[lang]) {
                grouped[lang] = [];
            }
            grouped[lang].push(voice);
        });
        return grouped;
    }
    
    getLanguageName(code) {
        const languages = {
            'en': '🇺🇸 English',
            'es': '🇪🇸 Spanish',
            'fr': '🇫🇷 French',
            'de': '🇩🇪 German',
            'it': '🇮🇹 Italian',
            'pt': '🇵🇹 Portuguese',
            'ru': '🇷🇺 Russian',
            'zh': '🇨🇳 Chinese',
            'ja': '🇯🇵 Japanese',
            'ko': '🇰🇷 Korean',
            'ar': '🇸🇦 Arabic',
            'hi': '🇮🇳 Hindi'
        };
        return languages[code] || `🌐 ${code.toUpperCase()}`;
    }
    
    setupEventListeners() {
        // Text input events
        const textInput = document.getElementById('textToSpeak');
        if (textInput) {
            textInput.addEventListener('input', () => this.updateTextStats());
            textInput.addEventListener('paste', () => {
                setTimeout(() => this.updateTextStats(), 100);
            });
        }
        
        // Tool buttons
        this.setupToolButtons();
        
        // Sample texts
        this.setupSampleTexts();
        
        // Voice controls
        this.setupVoiceControls();
        
        // Playback controls
        this.setupPlaybackControls();
        
        // Advanced features
        this.setupAdvancedFeatures();
        
        // Modal controls
        this.setupModalControls();
        
        // Panel expansion
        this.setupPanelExpansion();
        
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
    }
    
    setupToolButtons() {
        const buttons = {
            clearText: () => this.clearText(),
            pasteText: () => this.pasteText(),
            copyText: () => this.copyText(),
            downloadText: () => this.downloadText()
        };
        
        Object.keys(buttons).forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', buttons[id]);
            }
        });
    }
    
    setupSampleTexts() {
        document.querySelectorAll('.sample-card').forEach(card => {
            card.addEventListener('click', () => {
                const text = card.dataset.text;
                if (text) {
                    document.getElementById('textToSpeak').value = text;
                    this.updateTextStats();
                    this.showNotification('Sample text loaded! 📝', 'success');
                    
                    // Auto-play if enabled
                    if (this.settings.autoPlayback) {
                        setTimeout(() => this.playText(), 500);
                    }
                }
            });
        });
    }
    
    setupVoiceControls() {
        // Voice selection
        const voiceSelect = document.getElementById('voiceSelect');
        if (voiceSelect) {
            voiceSelect.addEventListener('change', (e) => {
                const selectedVoice = this.voices.find(v => v.name === e.target.value);
                if (selectedVoice) {
                    this.settings.voice = selectedVoice;
                    this.saveSettings();
                }
            });
        }
        
        // Sliders
        this.setupSliders();
        
        // Presets
        this.setupPresets();
    }
    
    setupSliders() {
        const sliders = [
            { id: 'rateSlider', property: 'rate', display: 'rateValue', suffix: 'x' },
            { id: 'pitchSlider', property: 'pitch', display: 'pitchValue', suffix: '' },
            { id: 'volumeSlider', property: 'volume', display: 'volumeValue', suffix: '%' }
        ];
        
        sliders.forEach(slider => {
            const element = document.getElementById(slider.id);
            const display = document.getElementById(slider.display);
            
            if (element && display) {
                element.addEventListener('input', (e) => {
                    let value = parseFloat(e.target.value);
                    this.settings[slider.property] = value;
                    
                    // Format display value
                    if (slider.property === 'volume') {
                        value = Math.round(value * 100);
                    }
                    
                    display.textContent = value + slider.suffix;
                    this.saveSettings();
                });
            }
        });
    }
    
    setupPresets() {
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const preset = btn.dataset.preset;
                this.applyPreset(preset);
                
                // Update active state
                document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    
    applyPreset(preset) {
        const presets = {
            natural: { rate: 1, pitch: 1, volume: 1 },
            fast: { rate: 1.5, pitch: 1.1, volume: 1 },
            slow: { rate: 0.7, pitch: 0.9, volume: 1 },
            dramatic: { rate: 0.8, pitch: 1.3, volume: 1 }
        };
        
        const config = presets[preset];
        if (config) {
            Object.assign(this.settings, config);
            this.updateSliders();
            this.saveSettings();
            this.showNotification(`Applied ${preset} preset! 🎯`, 'success');
        }
    }
    
    updateSliders() {
        const updates = [
            { slider: 'rateSlider', value: this.settings.rate, display: 'rateValue', suffix: 'x' },
            { slider: 'pitchSlider', value: this.settings.pitch, display: 'pitchValue', suffix: '' },
            { slider: 'volumeSlider', value: this.settings.volume, display: 'volumeValue', suffix: '%' }
        ];
        
        updates.forEach(update => {
            const slider = document.getElementById(update.slider);
            const display = document.getElementById(update.display);
            
            if (slider) slider.value = update.value;
            if (display) {
                let displayValue = update.value;
                if (update.slider === 'volumeSlider') {
                    displayValue = Math.round(displayValue * 100);
                }
                display.textContent = displayValue + update.suffix;
            }
        });
    }
    
    setupPlaybackControls() {
        const controls = {
            playBtn: () => this.playText(),
            pauseBtn: () => this.pauseText(),
            resumeBtn: () => this.resumeText(),
            stopBtn: () => this.stopText()
        };
        
        Object.keys(controls).forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', controls[id]);
            }
        });
    }
    
    setupAdvancedFeatures() {
        const features = {
            saveAudioBtn: () => this.saveAudio(),
            highlightTextBtn: () => this.toggleHighlight(),
            repeatModeBtn: () => this.toggleRepeat(),
            settingsBtn: () => this.showSettings()
        };
        
        Object.keys(features).forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', features[id]);
            }
        });
    }
    
    setupModalControls() {
        const modal = document.getElementById('settingsModal');
        const closeBtn = document.getElementById('closeSettings');
        const saveBtn = document.getElementById('saveModalSettings');
        const resetBtn = document.getElementById('resetSettings');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideSettings());
        }
        
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveModalSettings());
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetSettings());
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideSettings();
                }
            });
        }
        
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.switchTab(tab);
            });
        });
    }
    
    setupPanelExpansion() {
        const expandBtns = document.querySelectorAll('.expand-btn');
        expandBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const panel = btn.closest('.control-panel');
                const content = panel.querySelector('.panel-content');
                const icon = btn.querySelector('i');
                
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
                icon.style.transform = content.style.display === 'none' ? 'rotate(-90deg)' : 'rotate(0deg)';
            });
        });
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.playText();
                        break;
                    case ' ':
                        e.preventDefault();
                        if (this.isPlaying) {
                            this.isPaused ? this.resumeText() : this.pauseText();
                        } else {
                            this.playText();
                        }
                        break;
                    case 'Escape':
                        e.preventDefault();
                        this.stopText();
                        break;
                }
            }
        });
    }
    
    updateTextStats() {
        const text = document.getElementById('textToSpeak').value;
        const charCount = text.length;
        const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
        const estimatedTime = this.calculateEstimatedTime(wordCount);
        
        document.getElementById('charCount').textContent = charCount;
        document.getElementById('wordCount').textContent = wordCount;
        document.getElementById('estimatedTime').textContent = estimatedTime;
        
        this.currentText = text;
    }
    
    calculateEstimatedTime(wordCount) {
        const wordsPerMinute = 150 * this.settings.rate;
        const minutes = wordCount / wordsPerMinute;
        const seconds = Math.round(minutes * 60);
        
        if (seconds < 60) {
            return `${seconds}s`;
        } else {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
    }
    
    playText() {
        const text = document.getElementById('textToSpeak').value.trim();
        
        if (!text) {
            this.showNotification('Please enter some text to speak', 'warning');
            return;
        }
        
        if (this.isPlaying) {
            this.stopText();
        }
        
        this.createUtterance(text);
        this.updatePlaybackState(true);
        this.startVisualizer();
        this.updateStats();
        
        try {
            this.speechSynthesis.speak(this.currentUtterance);
            this.updateStatus('Speaking...', 'speaking');
        } catch (error) {
            console.error('Speech synthesis error:', error);
            this.showNotification('Failed to start speech synthesis', 'error');
            this.updatePlaybackState(false);
        }
    }
    
    createUtterance(text) {
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        
        // Apply settings
        this.currentUtterance.voice = this.settings.voice;
        this.currentUtterance.rate = this.settings.rate;
        this.currentUtterance.pitch = this.settings.pitch;
        this.currentUtterance.volume = this.settings.volume;
        
        // Event listeners
        this.currentUtterance.onstart = () => {
            this.onSpeechStart();
        };
        
        this.currentUtterance.onend = () => {
            this.onSpeechEnd();
        };
        
        this.currentUtterance.onerror = (error) => {
            this.onSpeechError(error);
        };
        
        this.currentUtterance.onpause = () => {
            this.onSpeechPause();
        };
        
        this.currentUtterance.onresume = () => {
            this.onSpeechResume();
        };
        
        if (this.settings.wordHighlight) {
            this.currentUtterance.onboundary = (event) => {
                this.onWordBoundary(event);
            };
        }
    }
    
    onSpeechStart() {
        this.isPlaying = true;
        this.isPaused = false;
        this.startProgressTracking();
        this.updateStatus('Now speaking...', 'speaking');
    }
    
    onSpeechEnd() {
        this.updatePlaybackState(false);
        this.stopVisualizer();
        this.updateStatus('Speech completed', 'success');
        
        if (this.settings.repeatMode) {
            setTimeout(() => this.playText(), 1000);
        }
    }
    
    onSpeechError(error) {
        console.error('Speech error:', error);
        this.updatePlaybackState(false);
        this.showNotification('Speech synthesis error occurred', 'error');
        this.updateStatus('Speech error occurred', 'error');
    }
    
    onSpeechPause() {
        this.isPaused = true;
        this.updateStatus('Speech paused', 'warning');
    }
    
    onSpeechResume() {
        this.isPaused = false;
        this.updateStatus('Speech resumed', 'speaking');
    }
    
    onWordBoundary(event) {
        // Highlight current word (simplified implementation)
        if (event.name === 'word') {
            const textArea = document.getElementById('textToSpeak');
            // This would need more sophisticated implementation for actual word highlighting
            console.log('Word boundary:', event);
        }
    }
    
    pauseText() {
        if (this.isPlaying && !this.isPaused) {
            this.speechSynthesis.pause();
            this.updateStatus('Speech paused', 'warning');
        }
    }
    
    resumeText() {
        if (this.isPlaying && this.isPaused) {
            this.speechSynthesis.resume();
            this.updateStatus('Speech resumed', 'speaking');
        }
    }
    
    stopText() {
        if (this.isPlaying) {
            this.speechSynthesis.cancel();
            this.updatePlaybackState(false);
            this.stopVisualizer();
            this.updateStatus('Speech stopped', 'info');
        }
    }
    
    updatePlaybackState(playing) {
        this.isPlaying = playing;
        this.isPaused = false;
        
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resumeBtn = document.getElementById('resumeBtn');
        const stopBtn = document.getElementById('stopBtn');
        
        if (playBtn) playBtn.disabled = playing;
        if (pauseBtn) pauseBtn.disabled = !playing || this.isPaused;
        if (resumeBtn) resumeBtn.disabled = !playing || !this.isPaused;
        if (stopBtn) stopBtn.disabled = !playing;
        
        if (!playing) {
            this.stopProgressTracking();
        }
    }
    
    startProgressTracking() {
        // Simplified progress tracking
        const startTime = Date.now();
        const estimatedDuration = this.calculateEstimatedDuration();
        
        this.progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / estimatedDuration) * 100, 100);
            
            this.updateProgress(progress);
            this.updateTimeDisplay(elapsed, estimatedDuration);
            
            if (progress >= 100) {
                this.stopProgressTracking();
            }
        }, 100);
    }
    
    stopProgressTracking() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }
    
    calculateEstimatedDuration() {
        const wordCount = this.currentText.trim().split(/\s+/).length;
        const wordsPerMinute = 150 * this.settings.rate;
        return (wordCount / wordsPerMinute) * 60 * 1000; // milliseconds
    }
    
    updateProgress(percentage) {
        const progressFill = document.getElementById('progressFill');
        const progressIndicator = document.getElementById('progressIndicator');
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        if (progressIndicator) {
            progressIndicator.style.left = `${percentage}%`;
        }
    }
    
    updateTimeDisplay(elapsed, total) {
        const currentTime = document.getElementById('currentTime');
        const totalTime = document.getElementById('totalTime');
        
        if (currentTime) {
            currentTime.textContent = this.formatTime(elapsed);
        }
        
        if (totalTime) {
            totalTime.textContent = this.formatTime(total);
        }
    }
    
    formatTime(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    startVisualizer() {
        if (!this.settings.visualizerEnabled) return;
        
        const bars = document.querySelectorAll('.bar');
        
        this.visualizerInterval = setInterval(() => {
            bars.forEach(bar => {
                const height = Math.random() * 60 + 20;
                bar.style.height = `${height}px`;
            });
        }, 150);
    }
    
    stopVisualizer() {
        if (this.visualizerInterval) {
            clearInterval(this.visualizerInterval);
            this.visualizerInterval = null;
        }
        
        // Reset bars to default height
        document.querySelectorAll('.bar').forEach(bar => {
            bar.style.height = '20px';
        });
    }
    
    updateStatus(message, type = 'info') {
        const statusText = document.getElementById('statusText');
        const statusIcon = document.querySelector('.status-icon i');
        
        if (statusText) {
            statusText.textContent = message;
        }
        
        if (statusIcon) {
            const icons = {
                info: 'fas fa-info-circle',
                success: 'fas fa-check-circle',
                warning: 'fas fa-exclamation-triangle',
                error: 'fas fa-times-circle',
                speaking: 'fas fa-volume-up'
            };
            
            statusIcon.className = icons[type] || icons.info;
        }
    }
    
    // Tool button methods
    clearText() {
        document.getElementById('textToSpeak').value = '';
        this.updateTextStats();
        this.showNotification('Text cleared', 'info');
    }
    
    async pasteText() {
        try {
            const text = await navigator.clipboard.readText();
            document.getElementById('textToSpeak').value = text;
            this.updateTextStats();
            this.showNotification('Text pasted from clipboard', 'success');
        } catch (error) {
            this.showNotification('Failed to paste from clipboard', 'error');
        }
    }
    
    async copyText() {
        const text = document.getElementById('textToSpeak').value;
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('Text copied to clipboard', 'success');
        } catch (error) {
            this.showNotification('Failed to copy text', 'error');
        }
    }
    
    downloadText() {
        const text = document.getElementById('textToSpeak').value;
        if (!text.trim()) {
            this.showNotification('No text to download', 'warning');
            return;
        }
        
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'voicesync-text.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Text downloaded', 'success');
    }
    
    // Advanced features
    saveAudio() {
        this.showNotification('Audio export feature coming soon!', 'info');
    }
    
    toggleHighlight() {
        this.settings.wordHighlight = !this.settings.wordHighlight;
        this.saveSettings();
        this.showNotification(
            `Word highlighting ${this.settings.wordHighlight ? 'enabled' : 'disabled'}`,
            'info'
        );
    }
    
    toggleRepeat() {
        this.settings.repeatMode = !this.settings.repeatMode;
        this.saveSettings();
        this.showNotification(
            `Repeat mode ${this.settings.repeatMode ? 'enabled' : 'disabled'}`,
            'info'
        );
    }
    
    showSettings() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.classList.add('active');
        }
    }
    
    hideSettings() {
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
    
    switchTab(tabName) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to selected tab and content
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }
    
    saveModalSettings() {
        // Collect modal settings
        const autoPlayback = document.getElementById('autoPlayback').checked;
        const wordHighlight = document.getElementById('wordHighlight').checked;
        const saveSettings = document.getElementById('saveSettings').checked;
        const voiceEnhancement = document.getElementById('voiceEnhancement').value;
        const accentSelect = document.getElementById('accentSelect').value;
        const ssmlSupport = document.getElementById('ssmlSupport').checked;
        const pauseOnPunctuation = document.getElementById('pauseOnPunctuation').checked;
        
        // Update settings
        Object.assign(this.settings, {
            autoPlayback,
            wordHighlight,
            saveSettings,
            enhancement: voiceEnhancement,
            accent: accentSelect,
            ssmlSupport,
            pauseOnPunctuation
        });
        
        this.saveSettings();
        this.hideSettings();
        this.showNotification('Settings saved successfully!', 'success');
    }
    
    resetSettings() {
        this.settings = {
            rate: 1,
            pitch: 1,
            volume: 1,
            voice: null,
            autoPlayback: false,
            wordHighlight: true,
            saveSettings: true,
            repeatMode: false,
            enhancement: 'none',
            accent: 'neutral',
            ssmlSupport: false,
            pauseOnPunctuation: true,
            visualizerEnabled: true
        };
        
        this.updateSliders();
        this.saveSettings();
        this.hideSettings();
        this.showNotification('Settings reset to defaults', 'info');
    }
    
    saveSettings() {
        if (this.settings.saveSettings) {
            localStorage.setItem('voicesync_settings', JSON.stringify(this.settings));
        }
    }
    
    loadSettings() {
        const saved = localStorage.getItem('voicesync_settings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                Object.assign(this.settings, settings);
            } catch (error) {
                console.error('Failed to load settings:', error);
            }
        }
    }
    
    updateStats() {
        this.stats.sessions += 1;
        const wordCount = this.currentText.trim().split(/\s+/).length;
        this.stats.wordsSpoken += wordCount;
        
        // Update display
        document.getElementById('sessionsCount').textContent = this.stats.sessions;
        document.getElementById('wordsSpoken').textContent = this.formatNumber(this.stats.wordsSpoken);
        
        // Save to localStorage
        localStorage.setItem('voicesync_sessions', this.stats.sessions.toString());
        localStorage.setItem('voicesync_words', this.stats.wordsSpoken.toString());
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    updateUI() {
        this.updateTextStats();
        this.updateSliders();
        
        // Update modal checkboxes
        const checkboxes = [
            'autoPlayback',
            'wordHighlight',
            'saveSettings',
            'ssmlSupport',
            'pauseOnPunctuation'
        ];
        
        checkboxes.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = this.settings[id];
            }
        });
        
        // Update selects
        const voiceEnhancement = document.getElementById('voiceEnhancement');
        const accentSelect = document.getElementById('accentSelect');
        
        if (voiceEnhancement) voiceEnhancement.value = this.settings.enhancement;
        if (accentSelect) accentSelect.value = this.settings.accent;
    }
    
    initializeVisualizer() {
        const toggle = document.getElementById('visualizerToggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                this.settings.visualizerEnabled = !this.settings.visualizerEnabled;
                const icon = toggle.querySelector('i');
                icon.className = this.settings.visualizerEnabled ? 'fas fa-eye' : 'fas fa-eye-slash';
                this.saveSettings();
            });
        }
    }
    
    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        container.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'times-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.voiceSyncPro = new VoiceSyncPro();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VoiceSyncPro;
}
