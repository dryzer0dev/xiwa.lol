// Variables globales
let profileData = {
    pageBackground: {
        type: 'gradient',
        color: '#667eea',
        image: '',
        video: '',
        gradient: {
            color1: '#667eea',
            color2: '#764ba2',
            direction: '135deg'
        },
        animated: 'aurora'
    },
    background: {
        type: 'color',
        color: '#1a1a1a',
        image: '',
        video: '',
        gradient: {
            color1: '#ff6b6b',
            color2: '#4ecdc4',
            direction: 'to right'
        }
    },
    music: {
        url: '',
        volume: 50,
        playing: false
    },
    username: 'Votre Pseudo',
    handle: 'votre_handle',
    usernameEffect: 'none',
    animation: {
        type: 'none',
        intensity: 5
    },
    zoom: {
        enabled: true,
        level: 1.2
    },
    opacity: 100,
    cursor: {
        enabled: false,
        style: 'default'
    },
    effects: {
        particles: false,
        distortion: false,
        loading: false,
        mirror: false,
        darkMode: false
    },
    profilePhoto: '',
    photoShape: 'circle',
    photoSize: 80,
    description: 'Votre description personnalisée avec emojis et GIFs ! 🎉✨',
    positions: {}
};

// Éléments DOM
const welcomeScreen = document.getElementById('welcome-screen');
const editor = document.getElementById('editor');
const enterBtn = document.getElementById('enter-btn');
const profilePreview = document.getElementById('profile-preview');
const profileBackground = document.getElementById('profile-background');
const profileUsername = document.getElementById('profile-username');
const profileHandle = document.getElementById('profile-handle');
const customCursor = document.getElementById('custom-cursor-element');
const backgroundMusic = document.getElementById('background-music');

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupDragAndDrop();
    setupProfilePhoto();
    setupDescription();
    updatePreview();
});

function initializeApp() {
    // Initialiser les valeurs par défaut
    updateDisplayValues();
    setupCustomCursor();
    setupParticles();
    updatePageBackground();
    updateBackground();
    updateUsernameDisplay();
    updateHandleDisplay();
    updateAnimationClasses();
    updateEffectClasses();
}

function setupEventListeners() {
    // Bouton d'entrée
    enterBtn.addEventListener('click', enterEditor);
    
    // Gestion des modals
    document.getElementById('preview-btn').addEventListener('click', showPreviewModal);
    document.getElementById('fullpage-btn').addEventListener('click', showFullPage);
    document.getElementById('code-btn').addEventListener('click', showCodeModal);
    document.getElementById('reset-btn').addEventListener('click', resetProfile);
    document.getElementById('copy-code-btn').addEventListener('click', copyCode);
    document.getElementById('reset-positions-btn').addEventListener('click', resetElementPositions);
    
    // Fermeture des modals
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    // Onglets du code source
    document.querySelectorAll('.code-tab').forEach(tab => {
        tab.addEventListener('click', switchCodeTab);
    });
    
    // Fond d'écran de la page
    document.getElementById('page-background-type').addEventListener('change', handlePageBackgroundTypeChange);
    document.getElementById('page-background-color').addEventListener('input', updatePageBackgroundColor);
    document.getElementById('page-background-image-url').addEventListener('input', updatePageBackgroundImage);
    document.getElementById('page-background-video-url').addEventListener('input', updatePageBackgroundVideo);
    document.getElementById('page-gradient-color1').addEventListener('input', updatePageGradient);
    document.getElementById('page-gradient-color2').addEventListener('input', updatePageGradient);
    document.getElementById('page-gradient-direction').addEventListener('change', updatePageGradient);
    document.getElementById('page-animation-style').addEventListener('change', updatePageAnimation);
    
    // Upload de fichiers pour la page
    document.getElementById('upload-page-image-btn').addEventListener('click', () => document.getElementById('page-image-upload').click());
    document.getElementById('upload-page-video-btn').addEventListener('click', () => document.getElementById('page-video-upload').click());
    document.getElementById('page-image-upload').addEventListener('change', handlePageImageUpload);
    document.getElementById('page-video-upload').addEventListener('change', handlePageVideoUpload);
    
    // Fond d'écran du profil
    document.getElementById('background-type').addEventListener('change', handleBackgroundTypeChange);
    document.getElementById('background-color').addEventListener('input', updateBackgroundColor);
    document.getElementById('background-image-url').addEventListener('input', updateBackgroundImage);
    document.getElementById('background-video-url').addEventListener('input', updateBackgroundVideo);
    document.getElementById('gradient-color1').addEventListener('input', updateGradient);
    document.getElementById('gradient-color2').addEventListener('input', updateGradient);
    document.getElementById('gradient-direction').addEventListener('change', updateGradient);
    
    // Upload de fichiers
    document.getElementById('upload-image-btn').addEventListener('click', () => document.getElementById('image-upload').click());
    document.getElementById('upload-video-btn').addEventListener('click', () => document.getElementById('video-upload').click());
    document.getElementById('upload-music-btn').addEventListener('click', () => document.getElementById('music-upload').click());
    
    document.getElementById('image-upload').addEventListener('change', handleImageUpload);
    document.getElementById('video-upload').addEventListener('change', handleVideoUpload);
    document.getElementById('music-upload').addEventListener('change', handleMusicUpload);
    
    // Musique
    document.getElementById('music-url').addEventListener('input', updateMusicUrl);
    document.getElementById('music-volume').addEventListener('input', updateMusicVolume);
    document.getElementById('play-music-btn').addEventListener('click', playMusic);
    document.getElementById('pause-music-btn').addEventListener('click', pauseMusic);
    
    // Informations du profil
    document.getElementById('username-input').addEventListener('input', updateUsername);
    document.getElementById('handle-input').addEventListener('input', updateHandle);
    
    // Photo de profil
    document.getElementById('upload-profile-photo-btn').addEventListener('click', () => document.getElementById('profile-photo-upload').click());
    document.getElementById('profile-photo-upload').addEventListener('change', handleProfilePhotoUpload);
    document.getElementById('profile-photo-url').addEventListener('input', handleProfilePhotoUrl);
    document.getElementById('photo-shape').addEventListener('change', updatePhotoShape);
    document.getElementById('photo-size').addEventListener('input', updatePhotoSize);
    
    // Description
    document.getElementById('profile-description').addEventListener('input', updateDescription);
    document.getElementById('gif-search').addEventListener('input', searchGifs);
    
    // Emoji picker
    document.querySelectorAll('.emoji-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const emoji = e.target.getAttribute('data-emoji');
            insertEmoji(emoji);
        });
    });
    
    // Effets du pseudo
    document.getElementById('username-effect').addEventListener('change', updateUsernameEffect);
    
    // Animation
    document.getElementById('animation-type').addEventListener('change', updateAnimation);
    document.getElementById('animation-intensity').addEventListener('input', updateAnimationIntensity);
    
    // Zoom
    document.getElementById('zoom-effect').addEventListener('change', updateZoomEffect);
    document.getElementById('zoom-level').addEventListener('input', updateZoomLevel);
    
    // Transparence
    document.getElementById('background-opacity').addEventListener('input', updateOpacity);
    
    // Curseur personnalisé
    document.getElementById('custom-cursor').addEventListener('change', updateCustomCursor);
    document.getElementById('cursor-style').addEventListener('change', updateCursorStyle);
    
    // Effets supplémentaires
    document.getElementById('particles-effect').addEventListener('change', updateParticlesEffect);
    document.getElementById('distortion-effect').addEventListener('change', updateDistortionEffect);
    document.getElementById('loading-animation').addEventListener('change', updateLoadingAnimation);
    document.getElementById('mirror-effect').addEventListener('change', updateMirrorEffect);
    document.getElementById('dark-mode-toggle').addEventListener('change', updateDarkMode);
    
    // Mise à jour des affichages en temps réel
    document.getElementById('music-volume').addEventListener('input', updateDisplayTexts);
    document.getElementById('animation-intensity').addEventListener('input', updateDisplayTexts);
    document.getElementById('zoom-level').addEventListener('input', updateDisplayTexts);
    document.getElementById('background-opacity').addEventListener('input', updateDisplayTexts);
    document.getElementById('photo-size').addEventListener('input', updateDisplayTexts);
    
    // Curseur personnalisé
    document.addEventListener('mousemove', updateCustomCursorPosition);
    
    // Animation 3D du profil - maintenant sur toute la page
    document.addEventListener('mousemove', handleGlobalTilt);
    document.addEventListener('mouseleave', resetGlobalTilt);
    
    // Zoom au survol
    if (profilePreview) {
        profilePreview.addEventListener('mouseenter', handleProfileZoom);
        profilePreview.addEventListener('mouseleave', resetProfileZoom);
    }
}

