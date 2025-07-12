// ===== INTERACTIVE BOX MODEL DEMO JAVASCRIPT =====

// DOM Elements
const demoBox = document.getElementById('demoBox');
const marginRange = document.getElementById('marginRange');
const marginInput = document.getElementById('marginInput');
const borderRange = document.getElementById('borderRange');
const borderInput = document.getElementById('borderInput');
const paddingRange = document.getElementById('paddingRange');
const paddingInput = document.getElementById('paddingInput');
const widthRange = document.getElementById('widthRange');
const widthInput = document.getElementById('widthInput');
const heightRange = document.getElementById('heightRange');
const heightInput = document.getElementById('heightInput');
const bgColorInput = document.getElementById('bgColorInput');
const borderColorInput = document.getElementById('borderColorInput');

// Value display elements
const marginValue = document.getElementById('marginValue');
const borderValue = document.getElementById('borderValue');
const paddingValue = document.getElementById('paddingValue');
const contentValue = document.getElementById('contentValue');
const totalWidthValue = document.getElementById('totalWidthValue');
const totalHeightValue = document.getElementById('totalHeightValue');

// Initialize the demo
function initDemo() {
    setupEventListeners();
    updateBoxModel();
    console.log('🎨 Box Model Demo initialized!');
}

// Setup event listeners
function setupEventListeners() {
    // Range and input synchronization
    setupRangeInputSync(marginRange, marginInput);
    setupRangeInputSync(borderRange, borderInput);
    setupRangeInputSync(paddingRange, paddingInput);
    setupRangeInputSync(widthRange, widthInput);
    setupRangeInputSync(heightRange, heightInput);

    // Color inputs
    bgColorInput.addEventListener('input', updateBoxModel);
    borderColorInput.addEventListener('input', updateBoxModel);

    // Box interactions
    demoBox.addEventListener('click', function() {
        this.classList.toggle('highlighted');
        showNotification('Box model properties highlighted!', 'info');
    });

    // Layer interactions
    document.querySelectorAll('.layer').forEach(layer => {
        layer.addEventListener('click', function() {
            highlightLayer(this);
        });
    });
}

// Sync range and input values
function setupRangeInputSync(range, input) {
    range.addEventListener('input', function() {
        input.value = this.value;
        updateBoxModel();
    });

    input.addEventListener('input', function() {
        range.value = this.value;
        updateBoxModel();
    });
}

// Update the box model visualization
function updateBoxModel() {
    const margin = parseInt(marginInput.value);
    const border = parseInt(borderInput.value);
    const padding = parseInt(paddingInput.value);
    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    const bgColor = bgColorInput.value;
    const borderColor = borderColorInput.value;

    // Apply styles to demo box
    demoBox.style.margin = `${margin}px`;
    demoBox.style.borderWidth = `${border}px`;
    demoBox.style.borderColor = borderColor;
    demoBox.style.padding = `${padding}px`;
    demoBox.style.width = `${width}px`;
    demoBox.style.height = `${height}px`;
    demoBox.style.background = `linear-gradient(135deg, ${bgColor}, ${adjustBrightness(bgColor, -20)})`;

    // Update value displays
    marginValue.textContent = `${margin}px`;
    borderValue.textContent = `${border}px`;
    paddingValue.textContent = `${padding}px`;
    contentValue.textContent = `${width}×${height}px`;
    
    const totalWidth = width + (padding * 2) + (border * 2) + (margin * 2);
    const totalHeight = height + (padding * 2) + (border * 2) + (margin * 2);
    
    totalWidthValue.textContent = `${totalWidth}px`;
    totalHeightValue.textContent = `${totalHeight}px`;

    // Update CSS code display
    updateCSSCode();
}

// Highlight specific layer
function highlightLayer(layer) {
    // Remove existing highlights
    document.querySelectorAll('.layer').forEach(l => l.style.transform = '');
    
    // Highlight selected layer
    layer.style.transform = 'scale(1.02) translateX(10px)';
    
    // Show notification
    const layerType = layer.classList[1].replace('layer-', '');
    showNotification(`${layerType.charAt(0).toUpperCase() + layerType.slice(1)} layer highlighted!`, 'success');
    
    // Reset after 2 seconds
    setTimeout(() => {
        layer.style.transform = '';
    }, 2000);
}

