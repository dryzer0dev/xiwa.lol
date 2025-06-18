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
    setupEventListeners();
    setupDragAndDrop();
    setupProfilePhoto();
    setupDescription();
    loadSavedPositions();
    loadSocialUrls();
    loadPhotoAndSocialPreferences();
    loadInterfacePreferences();
    initializeAudio();
    updatePreview();
    updateDisplayValues();
    updateDisplayTexts();
}

function initializeAudio() {
    // Créer l'élément audio s'il n'existe pas
    if (!backgroundMusic) {
        const audio = document.createElement('audio');
        audio.id = 'background-music';
        audio.loop = true;
        audio.preload = 'auto';
        audio.style.display = 'none';
        document.body.appendChild(audio);
        
        // Mettre à jour la variable globale
        window.backgroundMusic = audio;
    }
    
    // Configurer l'audio avec les données sauvegardées
    if (backgroundMusic && profileData.music.url) {
        try {
            backgroundMusic.src = profileData.music.url;
            backgroundMusic.volume = profileData.music.volume / 100;
            backgroundMusic.load();
            console.log('Audio initialisé avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'initialisation de l\'audio:', error);
        }
    }
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

    // Gestionnaire pour la bordure de photo
    document.getElementById('photo-border').addEventListener('change', function() {
        const borderStyle = this.value;
        const profilePhoto = document.getElementById('profile-photo');
        
        // Supprimer toutes les classes de bordure
        profilePhoto.classList.remove('border-none', 'border-solid', 'border-gradient', 'border-glow');
        
        // Ajouter la nouvelle classe
        if (borderStyle !== 'none') {
            profilePhoto.classList.add(`border-${borderStyle}`);
        }
        
        // Sauvegarder la préférence
        localStorage.setItem('photoBorder', borderStyle);
    });

    // Gestionnaires pour les réseaux sociaux
    const socialInputs = ['discord-url', 'tiktok-url', 'gmail-url', 'whatsapp-url'];
    const socialButtons = ['discord-btn', 'tiktok-btn', 'gmail-btn', 'whatsapp-btn'];
    
    socialInputs.forEach((inputId, index) => {
        const input = document.getElementById(inputId);
        const button = document.getElementById(socialButtons[index]);
        
        input.addEventListener('input', function() {
            const url = this.value.trim();
            
            if (url) {
                button.style.display = 'flex';
                button.style.visibility = 'visible';
                button.style.opacity = '1';
                
                // Formater l'URL selon le type
                let formattedUrl = url;
                if (inputId === 'gmail-url' && !url.startsWith('mailto:')) {
                    formattedUrl = `mailto:${url}`;
                } else if (inputId === 'whatsapp-url' && !url.startsWith('https://wa.me/')) {
                    // Nettoyer le numéro de téléphone
                    const phoneNumber = url.replace(/[^\d+]/g, '');
                    formattedUrl = `https://wa.me/${phoneNumber}`;
                }
                
                button.href = formattedUrl;
            } else {
                button.style.display = 'none';
                button.style.visibility = 'hidden';
                button.style.opacity = '0';
            }
            
            // Sauvegarder les URLs
            saveSocialUrls();
        });
    });

    // Gestionnaire pour le style des boutons sociaux
    document.getElementById('social-buttons-style').addEventListener('change', function() {
        const style = this.value;
        const socialButtons = document.getElementById('social-buttons');
        
        // Supprimer tous les styles
        socialButtons.classList.remove('style-default', 'style-rounded', 'style-square', 'style-glow', 'style-minimal');
        
        // Ajouter le nouveau style
        if (style !== 'default') {
            socialButtons.classList.add(`style-${style}`);
        }
        
        // Sauvegarder la préférence
        localStorage.setItem('socialButtonsStyle', style);
    });

    // Fonction pour sauvegarder les URLs des réseaux sociaux
    function saveSocialUrls() {
        const urls = {};
        socialInputs.forEach(inputId => {
            urls[inputId] = document.getElementById(inputId).value;
        });
        localStorage.setItem('socialUrls', JSON.stringify(urls));
    }

    // Fonction pour charger les URLs des réseaux sociaux
    function loadSocialUrls() {
        const urls = JSON.parse(localStorage.getItem('socialUrls') || '{}');
        socialInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            const button = document.getElementById(socialButtons[socialInputs.indexOf(inputId)]);
            
            if (urls[inputId]) {
                input.value = urls[inputId];
                button.style.display = 'flex';
                button.style.visibility = 'visible';
                button.style.opacity = '1';
                
                // Formater l'URL
                let formattedUrl = urls[inputId];
                if (inputId === 'gmail-url' && !urls[inputId].startsWith('mailto:')) {
                    formattedUrl = `mailto:${urls[inputId]}`;
                } else if (inputId === 'whatsapp-url' && !urls[inputId].startsWith('https://wa.me/')) {
                    const phoneNumber = urls[inputId].replace(/[^\d+]/g, '');
                    formattedUrl = `https://wa.me/${phoneNumber}`;
                }
                
                button.href = formattedUrl;
            } else {
                button.style.display = 'none';
                button.style.visibility = 'hidden';
                button.style.opacity = '0';
            }
        });
    }

    // Fonction pour charger les préférences de bordure et style
    function loadPhotoAndSocialPreferences() {
        // Charger la bordure de photo
        const savedBorder = localStorage.getItem('photoBorder');
        if (savedBorder) {
            document.getElementById('photo-border').value = savedBorder;
            const profilePhoto = document.getElementById('profile-photo');
            profilePhoto.classList.remove('border-none', 'border-solid', 'border-gradient', 'border-glow');
            if (savedBorder !== 'none') {
                profilePhoto.classList.add(`border-${savedBorder}`);
            }
        }
        
        // Charger le style des boutons sociaux
        const savedStyle = localStorage.getItem('socialButtonsStyle');
        if (savedStyle) {
            document.getElementById('social-buttons-style').value = savedStyle;
            const socialButtons = document.getElementById('social-buttons');
            socialButtons.classList.remove('style-default', 'style-rounded', 'style-square', 'style-glow', 'style-minimal');
            if (savedStyle !== 'default') {
                socialButtons.classList.add(`style-${savedStyle}`);
            }
        }
    }

    // Gestionnaires pour la personnalisation de l'interface
    document.getElementById('interface-font').addEventListener('change', function() {
        const font = this.value;
        const body = document.body;
        
        // Supprimer toutes les classes de police
        body.classList.remove('font-roboto', 'font-orbitron', 'font-poppins', 'font-montserrat', 
                             'font-opensans', 'font-lato', 'font-raleway', 'font-ubuntu', 
                             'font-nunito', 'font-quicksand');
        
        // Ajouter la nouvelle classe de police
        if (font !== 'Roboto') {
            body.classList.add(`font-${font.toLowerCase().replace(' ', '')}`);
        }
        
        // Sauvegarder la préférence
        localStorage.setItem('interfaceFont', font);
    });

    document.getElementById('menu-style').addEventListener('change', function() {
        const style = this.value;
        const controlPanel = document.querySelector('.control-panel');
        
        // Supprimer tous les styles de menu
        controlPanel.classList.remove('menu-style-default', 'menu-style-glass', 'menu-style-neon', 
                                     'menu-style-gradient', 'menu-style-minimal', 'menu-style-dark', 
                                     'menu-style-light', 'menu-style-rounded', 'menu-style-sharp');
        
        // Ajouter le nouveau style
        if (style !== 'default') {
            controlPanel.classList.add(`menu-style-${style}`);
        }
        
        // Sauvegarder la préférence
        localStorage.setItem('menuStyle', style);
    });

    document.getElementById('accent-color').addEventListener('change', function() {
        const color = this.value;
        
        // Mettre à jour la variable CSS
        document.documentElement.style.setProperty('--accent-color', color);
        
        // Sauvegarder la préférence
        localStorage.setItem('accentColor', color);
    });

    document.getElementById('menu-opacity').addEventListener('input', function() {
        const opacity = this.value;
        const display = document.getElementById('menu-opacity-display');
        
        // Mettre à jour l'affichage
        display.textContent = opacity + '%';
        
        // Appliquer l'opacité au panneau de contrôle
        const controlPanel = document.querySelector('.control-panel');
        controlPanel.style.opacity = opacity / 100;
        
        // Sauvegarder la préférence
        localStorage.setItem('menuOpacity', opacity);
    });

    // Fonction pour charger les préférences d'interface
    function loadInterfacePreferences() {
        // Charger la police
        const savedFont = localStorage.getItem('interfaceFont');
        if (savedFont) {
            document.getElementById('interface-font').value = savedFont;
            const body = document.body;
            body.classList.remove('font-roboto', 'font-orbitron', 'font-poppins', 'font-montserrat', 
                                 'font-opensans', 'font-lato', 'font-raleway', 'font-ubuntu', 
                                 'font-nunito', 'font-quicksand');
            if (savedFont !== 'Roboto') {
                body.classList.add(`font-${savedFont.toLowerCase().replace(' ', '')}`);
            }
        }
        
        // Charger le style de menu
        const savedMenuStyle = localStorage.getItem('menuStyle');
        if (savedMenuStyle) {
            document.getElementById('menu-style').value = savedMenuStyle;
            const controlPanel = document.querySelector('.control-panel');
            controlPanel.classList.remove('menu-style-default', 'menu-style-glass', 'menu-style-neon', 
                                         'menu-style-gradient', 'menu-style-minimal', 'menu-style-dark', 
                                         'menu-style-light', 'menu-style-rounded', 'menu-style-sharp');
            if (savedMenuStyle !== 'default') {
                controlPanel.classList.add(`menu-style-${savedMenuStyle}`);
            }
        }
        
        // Charger la couleur d'accent
        const savedAccentColor = localStorage.getItem('accentColor');
        if (savedAccentColor) {
            document.getElementById('accent-color').value = savedAccentColor;
            document.documentElement.style.setProperty('--accent-color', savedAccentColor);
        }
        
        // Charger l'opacité du menu
        const savedOpacity = localStorage.getItem('menuOpacity');
        if (savedOpacity) {
            document.getElementById('menu-opacity').value = savedOpacity;
            document.getElementById('menu-opacity-display').textContent = savedOpacity + '%';
            const controlPanel = document.querySelector('.control-panel');
            controlPanel.style.opacity = savedOpacity / 100;
        }
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
    
    // Sauvegarder dans localStorage
    localStorage.setItem('profileData', JSON.stringify(profileData));
    
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
    const imageUrl = document.getElementById('background-image-url').value;
    if (imageUrl) {
        profileData.background.image = imageUrl;
    }
}