// Fonctions principales
function enterEditor() {
    welcomeScreen.classList.add('hidden');
    editor.classList.remove('hidden');
    document.body.classList.add('show-cursor');
}

function updatePreview() {
    updatePageBackground();
    updateBackground();
    updateUsernameDisplay();
    updateHandleDisplay();
    updateAnimationClasses();
    updateEffectClasses();
    updateProfilePhotoDisplay();
    updateDescriptionDisplay();
}

function updateDisplayValues() {
    // Mettre à jour les valeurs affichées dans les inputs
    document.getElementById('page-background-color').value = profileData.pageBackground.color;
    document.getElementById('page-background-image-url').value = profileData.pageBackground.image;
    document.getElementById('page-background-video-url').value = profileData.pageBackground.video;
    document.getElementById('page-gradient-color1').value = profileData.pageBackground.gradient.color1;
    document.getElementById('page-gradient-color2').value = profileData.pageBackground.gradient.color2;
    document.getElementById('page-gradient-direction').value = profileData.pageBackground.gradient.direction;
    document.getElementById('page-animation-style').value = profileData.pageBackground.animated;
    
    document.getElementById('background-color').value = profileData.background.color;
    document.getElementById('background-image-url').value = profileData.background.image;
    document.getElementById('background-video-url').value = profileData.background.video;
    document.getElementById('gradient-color1').value = profileData.background.gradient.color1;
    document.getElementById('gradient-color2').value = profileData.background.gradient.color2;
    document.getElementById('gradient-direction').value = profileData.background.gradient.direction;
    
    document.getElementById('music-url').value = profileData.music.url;
    document.getElementById('music-volume').value = profileData.music.volume;
    
    document.getElementById('username-input').value = profileData.username;
    document.getElementById('handle-input').value = profileData.handle;
    
    document.getElementById('profile-description').value = profileData.description;
    document.getElementById('photo-shape').value = profileData.photoShape;
    document.getElementById('photo-size').value = profileData.photoSize;
    
    document.getElementById('username-effect').value = profileData.usernameEffect;
    document.getElementById('animation-type').value = profileData.animation.type;
    document.getElementById('animation-intensity').value = profileData.animation.intensity;
    document.getElementById('zoom-effect').checked = profileData.zoom.enabled;
    document.getElementById('zoom-level').value = profileData.zoom.level;
    document.getElementById('background-opacity').value = profileData.opacity;
    document.getElementById('custom-cursor').checked = profileData.cursor.enabled;
    document.getElementById('cursor-style').value = profileData.cursor.style;
    
    document.getElementById('particles-effect').checked = profileData.effects.particles;
    document.getElementById('distortion-effect').checked = profileData.effects.distortion;
    document.getElementById('loading-animation').checked = profileData.effects.loading;
    document.getElementById('mirror-effect').checked = profileData.effects.mirror;
    document.getElementById('dark-mode-toggle').checked = profileData.effects.darkMode;
    
    // Mettre à jour les affichages
    updateDisplayTexts();
}

function updateDisplayTexts() {
    // Mettre à jour les textes d'affichage
    const volumeDisplay = document.getElementById('volume-display');
    const intensityDisplay = document.getElementById('intensity-display');
    const zoomDisplay = document.getElementById('zoom-display');
    const opacityDisplay = document.getElementById('opacity-display');
    const photoSizeDisplay = document.getElementById('photo-size-display');
    
    if (volumeDisplay) volumeDisplay.textContent = profileData.music.volume + '%';
    if (intensityDisplay) intensityDisplay.textContent = profileData.animation.intensity;
    if (zoomDisplay) zoomDisplay.textContent = profileData.zoom.level + 'x';
    if (opacityDisplay) opacityDisplay.textContent = profileData.opacity + '%';
    if (photoSizeDisplay) photoSizeDisplay.textContent = profileData.photoSize + 'px';
}

// Fonctions de gestion des inputs
function handlePageBackgroundTypeChange() {
    const type = document.getElementById('page-background-type').value;
    profileData.pageBackground.type = type;
    
    // Afficher/masquer les options appropriées
    const colorSection = document.getElementById('page-color-section');
    const imageSection = document.getElementById('page-image-section');
    const videoSection = document.getElementById('page-video-section');
    const gradientSection = document.getElementById('page-gradient-section');
    const animationSection = document.getElementById('page-animation-section');
    
    [colorSection, imageSection, videoSection, gradientSection, animationSection].forEach(section => {
        if (section) section.style.display = 'none';
    });
    
    switch(type) {
        case 'color':
            if (colorSection) colorSection.style.display = 'block';
            break;
        case 'image':
            if (imageSection) imageSection.style.display = 'block';
            break;
        case 'video':
            if (videoSection) videoSection.style.display = 'block';
            break;
        case 'gradient':
            if (gradientSection) gradientSection.style.display = 'block';
            break;
        case 'animated':
            if (animationSection) animationSection.style.display = 'block';
            break;
    }
    
    updatePageBackground();
}