// Apply preset configurations
function applyPreset(preset) {
    const presets = {
        compact: {
            margin: 5,
            border: 2,
            padding: 10,
            width: 250,
            height: 150,
            bgColor: '#10b981',
            borderColor: '#065f46'
        },
        spacious: {
            margin: 40,
            border: 8,
            padding: 35,
            width: 350,
            height: 250,
            bgColor: '#f59e0b',
            borderColor: '#d97706'
        },
        minimal: {
            margin: 0,
            border: 1,
            padding: 5,
            width: 300,
            height: 100,
            bgColor: '#6b7280',
            borderColor: '#374151'
        },
        bold: {
            margin: 25,
            border: 15,
            padding: 30,
            width: 320,
            height: 220,
            bgColor: '#ef4444',
            borderColor: '#991b1b'
        }
    };

    if (presets[preset]) {
        const config = presets[preset];
        
        // Update controls
        marginRange.value = marginInput.value = config.margin;
        borderRange.value = borderInput.value = config.border;
        paddingRange.value = paddingInput.value = config.padding;
        widthRange.value = widthInput.value = config.width;
        heightRange.value = heightInput.value = config.height;
        bgColorInput.value = config.bgColor;
        borderColorInput.value = config.borderColor;

        // Update visualization
        updateBoxModel();
        
        // Show notification
        showNotification(`Applied ${preset} preset!`, 'success');
        
        // Add animation
        demoBox.style.transform = 'scale(1.1)';
        setTimeout(() => {
            demoBox.style.transform = '';
        }, 300);
    }
}

// Update CSS code display
function updateCSSCode() {
    const margin = marginInput.value;
    const border = borderInput.value;
    const padding = paddingInput.value;
    const width = widthInput.value;
    const height = heightInput.value;
    const bgColor = bgColorInput.value;
    const borderColor = borderColorInput.value;

    const cssCode = `
        <div class="code-line"><span class="code-comment">/* Generated CSS for your box model */</span></div>
        <div class="code-line">.demo-element {</div>
        <div class="code-line">  <span class="code-property">width</span>: <span class="code-value">${width}px</span>;</div>
        <div class="code-line">  <span class="code-property">height</span>: <span class="code-value">${height}px</span>;</div>
        <div class="code-line">  <span class="code-property">margin</span>: <span class="code-value">${margin}px</span>;</div>
        <div class="code-line">  <span class="code-property">border</span>: <span class="code-value">${border}px solid ${borderColor}</span>;</div>
        <div class="code-line">  <span class="code-property">padding</span>: <span class="code-value">${padding}px</span>;</div>
        <div class="code-line">  <span class="code-property">background-color</span>: <span class="code-value">${bgColor}</span>;</div>
        <div class="code-line">  <span class="code-property">border-radius</span>: <span class="code-value">0.75rem</span>;</div>
        <div class="code-line">}</div>
    `;

    document.getElementById('codeBlock').innerHTML = cssCode;
}

// Copy CSS to clipboard
function copyCSS() {
    const margin = marginInput.value;
    const border = borderInput.value;
    const padding = paddingInput.value;
    const width = widthInput.value;
    const height = heightInput.value;
    const bgColor = bgColorInput.value;
    const borderColor = borderColorInput.value;

    const cssText = `.demo-element {
  width: ${width}px;
  height: ${height}px;
  margin: ${margin}px;
  border: ${border}px solid ${borderColor};
  padding: ${padding}px;
  background-color: ${bgColor};
  border-radius: 0.75rem;
}`;

    navigator.clipboard.writeText(cssText).then(() => {
        showNotification('CSS code copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy CSS code', 'error');
    });
}

// Utility function to adjust color brightness
function adjustBrightness(hex, percent) {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Show notification
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
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
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
    }, 3000);
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDemo);

// Make functions globally available
window.applyPreset = applyPreset;
window.copyCSS = copyCSS;