function updateBackgroundVideo() {
    const videoUrl = document.getElementById('background-video-url').value;
    if (videoUrl) {
        profileData.background.video = videoUrl;
        // Sauvegarder dans localStorage
        localStorage.setItem('profileData', JSON.stringify(profileData));
    }
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
    // Fonction sécurisée pour créer une vidéo de fond
    if (!videoUrl || !profileBackground) return;
    
    try {
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
        video.playsInline = true;
        video.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
        `;
        
        profileBackground.appendChild(video);
    } catch (e) {
        // Ignorer toutes les erreurs
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileData.background.image = e.target.result;
            document.getElementById('background-image-url').value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function handleVideoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Vérification rapide de la taille (max 20MB)
        if (file.size > 20 * 1024 * 1024) {
            alert('Fichier trop volumineux (max 20MB)');
            event.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            profileData.background.video = e.target.result;
            document.getElementById('background-video-url').value = e.target.result;
            // Sauvegarder dans localStorage
            localStorage.setItem('profileData', JSON.stringify(profileData));
        };
        reader.readAsDataURL(file);
    }
}

function handleMusicUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Vérification rapide de la taille (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('Fichier trop volumineux (max 10MB)');
            event.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            profileData.music.url = e.target.result;
            document.getElementById('music-url').value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function updateMusicUrl() {
    const url = document.getElementById('music-url').value;
    if (url) {
        profileData.music.url = url;
    }
}

function updateMusicVolume() {
    const volume = document.getElementById('music-volume').value;
    profileData.music.volume = volume;
}

function playMusic() {
    // Fonction sécurisée pour la musique
    if (backgroundMusic && profileData.music.url) {
        try {
            backgroundMusic.src = profileData.music.url;
            backgroundMusic.volume = profileData.music.volume / 100;
            backgroundMusic.play().catch(() => {
                // Ignorer les erreurs de lecture automatique
            });
        } catch (e) {
            // Ignorer toutes les erreurs
        }
    }
}

function pauseMusic() {
    // Fonction sécurisée pour la pause
    if (backgroundMusic) {
        try {
            backgroundMusic.pause();
        } catch (e) {
            // Ignorer toutes les erreurs
        }
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
        
        // Supprimer les éléments d'effets existants
        const existingLoading = profilePreview.querySelector('.loading-animation');
        if (existingLoading) existingLoading.remove();
        
        // Réinitialiser les styles
        profilePreview.style.filter = 'none';
        profilePreview.style.transform = 'none';
        
        // Appliquer les effets
        if (profileData.effects.particles) {
            profilePreview.classList.add('particles');
            createParticles();
        } else {
            removeParticles();
        }
        
        if (profileData.effects.distortion) {
            profilePreview.classList.add('distortion');
            profilePreview.style.filter = 'contrast(1.3) saturate(1.8) brightness(1.1)';
        }
        
        if (profileData.effects.loading) {
            profilePreview.classList.add('loading');
            const loadingAnimation = document.createElement('div');
            loadingAnimation.className = 'loading-animation';
            loadingAnimation.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 60px;
                height: 60px;
                border: 4px solid rgba(255, 255, 255, 0.3);
                border-top: 4px solid #4ecdc4;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                z-index: 1000;
            `;
            profilePreview.appendChild(loadingAnimation);
        }
        
        if (profileData.effects.mirror) {
            profilePreview.classList.add('mirror');
            profilePreview.style.transform = 'scaleX(-1)';
        }
        
        if (profileData.effects.darkMode) {
            profilePreview.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Forcer la mise à jour de l'affichage
        profilePreview.style.display = 'none';
        profilePreview.offsetHeight; // Force reflow
        profilePreview.style.display = 'block';
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
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
    `;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            width: ${Math.random() * 6 + 4}px;
            height: ${Math.random() * 6 + 4}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 8}s;
            animation-duration: ${Math.random() * 4 + 6}s;
            animation-name: particleFloat;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
        `;
        
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
    
    // Générer le code HTML complet de la page
    const fullPageHTML = generateFullPageHTML();
    
    // Extraire les différentes parties du code
    const htmlMatch = fullPageHTML.match(/<html[^>]*>([\s\S]*)<\/html>/i);
    const headMatch = fullPageHTML.match(/<head>([\s\S]*)<\/head>/i);
    const bodyMatch = fullPageHTML.match(/<body>([\s\S]*)<\/body>/i);
    
    let htmlCode = '';
    let cssCode = '';
    let jsCode = '';
    
    if (htmlMatch) {
        htmlCode = fullPageHTML;
    }
    
    if (headMatch) {
        // Extraire le CSS du head
        const styleMatch = headMatch[1].match(/<style>([\s\S]*)<\/style>/i);
        if (styleMatch) {
            cssCode = styleMatch[1];
        }
    }
    
    if (bodyMatch) {
        // Extraire le JavaScript du body
        const scriptMatch = bodyMatch[1].match(/<script>([\s\S]*)<\/script>/i);
        if (scriptMatch) {
            jsCode = scriptMatch[1];
        }
    }
    
    // Afficher le code
    document.getElementById('html-output').textContent = htmlCode;
    document.getElementById('css-output').textContent = cssCode;
    document.getElementById('js-output').textContent = jsCode;
    
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
    height: 711px; /* 400px * (16/9) pour correspondre à aspect-ratio: 9/16 */
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
    const socialPosition = positions['social'] || { x: 30, y: 120 };

    // Récupérer les URLs des réseaux sociaux
    const socialUrls = JSON.parse(localStorage.getItem('socialUrls') || '{}');
    const savedBorder = localStorage.getItem('photoBorder') || 'none';
    const savedStyle = localStorage.getItem('socialButtonsStyle') || 'default';

    // Générer les boutons sociaux
    let socialButtonsHTML = '';
    const socialData = [
        { id: 'discord', url: socialUrls['discord-url'], color: '#5865F2' },
        { id: 'tiktok', url: socialUrls['tiktok-url'], color: '#000000' },
        { id: 'gmail', url: socialUrls['gmail-url'], color: '#EA4335' },
        { id: 'whatsapp', url: socialUrls['whatsapp-url'], color: '#25D366' }
    ];

    socialData.forEach(social => {
        if (social.url) {
            let formattedUrl = social.url;
            if (social.id === 'gmail' && !social.url.startsWith('mailto:')) {
                formattedUrl = `mailto:${social.url}`;
            } else if (social.id === 'whatsapp' && !social.url.startsWith('https://wa.me/')) {
                const phoneNumber = social.url.replace(/[^\d+]/g, '');
                formattedUrl = `https://wa.me/${phoneNumber}`;
            }

            const svgIcon = getSocialIcon(social.id);
            socialButtonsHTML += `
                <a href="${formattedUrl}" class="social-btn ${social.id}-btn" target="_blank" style="background: ${social.color};">
                    ${svgIcon}
                </a>
            `;
        }
    });

    // CSS pour les bordures de photo
    const borderCSS = getBorderCSS(savedBorder);
    const socialStyleCSS = getSocialStyleCSS(savedStyle);

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
        
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loading-content {
            text-align: center;
            color: white;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        .loading-text {
            font-size: 1.2rem;
            margin-bottom: 10px;
        }
        
        .loading-hint {
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .profile-container {
            width: 400px;
            height: 711px;
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
        
        .profile-background video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }
        
        .profile-container video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
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
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            ${borderCSS}
        }
        
        .social-buttons {
            position: absolute;
            top: ${socialPosition.y}px;
            left: ${socialPosition.x}px;
            display: flex;
            gap: 10px;
            z-index: 10;
            transition: all 0.3s ease;
            ${socialStyleCSS}
        }
        
        .social-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: white;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .social-btn:hover {
            transform: scale(1.1);
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
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <!-- Écran de chargement -->
    <div id="loading-screen" class="loading-screen">
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <div class="loading-text">Chargement du profil...</div>
            <div class="loading-hint">Cliquez n'importe où pour commencer</div>
        </div>
    </div>

    <!-- Musique de fond -->
    ${profileData.music.url ? `<audio id="background-music" loop preload="auto">
        <source src="${profileData.music.url}" type="audio/mpeg">
        <source src="${profileData.music.url}" type="audio/ogg">
        <source src="${profileData.music.url}" type="audio/wav">
    </audio>` : ''}

    <div class="profile-container">
        ${profileData.background.type === 'video' && profileData.background.video ? `
        <video autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; position: fixed; top: 0; left: 0; z-index: -1;">
            <source src="${profileData.background.video}" type="video/mp4">
            <source src="${profileData.background.video}" type="video/webm">
            <source src="${profileData.background.video}" type="video/ogg">
        </video>
        ` : ''}
        <div class="profile-background">
        </div>
        <div class="profile-photo-preview">
            <div class="profile-photo"></div>
        </div>
        ${socialButtonsHTML ? `<div class="social-buttons">${socialButtonsHTML}</div>` : ''}
        <div class="profile-content">
            <h2 class="profile-username">${profileData.username}</h2>
            <p class="profile-handle">@${profileData.handle}</p>
            <div class="profile-description-display">${profileData.description}</div>
        </div>
        ${profileData.effects.loading ? '<div class="loading-animation"></div>' : ''}
    </div>
    
    <script>
        // Gestion de l'écran de chargement
        const loadingScreen = document.getElementById('loading-screen');
        const backgroundMusic = document.getElementById('background-music');
        
        // Fonction pour masquer l'écran de chargement
        function hideLoadingScreen() {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
        
        // Masquer l'écran de chargement au clic
        document.addEventListener('click', function() {
            hideLoadingScreen();
            
            // Démarrer la musique si elle existe
            if (backgroundMusic) {
                backgroundMusic.volume = ${profileData.music.volume} / 100;
                backgroundMusic.play().catch(e => console.log('Musique non démarrée:', e));
            }
        }, { once: true });
        
        // Masquer automatiquement après 3 secondes
        setTimeout(hideLoadingScreen, 3000);
        
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
        
        // Curseur personnalisé
        if (${profileData.cursor.enabled}) {
            document.body.style.cursor = '${profileData.cursor.style}';
        }
        
        console.log('Profil personnalisé chargé !');
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
        case 'video': return 'transparent'; // Fond transparent pour la vidéo
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
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            width: 6px;
            height: 6px;
            pointer-events: none;
            z-index: 5;
            animation: particleFloat 8s ease-in-out infinite;
        }
        
        @keyframes particleFloat {
            0%, 100% { 
                transform: translateY(0px) translateX(0px);
                opacity: 0;
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { 
                transform: translateY(-150px) translateX(100px);
                opacity: 0;
            }
        }`;
    }
    
    if (profileData.effects.distortion) {
        css += `
        .profile-container {
            filter: contrast(1.3) saturate(1.8) brightness(1.1);
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
    
    if (profileData.effects.loading) {
        css += `
        .loading-animation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid #4ecdc4;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            z-index: 1000;
        }
        
        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
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

// Fonction pour obtenir l'icône SVG d'un réseau social
function getSocialIcon(socialId) {
    const icons = {
        discord: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>`,
        tiktok: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>`,
        gmail: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.819L12 10.183l9.545-6.362h.819A1.636 1.636 0 0 1 24 5.457z"/>
        </svg>`,
        whatsapp: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>`
    };
    
    return icons[socialId] || '';
}

// Fonction pour obtenir le CSS de bordure
function getBorderCSS(borderStyle) {
    const borderStyles = {
        none: 'border: none;',
        // solid: 'border: 3px solid #4ecdc4;',
        gradient: 'border: 3px solid; border-image: linear-gradient(45deg, #4ecdc4, #45b7d1, #96ceb4) 1;',
        glow: 'box-shadow: 0 0 20px rgba(78, 205, 196, 0.6), 0 4px 15px rgba(0, 0, 0, 0.3);'
    };
    
    return borderStyles[borderStyle] || borderStyles.none;
}

// Fonction pour obtenir le CSS de style des boutons sociaux
function getSocialStyleCSS(style) {
    const styleCSS = {
        default: '',
        rounded: '.social-btn { border-radius: 50%; }',
        square: '.social-btn { border-radius: 8px; }',
        glow: '.social-btn { box-shadow: 0 0 10px rgba(255, 255, 255, 0.3); } .social-btn:hover { box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }',
        minimal: '.social-btn { background: rgba(255, 255, 255, 0.1) !important; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); } .social-btn:hover { background: rgba(255, 255, 255, 0.2) !important; border: 1px solid rgba(255, 255, 255, 0.3); }'
    };
    
    return styleCSS[style] || styleCSS.default;
}

// Fonction de débogage pour vérifier les données
function debugProfileData() {
    console.log('=== DONNÉES DU PROFIL ===');
    console.log('Type de fond:', profileData.background.type);
    console.log('Vidéo de fond:', profileData.background.video);
    console.log('Données complètes:', profileData);
    
    const savedData = localStorage.getItem('profileData');
    console.log('Données sauvegardées:', savedData ? JSON.parse(savedData) : 'Aucune');
}

// Ajouter au global pour pouvoir l'appeler depuis la console
window.debugProfileData = debugProfileData;

console.log('Script de personnalisation de profil chargé avec succès !');      