function updatePageBackgroundColor() {
    profileData.pageBackground.color = document.getElementById('page-background-color').value;
    updatePageBackground();
}

function updatePageBackgroundImage() {
    profileData.pageBackground.image = document.getElementById('page-background-image-url').value;
    updatePageBackground();
}

function updatePageBackgroundVideo() {
    profileData.pageBackground.video = document.getElementById('page-background-video-url').value;
    updatePageBackground();
}

function updatePageGradient() {
    profileData.pageBackground.gradient.color1 = document.getElementById('page-gradient-color1').value;
    profileData.pageBackground.gradient.color2 = document.getElementById('page-gradient-color2').value;
    profileData.pageBackground.gradient.direction = document.getElementById('page-gradient-direction').value;
    updatePageBackground();
}

function updatePageAnimation() {
    profileData.pageBackground.animated = document.getElementById('page-animation-style').value;
    updatePageBackground();
}

function updatePageBackground() {
    const bg = profileData.pageBackground;
    let backgroundCSS = '';
    
    switch(bg.type) {
        case 'color':
            backgroundCSS = bg.color;
            break;
        case 'image':
            backgroundCSS = `url('${bg.image}') center/cover`;
            break;
        case 'video':
            createPageBackgroundVideo(bg.video);
            return;
        case 'gradient':
            backgroundCSS = `linear-gradient(${bg.gradient.direction}, ${bg.gradient.color1}, ${bg.gradient.color2})`;
            break;
        case 'animated':
            backgroundCSS = getAnimatedBackgroundCSS(bg.animated);
            break;
    }
    
    document.body.style.background = backgroundCSS;
    
    // Ajouter l'animation si nécessaire
    if (bg.type === 'animated') {
        document.body.style.animation = `${bg.animated} 10s ease-in-out infinite`;
    } else {
        document.body.style.animation = 'none';
    }
}

function createPageBackgroundVideo(videoUrl) {
    if (!videoUrl) return;
    
    // Supprimer l'ancienne vidéo s'il y en a une
    const existingVideo = document.getElementById('page-background-video');
    if (existingVideo) {
        existingVideo.remove();
    }
    
    const video = document.createElement('video');
    video.id = 'page-background-video';
    video.src = videoUrl;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    `;
    
    document.body.appendChild(video);
}

function handlePageImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileData.pageBackground.image = e.target.result;
            document.getElementById('page-background-image-url').value = e.target.result;
            updatePageBackground();
        };
        reader.readAsDataURL(file);
    }
}

function handlePageVideoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileData.pageBackground.video = e.target.result;
            document.getElementById('page-background-video-url').value = e.target.result;
            updatePageBackground();
        };
        reader.readAsDataURL(file);
    }
}

function handleBackgroundTypeChange() {
    const type = document.getElementById('background-type').value;
    profileData.background.type = type;
    
    // Afficher/masquer les options appropriées
    const colorSection = document.getElementById('color-section');
    const imageSection = document.getElementById('image-section');
    const videoSection = document.getElementById('video-section');
    const gradientSection = document.getElementById('gradient-section');
    
    [colorSection, imageSection, videoSection, gradientSection].forEach(section => {
        if (section) section.style.display = 'none';
    });
    
    switch(type) {
        case 'color':
            if (colorSection) colorSection.style.display = 'block';
            break;
        case 'image':
            if (imageSection) imageSection.style.display = 'block';
            break;
        case 'video':
            if (videoSection) videoSection.style.display = 'block';
            break;
        case 'gradient':
            if (gradientSection) gradientSection.style.display = 'block';
            break;
    }
    
    updateBackground();
}

function updateBackgroundColor() {
    profileData.background.color = document.getElementById('background-color').value;
    updateBackground();
}

function updateBackgroundImage() {
    profileData.background.image = document.getElementById('background-image-url').value;
    updateBackground();
}

function updateBackgroundVideo() {
    profileData.background.video = document.getElementById('background-video-url').value;
    updateBackground();
}

function updateGradient() {
    profileData.background.gradient.color1 = document.getElementById('gradient-color1').value;
    profileData.background.gradient.color2 = document.getElementById('gradient-color2').value;
    profileData.background.gradient.direction = document.getElementById('gradient-direction').value;
    updateBackground();
}

function updateBackground() {
    const bg = profileData.background;
    let backgroundCSS = '';
    
    switch(bg.type) {
        case 'color':
            backgroundCSS = bg.color;
            break;
        case 'image':
            backgroundCSS = `url('${bg.image}') center/cover`;
            break;
        case 'video':
            createBackgroundVideo(bg.video);
            return;
        case 'gradient':
            backgroundCSS = `linear-gradient(${bg.gradient.direction}, ${bg.gradient.color1}, ${bg.gradient.color2})`;
            break;
    }
    
    if (profileBackground) {
        profileBackground.style.background = backgroundCSS;
        profileBackground.style.opacity = profileData.opacity / 100;
    }
}

function createBackgroundVideo(videoUrl) {
    if (!videoUrl || !profileBackground) return;
    
    // Supprimer l'ancienne vidéo s'il y en a une
    const existingVideo = profileBackground.querySelector('video');
    if (existingVideo) {
        existingVideo.remove();
    }
    
    const video = document.createElement('video');
    video.src = videoUrl;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    `;
    
    profileBackground.appendChild(video);
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileData.background.image = e.target.result;
            document.getElementById('background-image-url').value = e.target.result;
            updateBackground();
        };
        reader.readAsDataURL(file);
    }
}

function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileData.background.video = e.target.result;
            document.getElementById('background-video-url').value = e.target.result;
            updateBackground();
        };
        reader.readAsDataURL(file);
    }
}

function handleMusicUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileData.music.url = e.target.result;
            document.getElementById('music-url').value = e.target.result;
            updateMusicUrl();
        };
        reader.readAsDataURL(file);
    }
}

function updateMusicUrl() {
    profileData.music.url = document.getElementById('music-url').value;
    if (backgroundMusic) {
        backgroundMusic.src = profileData.music.url;
    }
}

function updateMusicVolume() {
    profileData.music.volume = document.getElementById('music-volume').value;
    if (backgroundMusic) {
        backgroundMusic.volume = profileData.music.volume / 100;
    }
}

function playMusic() {
    if (backgroundMusic && profileData.music.url) {
        backgroundMusic.play();
        profileData.music.playing = true;
    }
}

function pauseMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        profileData.music.playing = false;
    }
}

function updateUsername() {
    profileData.username = document.getElementById('username-input').value;
    updateUsernameDisplay();
}

function updateHandle() {
    profileData.handle = document.getElementById('handle-input').value;
    updateHandleDisplay();
}

function updateUsernameDisplay() {
    if (profileUsername) {
        profileUsername.textContent = profileData.username;
        profileUsername.className = `profile-username ${profileData.usernameEffect}`;
    }
}

function updateHandleDisplay() {
    if (profileHandle) {
        profileHandle.textContent = `@${profileData.handle}`;
    }
}

function updateUsernameEffect() {
    profileData.usernameEffect = document.getElementById('username-effect').value;
    updateUsernameDisplay();
}

function updateAnimation() {
    profileData.animation.type = document.getElementById('animation-type').value;
    updateAnimationClasses();
}

function updateAnimationIntensity() {
    profileData.animation.intensity = document.getElementById('animation-intensity').value;
}

function updateAnimationClasses() {
    if (profilePreview) {
        // Supprimer toutes les classes d'animation
        profilePreview.classList.remove('tilt', 'bounce', 'pulse', 'shake', 'rotate', 'float', 'glow');
        
        // Ajouter la nouvelle classe d'animation
        if (profileData.animation.type !== 'none') {
            profilePreview.classList.add(profileData.animation.type);
        }
    }
}

function handleGlobalTilt(event) {
    if (profileData.animation.type === 'tilt' && profilePreview) {
        const rect = profilePreview.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -10 * (profileData.animation.intensity / 5);
        const rotateY = (x - centerX) / centerX * 10 * (profileData.animation.intensity / 5);
        
        profilePreview.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

function resetGlobalTilt() {
    if (profilePreview) {
        profilePreview.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
}

function updateZoomEffect() {
    profileData.zoom.enabled = document.getElementById('zoom-effect').checked;
}

function updateZoomLevel() {
    profileData.zoom.level = document.getElementById('zoom-level').value;
}

function handleProfileZoom() {
    if (profileData.zoom.enabled && profilePreview) {
        profilePreview.style.transform = `scale(${profileData.zoom.level})`;
    }
}

function resetProfileZoom() {
    if (profilePreview) {
        profilePreview.style.transform = 'scale(1)';
    }
}

function updateOpacity() {
    profileData.opacity = document.getElementById('background-opacity').value;
    if (profileBackground) {
        profileBackground.style.opacity = profileData.opacity / 100;
    }
}

function updateCustomCursor() {
    profileData.cursor.enabled = document.getElementById('custom-cursor').checked;
    applyCustomCursor();
}

function updateCursorStyle() {
    profileData.cursor.style = document.getElementById('cursor-style').value;
    applyCustomCursor();
}

function applyCustomCursor() {
    if (profileData.cursor.enabled) {
        document.body.style.cursor = profileData.cursor.style;
        if (customCursor) {
            customCursor.style.display = 'block';
        }
    } else {
        document.body.style.cursor = 'default';
        if (customCursor) {
            customCursor.style.display = 'none';
        }
    }
}

function updateCustomCursorPosition(event) {
    if (profileData.cursor.enabled && customCursor) {
        customCursor.style.left = event.clientX + 'px';
        customCursor.style.top = event.clientY + 'px';
    }
}

function setupCustomCursor() {
    // Initialiser le curseur personnalisé sans appeler updateCustomCursor
    applyCustomCursor();
}

function updateParticlesEffect() {
    profileData.effects.particles = document.getElementById('particles-effect').checked;
    setupParticles();
}

function updateDistortionEffect() {
    profileData.effects.distortion = document.getElementById('distortion-effect').checked;
    updateEffectClasses();
}

function updateLoadingAnimation() {
    profileData.effects.loading = document.getElementById('loading-animation').checked;
    updateEffectClasses();
}

function updateMirrorEffect() {
    profileData.effects.mirror = document.getElementById('mirror-effect').checked;
    updateEffectClasses();
}

function updateDarkMode() {
    profileData.effects.darkMode = document.getElementById('dark-mode-toggle').checked;
    updateEffectClasses();
}

function updateEffectClasses() {
    if (profilePreview) {
        // Supprimer toutes les classes d'effets
        profilePreview.classList.remove('particles', 'distortion', 'loading', 'mirror', 'dark-mode');
        
        // Ajouter les nouvelles classes d'effets
        Object.keys(profileData.effects).forEach(effect => {
            if (profileData.effects[effect]) {
                profilePreview.classList.add(effect);
            }
        });
    }
}

function setupParticles() {
    if (profileData.effects.particles) {
        createParticles();
    } else {
        removeParticles();
    }
}

function createParticles() {
    removeParticles();
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.id = 'particles-container';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        particlesContainer.appendChild(particle);
    }
    
    if (profilePreview) {
        profilePreview.appendChild(particlesContainer);
    }
}

function removeParticles() {
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        particlesContainer.remove();
    }
}

function showPreviewModal() {
    const modal = document.getElementById('preview-modal');
    modal.classList.remove('hidden');
    
    // Générer le code pour la prévisualisation
    const { html, css, js } = generateSeparateCode();
    
    // Créer une iframe pour la prévisualisation
    const previewFrame = document.getElementById('preview-frame');
    const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    
    previewDoc.open();
    previewDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            <div class="profile-container">
                <div class="profile-background"></div>
                <div class="profile-content">
                    <div class="profile-photo" id="profile-photo"></div>
                    <h2 class="profile-username">${profileData.username}</h2>
                    <p class="profile-handle">@${profileData.handle}</p>
                    <div class="profile-description">${profileData.description}</div>
                </div>
            </div>
            <script>${js}</script>
        </body>
        </html>
    `);
    previewDoc.close();
}

function showFullPage() {
    const fullPageHTML = generateFullPageHTML();
    const newWindow = window.open('', '_blank');
    newWindow.document.write(fullPageHTML);
    newWindow.document.close();
}

function showCodeModal() {
    const modal = document.getElementById('code-modal');
    modal.classList.remove('hidden');
    
    // Générer et afficher le code
    const { html, css, js } = generateSeparateCode();
    
    document.getElementById('html-output').textContent = html;
    document.getElementById('css-output').textContent = css;
    document.getElementById('js-output').textContent = js;
    
    // Activer l'onglet HTML par défaut
    switchCodeTab({ target: document.querySelector('[data-tab="html"]') });
}

function switchCodeTab(event) {
    const tab = event.target;
    const tabName = tab.getAttribute('data-tab');
    
    // Désactiver tous les onglets
    document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.code-content').forEach(c => c.classList.remove('active'));
    
    // Activer l'onglet cliqué
    tab.classList.add('active');
    document.getElementById(tabName + '-output').classList.add('active');
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
}

function copyCode() {
    const codeText = document.querySelector('.code-content.active').textContent;
    navigator.clipboard.writeText(codeText).then(() => {
        alert('Code copié dans le presse-papiers !');
    }).catch(() => {
        // Fallback pour les navigateurs plus anciens
        const textArea = document.createElement('textarea');
        textArea.value = codeText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Code copié dans le presse-papiers !');
    });
}

function generateSeparateCode() {
    const htmlCode = generateHTMLCode();
    const cssCode = generateCSSCode();
    const jsCode = generateJSCode();
    
    return { html: htmlCode, css: cssCode, js: jsCode };
}

function generateHTMLCode() {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${profileData.username} - Profil Personnalisé</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="profile-container">
        <div class="profile-background"></div>
        <div class="profile-content">
            <div class="profile-photo" id="profile-photo"></div>
            <h2 class="profile-username">${profileData.username}</h2>
            <p class="profile-handle">@${profileData.handle}</p>
            <div class="profile-description">${profileData.description}</div>
        </div>
    </div>
    
    <audio id="background-music" loop>
        <source src="${profileData.music.url}" type="audio/mpeg">
    </audio>
    
    <script src="script.js"></script>
</body>
</html>`;
}

function generateCSSCode() {
    return `body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${getPageBackgroundCSS()};
    overflow: hidden;
}

.profile-container {
    width: 400px;
    height: 500px;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    ${getAnimationCSS()}
}

.profile-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${getBackgroundCSS()};
    opacity: ${profileData.opacity / 100};
    transition: all 0.3s ease;
}

.profile-content {
    position: absolute;
    bottom: 30px;
    left: 30px;
    right: 30px;
    color: white;
    z-index: 2;
}

.profile-photo {
    width: ${profileData.photoSize}px;
    height: ${profileData.photoSize}px;
    border-radius: ${getPhotoShapeCSS(profileData.photoShape)};
    background-image: ${profileData.profilePhoto ? `url('${profileData.profilePhoto}')` : 'none'};
    background-size: cover;
    background-position: center;
    margin-bottom: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
}

.profile-username {
    font-family: 'Orbitron', monospace;
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    ${getUsernameEffectCSS()}
}

.profile-handle {
    font-size: 1.2rem;
    opacity: 0.8;
    font-weight: 300;
    margin-bottom: 15px;
}

.profile-description {
    font-size: 1rem;
    line-height: 1.5;
    opacity: 0.9;
}

${getEffectCSS()}
${getAnimationKeyframes()}`;
}

function generateJSCode() {
    return `// Données du profil
const profileData = ${JSON.stringify(profileData, null, 2)};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Animation 3D au survol
    const profileContainer = document.querySelector('.profile-container');
    
    document.addEventListener('mousemove', function(event) {
        if ('${profileData.animation.type}' === 'tilt') {
            const rect = profileContainer.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10 * (${profileData.animation.intensity} / 5);
            const rotateY = (x - centerX) / centerX * 10 * (${profileData.animation.intensity} / 5);
            
            profileContainer.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
        }
    });
    
    document.addEventListener('mouseleave', function() {
        if ('${profileData.animation.type}' === 'tilt') {
            profileContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    });
    
    // Zoom au survol
    if (${profileData.zoom.enabled}) {
        profileContainer.addEventListener('mouseenter', function() {
            profileContainer.style.transform = \`scale(${profileData.zoom.level})\`;
        });
        
        profileContainer.addEventListener('mouseleave', function() {
            profileContainer.style.transform = 'scale(1)';
        });
    }
    
    // Musique de fond
    if ('${profileData.music.url}') {
        const audio = document.getElementById('background-music');
        audio.volume = ${profileData.music.volume} / 100;
        
        document.addEventListener('click', function() {
            audio.play();
        }, { once: true });
    }
    
    // Curseur personnalisé
    if (${profileData.cursor.enabled}) {
        document.body.style.cursor = '${profileData.cursor.style}';
    }
    
    console.log('Profil personnalisé chargé !');
});`;
}

function generateFullPageHTML() {
    // Récupérer les positions sauvegardées
    const savedPositions = localStorage.getItem('profilePositions');
    let positions = {};
    if (savedPositions) {
        try {
            positions = JSON.parse(savedPositions);
        } catch (error) {
            console.error('Erreur lors du chargement des positions:', error);
        }
    }

    // Positions par défaut si pas sauvegardées
    const photoPosition = positions['photo'] || { x: 30, y: 30 };
    const contentPosition = positions['content'] || { x: 30, y: 370 };

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${profileData.username} - Profil Complet</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${getPageBackgroundCSS()};
            overflow: hidden;
            ${profileData.effects.darkMode ? 'filter: invert(1) hue-rotate(180deg);' : ''}
        }
        
        .profile-container {
            width: 400px;
            height: 500px;
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ${getAnimationCSS()}
            ${profileData.effects.mirror ? 'transform: scaleX(-1);' : ''}
            ${profileData.effects.distortion ? 'filter: contrast(1.2) saturate(1.5);' : ''}
        }
        
        .profile-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${getBackgroundCSS()};
            opacity: ${profileData.opacity / 100};
            transition: all 0.3s ease;
        }
        
        .profile-photo-preview {
            position: absolute;
            top: ${photoPosition.y}px;
            left: ${photoPosition.x}px;
            width: ${profileData.photoSize}px;
            height: ${profileData.photoSize}px;
            border-radius: ${getPhotoShapeCSS(profileData.photoShape)};
            overflow: hidden;
            z-index: 10;
            transition: all 0.3s ease;
        }
        
        .profile-photo {
            width: 100%;
            height: 100%;
            background-image: ${profileData.profilePhoto ? `url('${profileData.profilePhoto}')` : 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM2NjY2NjYiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=")'};
            background-size: cover;
            background-position: center;
            border: 3px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        }
        
        .profile-content {
            position: absolute;
            top: ${contentPosition.y}px;
            left: ${contentPosition.x}px;
            right: 30px;
            color: white;
            z-index: 10;
            transition: all 0.3s ease;
        }
        
        .profile-username {
            font-family: 'Orbitron', monospace;
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            ${getUsernameEffectCSS()}
        }
        
        .profile-handle {
            font-size: 1.2rem;
            opacity: 0.8;
            font-weight: 300;
            margin-bottom: 15px;
        }
        
        .profile-description-display {
            font-size: 1rem;
            line-height: 1.5;
            opacity: 0.9;
            margin-top: 10px;
            padding: 10px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        
        ${getEffectCSS()}
        ${getAnimationKeyframes()}
        
        /* Animation de chargement */
        ${profileData.effects.loading ? `
        .loading-animation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid #4ecdc4;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            z-index: 1000;
        }
        
        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        ` : ''}
    </style>
</head>
<body>
    <div class="profile-container">
        <div class="profile-background"></div>
        <div class="profile-photo-preview">
            <div class="profile-photo"></div>
        </div>
        <div class="profile-content">
            <h2 class="profile-username">${profileData.username}</h2>
            <p class="profile-handle">@${profileData.handle}</p>
            <div class="profile-description-display">${profileData.description}</div>
        </div>
        ${profileData.effects.loading ? '<div class="loading-animation"></div>' : ''}
    </div>
    
    <script>
        // Animation 3D au survol
        const profileContainer = document.querySelector('.profile-container');
        
        document.addEventListener('mousemove', function(event) {
            if ('${profileData.animation.type}' === 'tilt') {
                const rect = profileContainer.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10 * (${profileData.animation.intensity} / 5);
                const rotateY = (x - centerX) / centerX * 10 * (${profileData.animation.intensity} / 5);
                
                profileContainer.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
            }
        });
        
        document.addEventListener('mouseleave', function() {
            if ('${profileData.animation.type}' === 'tilt') {
                profileContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }
        });
        
        // Zoom au survol
        if (${profileData.zoom.enabled}) {
            profileContainer.addEventListener('mouseenter', function() {
                profileContainer.style.transform = \`scale(${profileData.zoom.level})\`;
            });
            
            profileContainer.addEventListener('mouseleave', function() {
                profileContainer.style.transform = 'scale(1)';
            });
        }
        
        // Particules en arrière-plan
        ${profileData.effects.particles ? `
        function createParticles() {
            const container = document.querySelector('.profile-container');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                container.appendChild(particle);
            }
        }
        createParticles();
        ` : ''}
        
        // Effet de distorsion en temps réel
        ${profileData.effects.distortion ? `
        document.addEventListener('mousemove', function(event) {
            const container = document.querySelector('.profile-container');
            const rect = container.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            
            const distortionX = (x - 0.5) * 20;
            const distortionY = (y - 0.5) * 20;
            
            container.style.filter = \`contrast(1.2) saturate(1.5) blur(\${Math.abs(distortionX) * 0.1}px)\`;
        });
        ` : ''}
        
        // Musique de fond
        if ('${profileData.music.url}') {
            const audio = new Audio('${profileData.music.url}');
            audio.loop = true;
            audio.volume = ${profileData.music.volume} / 100;
            
            document.addEventListener('click', function() {
                audio.play();
            }, { once: true });
        }
    </script>
</body>
</html>`;
}

function getPageBackgroundCSS() {
    const bg = profileData.pageBackground;
    switch(bg.type) {
        case 'color': return bg.color;
        case 'image': return `url('${bg.image}') center/cover`;
        case 'gradient': return `linear-gradient(${bg.gradient.direction}, ${bg.gradient.color1}, ${bg.gradient.color2})`;
        case 'animated': return getAnimatedBackgroundCSS(bg.animated);
        default: return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
}

function getAnimatedBackgroundCSS(style) {
    switch(style) {
        case 'aurora': return 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
        case 'galaxy': return 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
        case 'ocean': return 'linear-gradient(45deg, #1e3c72, #2a5298, #4facfe, #00f2fe)';
        case 'fire': return 'linear-gradient(45deg, #ff6b6b, #ff8e53, #ffa726, #ff7043)';
        case 'matrix': return '#000';
        default: return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
}

function getBackgroundCSS() {
    const bg = profileData.background;
    switch(bg.type) {
        case 'color': return bg.color;
        case 'image': return `url('${bg.image}') center/cover`;
        case 'gradient': return `linear-gradient(${bg.gradient.direction}, ${bg.gradient.color1}, ${bg.gradient.color2})`;
        default: return '#1a1a1a';
    }
}

function getUsernameEffectCSS() {
    const effect = profileData.usernameEffect;
    switch(effect) {
        case 'glow': return 'text-shadow: 0 0 20px #4ecdc4, 0 0 40px #4ecdc4;';
        case 'neon': return 'color: #ff6b6b; text-shadow: 0 0 10px #ff6b6b, 0 0 20px #ff6b6b;';
        case 'rainbow': return 'background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4); -webkit-background-clip: text; -webkit-text-fill-color: transparent;';
        case 'typing': return 'border-right: 3px solid #4ecdc4; animation: typing 3s steps(20) infinite, blink 1s infinite; white-space: nowrap; overflow: hidden;';
        case 'glitch': return 'animation: glitch 2s infinite;';
        case 'fire': return 'background: linear-gradient(45deg, #ff6b6b, #ff8e8e, #ffb3b3); -webkit-background-clip: text; -webkit-text-fill-color: transparent;';
        case 'ice': return 'background: linear-gradient(45deg, #4ecdc4, #45b7d1, #96ceb4); -webkit-background-clip: text; -webkit-text-fill-color: transparent;';
        case 'electric': return 'color: #feca57; text-shadow: 0 0 20px #feca57, 0 0 40px #feca57;';
        case 'hologram': return 'background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ff6b6b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% 200%; animation: hologram 3s ease-in-out infinite;';
        default: return '';
    }
}

function getEffectCSS() {
    let css = '';
    
    if (profileData.effects.particles) {
        css += `
        .particle {
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            width: 4px;
            height: 4px;
            pointer-events: none;
            animation: particleFloat 6s ease-in-out infinite;
        }
        
        @keyframes particleFloat {
            0%, 100% { 
                transform: translateY(0px) translateX(0px);
                opacity: 0;
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { 
                transform: translateY(-100px) translateX(50px);
                opacity: 0;
            }
        }`;
    }
    
    if (profileData.effects.distortion) {
        css += `
        .profile-container {
            filter: contrast(1.2) saturate(1.5);
        }`;
    }
    
    if (profileData.effects.mirror) {
        css += `
        .profile-container {
            transform: scaleX(-1);
        }`;
    }
    
    if (profileData.effects.darkMode) {
        css += `
        body {
            filter: invert(1) hue-rotate(180deg);
        }`;
    }
    
    return css;
}

function getAnimationCSS() {
    const animation = profileData.animation;
    switch(animation.type) {
        case 'tilt': return 'transition: transform 0.3s ease;';
        case 'bounce': return 'animation: bounce 2s infinite;';
        case 'pulse': return 'animation: pulse 2s infinite;';
        case 'shake': return 'animation: shake 0.5s infinite;';
        case 'rotate': return 'animation: rotate 4s linear infinite;';
        case 'float': return 'animation: float 3s ease-in-out infinite;';
        case 'glow': return 'animation: glow 2s ease-in-out infinite alternate;';
        default: return '';
    }
}

function getAnimationKeyframes() {
    return `
    @keyframes typing {
        0% { width: 0; }
        50% { width: 100%; }
        100% { width: 0; }
    }
    
    @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: #4ecdc4; }
    }
    
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    @keyframes hologram {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes glow {
        from { box-shadow: 0 0 20px rgba(78, 205, 196, 0.5); }
        to { box-shadow: 0 0 30px rgba(78, 205, 196, 0.8); }
    }
    
    @keyframes aurora {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes galaxy {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes ocean {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes fire {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes matrix {
        0% { background-position: 0% 0%; }
        100% { background-position: 100% 100%; }
    }`;
}

function setupDragAndDrop() {
    const draggableElements = document.querySelectorAll('.draggable');
    
    draggableElements.forEach(element => {
        element.addEventListener('mousedown', startDrag);
        element.addEventListener('touchstart', startDrag);
        element.style.cursor = 'grab';
    });
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    // Charger les positions sauvegardées
    loadSavedPositions();
}

let isDragging = false;
let currentElement = null;
let initialX, initialY;
let currentX, currentY;

function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    currentElement = e.target.closest('.draggable');
    
    if (!currentElement) return;
    
    const container = document.getElementById('profile-preview');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const elementRect = currentElement.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    // Calculer l'offset de la souris par rapport à l'élément dans le conteneur
    initialX = clientX - elementRect.left;
    initialY = clientY - elementRect.top;
    
    // Sauvegarder la position actuelle de l'élément dans le conteneur
    currentX = elementRect.left - containerRect.left;
    currentY = elementRect.top - containerRect.top;
    
    currentElement.style.zIndex = '1000';
    currentElement.style.cursor = 'grabbing';
    currentElement.style.transition = 'none';
}

function drag(e) {
    if (!isDragging || !currentElement) return;
    
    e.preventDefault();
    
    const container = document.getElementById('profile-preview');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    // Calculer la nouvelle position relative au conteneur
    const newX = clientX - containerRect.left - initialX;
    const newY = clientY - containerRect.top - initialY;
    
    // Limiter le déplacement dans les bounds du conteneur
    const elementRect = currentElement.getBoundingClientRect();
    const maxX = containerRect.width - elementRect.width;
    const maxY = containerRect.height - elementRect.height;
    
    currentX = Math.max(0, Math.min(newX, maxX));
    currentY = Math.max(0, Math.min(newY, maxY));
    
    // Appliquer la position
    currentElement.style.position = 'absolute';
    currentElement.style.left = currentX + 'px';
    currentElement.style.top = currentY + 'px';
}

function endDrag() {
    if (isDragging && currentElement) {
        isDragging = false;
        currentElement.style.zIndex = '10'; // Garder un z-index élevé pour rester visible
        currentElement.style.cursor = 'grab';
        currentElement.style.transition = 'all 0.3s ease';
        
        // Sauvegarder la position seulement si elle a changé et est valide
        if (currentX !== undefined && currentY !== undefined && 
            !isNaN(currentX) && !isNaN(currentY) &&
            currentX >= 0 && currentY >= 0) {
            saveElementPosition(currentElement, currentX, currentY);
        }
        
        // Réinitialiser les variables
        currentElement = null;
        currentX = undefined;
        currentY = undefined;
        initialX = undefined;
        initialY = undefined;
    }
}

function saveElementPosition(element, x, y) {
    const elementId = element.getAttribute('data-element');
    if (!profileData.positions) profileData.positions = {};
    profileData.positions[elementId] = { x, y };
    
    // Sauvegarder dans localStorage
    localStorage.setItem('profilePositions', JSON.stringify(profileData.positions));
}

function loadSavedPositions() {
    const savedPositions = localStorage.getItem('profilePositions');
    if (savedPositions) {
        try {
            profileData.positions = JSON.parse(savedPositions);
            
            // Appliquer les positions sauvegardées après un court délai pour s'assurer que les éléments existent
            setTimeout(() => {
                const container = document.getElementById('profile-preview');
                if (!container) return;
                
                Object.keys(profileData.positions).forEach(elementId => {
                    const element = document.querySelector(`[data-element="${elementId}"]`);
                    if (element && profileData.positions[elementId]) {
                        const pos = profileData.positions[elementId];
                        // Vérifier que les positions sont valides
                        if (pos.x !== undefined && pos.y !== undefined && 
                            !isNaN(pos.x) && !isNaN(pos.y) &&
                            pos.x >= 0 && pos.y >= 0) {
                            
                            // S'assurer que l'élément est visible et positionné correctement
                            element.style.position = 'absolute';
                            element.style.left = pos.x + 'px';
                            element.style.top = pos.y + 'px';
                            element.style.zIndex = '10'; // Garder un z-index élevé
                            element.style.cursor = 'grab';
                            element.style.transition = 'all 0.3s ease';
                            element.style.display = 'block';
                            element.style.visibility = 'visible';
                        }
                    }
                });
            }, 200); // Augmenter le délai pour s'assurer que tout est chargé
        } catch (error) {
            console.error('Erreur lors du chargement des positions:', error);
            // En cas d'erreur, supprimer les données corrompues
            localStorage.removeItem('profilePositions');
            profileData.positions = {};
        }
    }
}

function resetElementPositions() {
    // Supprimer les positions sauvegardées
    profileData.positions = {};
    localStorage.removeItem('profilePositions');
    
    // Réinitialiser les éléments draggables
    const draggableElements = document.querySelectorAll('.draggable');
    draggableElements.forEach(element => {
        element.style.position = 'static';
        element.style.left = 'auto';
        element.style.top = 'auto';
        element.style.transform = 'none';
        element.style.zIndex = '10'; // Garder un z-index élevé
        element.style.cursor = 'grab';
        element.style.transition = 'all 0.3s ease';
    });
    
    // Réinitialiser spécifiquement la photo de profil
    const photoPreview = document.getElementById('profile-photo-preview');
    if (photoPreview) {
        photoPreview.style.position = 'absolute';
        photoPreview.style.top = '30px';
        photoPreview.style.left = '30px';
        photoPreview.style.transform = 'none';
        photoPreview.style.zIndex = '10'; // Garder un z-index élevé
    }
    
    // Réinitialiser le contenu du profil
    const profileContent = document.getElementById('profile-content');
    if (profileContent) {
        profileContent.style.position = 'absolute';
        profileContent.style.bottom = '30px';
        profileContent.style.left = '30px';
        profileContent.style.right = '30px';
        profileContent.style.transform = 'none';
        profileContent.style.zIndex = '10'; // Garder un z-index élevé
    }
}

function setupProfilePhoto() {
    const photoInput = document.getElementById('profile-photo-upload');
    const photoUrlInput = document.getElementById('profile-photo-url');
    const photoShape = document.getElementById('photo-shape');
    const photoSize = document.getElementById('photo-size');
    
    if (photoInput) {
        photoInput.addEventListener('change', handleProfilePhotoUpload);
    }
    
    if (photoUrlInput) {
        photoUrlInput.addEventListener('input', handleProfilePhotoUrl);
    }
    
    if (photoShape) {
        photoShape.addEventListener('change', updatePhotoShape);
    }
    
    if (photoSize) {
        photoSize.addEventListener('input', updatePhotoSize);
    }
    
    // Initialiser la photo par défaut
    updateProfilePhotoDisplay();
}

function handleProfilePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileData.profilePhoto = e.target.result;
            document.getElementById('profile-photo-url').value = e.target.result;
            updateProfilePhotoDisplay();
        };
        reader.readAsDataURL(file);
    }
}

function handleProfilePhotoUrl() {
    const url = document.getElementById('profile-photo-url').value;
    if (url) {
        profileData.profilePhoto = url;
        updateProfilePhotoDisplay();
    }
}

function updatePhotoShape() {
    const shape = document.getElementById('photo-shape').value;
    profileData.photoShape = shape;
    updateProfilePhotoDisplay();
}

function updatePhotoSize() {
    const size = document.getElementById('photo-size').value;
    profileData.photoSize = parseInt(size);
    updateProfilePhotoDisplay();
    updateDisplayTexts();
}

function updateProfilePhotoDisplay() {
    const photoPreview = document.getElementById('profile-photo-preview');
    const photoElement = document.getElementById('profile-photo');
    
    if (photoPreview && photoElement) {
        // Mettre à jour la taille
        photoPreview.style.width = profileData.photoSize + 'px';
        photoPreview.style.height = profileData.photoSize + 'px';
        
        // Mettre à jour la forme
        photoElement.style.borderRadius = getPhotoShapeCSS(profileData.photoShape);
        
        // Mettre à jour l'image
        if (profileData.profilePhoto) {
            photoElement.style.backgroundImage = `url('${profileData.profilePhoto}')`;
            photoElement.style.backgroundSize = 'cover';
            photoElement.style.backgroundPosition = 'center';
        } else {
            // Image par défaut
            photoElement.style.backgroundImage = `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM2NjY2NjYiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=")'`;
        }
        
        // Ajouter des effets visuels
        photoElement.style.border = '3px solid rgba(255, 255, 255, 0.3)';
        photoElement.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        photoElement.style.transition = 'all 0.3s ease';
    }
}

function getPhotoShapeCSS(shape) {
    switch(shape) {
        case 'circle': return '50%';
        case 'square': return '0';
        case 'rounded': return '15px';
        case 'hexagon': return '50%';
        case 'diamond': return '0';
        default: return '50%';
    }
}

function setupDescription() {
    const descriptionInput = document.getElementById('profile-description');
    const emojiPicker = document.getElementById('emoji-picker');
    const gifSearch = document.getElementById('gif-search');
    
    if (descriptionInput) {
        descriptionInput.addEventListener('input', updateDescription);
    }
    
    if (emojiPicker) {
        emojiPicker.addEventListener('click', insertEmoji);
    }
    
    if (gifSearch) {
        gifSearch.addEventListener('input', searchGifs);
    }
}

function updateDescription() {
    const description = document.getElementById('profile-description').value;
    profileData.description = description;
    updateDescriptionDisplay();
}

function insertEmoji(emoji) {
    const descriptionInput = document.getElementById('profile-description');
    const cursorPos = descriptionInput.selectionStart;
    const textBefore = descriptionInput.value.substring(0, cursorPos);
    const textAfter = descriptionInput.value.substring(cursorPos);
    
    descriptionInput.value = textBefore + emoji + textAfter;
    descriptionInput.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
    
    updateDescription();
}

function searchGifs(query) {
    // Intégration avec une API GIF (ex: Giphy)
    // Pour l'instant, on utilise des GIFs statiques
    const gifs = [
        'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
        'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif',
        'https://media.giphy.com/media/l2Je66jG6mAAZxgqI/giphy.gif'
    ];
    
    displayGifResults(gifs);
}

function displayGifResults(gifs) {
    const gifResults = document.getElementById('gif-results');
    if (gifResults) {
        gifResults.innerHTML = '';
        gifs.forEach(gif => {
            const img = document.createElement('img');
            img.src = gif;
            img.addEventListener('click', () => insertGif(gif));
            gifResults.appendChild(img);
        });
    }
}

function insertGif(gifUrl) {
    const descriptionInput = document.getElementById('profile-description');
    const cursorPos = descriptionInput.selectionStart;
    const textBefore = descriptionInput.value.substring(0, cursorPos);
    const textAfter = descriptionInput.value.substring(cursorPos);
    
    descriptionInput.value = textBefore + `[GIF:${gifUrl}]` + textAfter;
    descriptionInput.setSelectionRange(cursorPos + gifUrl.length + 6, cursorPos + gifUrl.length + 6);
    
    updateDescription();
}

function updateDescriptionDisplay() {
    const descriptionDisplay = document.getElementById('profile-description-display');
    if (descriptionDisplay && profileData.description) {
        // Convertir les [GIF:url] en vraies images
        let html = profileData.description.replace(/\[GIF:(.*?)\]/g, '<img src="$1" style="width: 50px; height: 50px; border-radius: 5px;">');
        descriptionDisplay.innerHTML = html;
    }
}

function resetProfile() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser votre profil ?')) {
        // Réinitialiser complètement les données
        profileData = {
            pageBackground: {
                type: 'gradient',
                color: '#667eea',
                image: '',
                video: '',
                gradient: {
                    color1: '#667eea',
                    color2: '#764ba2',
                    direction: '135deg'
                },
                animated: 'aurora'
            },
            background: {
                type: 'color',
                color: '#1a1a1a',
                image: '',
                video: '',
                gradient: {
                    color1: '#ff6b6b',
                    color2: '#4ecdc4',
                    direction: 'to right'
                }
            },
            music: {
                url: '',
                volume: 50,
                playing: false
            },
            username: 'Votre Pseudo',
            handle: 'votre_handle',
            usernameEffect: 'none',
            animation: {
                type: 'none',
                intensity: 5
            },
            zoom: {
                enabled: true,
                level: 1.2
            },
            opacity: 100,
            cursor: {
                enabled: false,
                style: 'default'
            },
            effects: {
                particles: false,
                distortion: false,
                loading: false,
                mirror: false,
                darkMode: false
            },
            profilePhoto: '',
            photoShape: 'circle',
            photoSize: 80,
            description: 'Votre description personnalisée avec emojis et GIFs ! 🎉✨',
            positions: {}
        };
        
        // Réinitialiser tous les inputs
        updateDisplayValues();
        
        // Réinitialiser les positions des éléments
        resetElementPositions();
        
        // Réinitialiser la prévisualisation
        updatePreview();
        
        // Arrêter la musique si elle joue
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
        
        // Supprimer les particules
        removeParticles();
        
        // Réinitialiser le fond de la page
        document.body.style.background = '';
        document.body.style.animation = '';
        
        // Supprimer les vidéos de fond
        const pageVideo = document.getElementById('page-background-video');
        if (pageVideo) pageVideo.remove();
        
        const profileVideo = profileBackground ? profileBackground.querySelector('video') : null;
        if (profileVideo) profileVideo.remove();
        
        // Réinitialiser les types de fond
        document.getElementById('page-background-type').value = 'gradient';
        document.getElementById('background-type').value = 'color';
        
        // Afficher/masquer les sections appropriées
        handlePageBackgroundTypeChange();
        handleBackgroundTypeChange();
        
        // Réinitialiser le curseur personnalisé
        applyCustomCursor();
        
        // Supprimer toutes les classes d'effets
        if (profilePreview) {
            profilePreview.className = 'profile-preview';
        }
        
        alert('Profil réinitialisé avec succès !');
    }
}

console.log('Script de personnalisation de profil chargé avec succès !');      