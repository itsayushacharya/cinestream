// ============================================================
// CineStream — App Logic
// ------------------------------------------------------------
// Data is loaded BEFORE this file via:
//   data/bollywood.js  → window.bollywoodDatabase
//   data/hollywood.js  → window.hollywoodDatabase
//   data/series.js     → window.seriesDatabase
//
// We merge them into one unified `contentDatabase` array here,
// so all existing slider / search / grid logic keeps working
// exactly as before.
// ============================================================

const contentDatabase = [
    ...(window.bollywoodDatabase || []),
    ...(window.hollywoodDatabase || []),
    ...(window.seriesDatabase || [])
];

// --- APP RUNTIME INTERACTIVE FUNCTIONAL ENGINES ---

let currentActiveSlideIndex = 0;
let dynamicActiveSlides = [];
let sliderLoopInterval;

document.addEventListener("DOMContentLoaded", () => {
    initializeStreamingHub();

    // Premium Navigation Header Background Transparency Toggle Effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('app-navigation');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

function initializeStreamingHub() {
    if (typeof contentDatabase === 'undefined' || contentDatabase.length === 0) {
        console.error("Database parsing failed. Check your data structure alignment.");
        return;
    }

    // Sort contents chronologically to automatically load the newest releases onto the slider
    const sortedByDate = [...contentDatabase].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    dynamicActiveSlides = sortedByDate.slice(0, 3);

    renderHeaderSliderCarousel();
    renderMediaGridCollections(contentDatabase);
    setupSearchEngineListener();
    startAutoSliderLoop();
}

function renderHeaderSliderCarousel() {
    const track = document.getElementById('main-slider-track');
    const dotsBox = document.getElementById('slider-dots-box');
    if (!track || !dotsBox) return;

    track.innerHTML = '';
    dotsBox.innerHTML = '';
    track.style.width = `${dynamicActiveSlides.length * 100}%`;

    dynamicActiveSlides.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'hero-slide';
        slide.style.width = `${100 / dynamicActiveSlides.length}%`;
        slide.style.background = `url('${item.poster}')`;
        slide.innerHTML = `
            <div class="hero-inner">
                <div class="badge-row">
                    <span class="spotlight-badge">FEATURED TITLES</span>
                    <span class="genre-badge">${item.genre}</span>
                </div>
                <h1 class="hero-title">${item.title}</h1>
                <div class="hero-meta">
                    <span class="rating-star">★ ${item.rating} IMDb</span>
                    <span>•</span>
                    <span>Released: ${item.releaseDate}</span>
                </div>
                <p class="hero-description">${item.description || ''}</p>
                <button class="btn-stream" onclick="openDetailsPanel('${item.id}')">
                    View Details
                </button>
            </div>
        `;
        track.appendChild(slide);

        const dot = document.createElement('span');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => {
            clearInterval(sliderLoopInterval);
            switchSlide(index);
            startAutoSliderLoop();
        };
        dotsBox.appendChild(dot);
    });
}

function switchSlide(index) {
    if (dynamicActiveSlides.length <= 1) return;
    currentActiveSlideIndex = index;
    const track = document.getElementById('main-slider-track');
    const movementPercent = index * (100 / dynamicActiveSlides.length);
    if (track) track.style.transform = `translateX(-${movementPercent}%)`;

    document.querySelectorAll('#slider-dots-box .dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function startAutoSliderLoop() {
    if (dynamicActiveSlides.length <= 1) return;
    sliderLoopInterval = setInterval(() => {
        let nextSlide = (currentActiveSlideIndex + 1) % dynamicActiveSlides.length;
        switchSlide(nextSlide);
    }, 6000);
}

function renderMediaGridCollections(dataset) {
    const bollywoodGrid = document.getElementById('bollywood-render-grid');
    const hollywoodGrid = document.getElementById('hollywood-render-grid');
    const seriesGrid = document.getElementById('series-render-grid');

    if (bollywoodGrid) bollywoodGrid.innerHTML = '';
    if (hollywoodGrid) hollywoodGrid.innerHTML = '';
    if (seriesGrid) seriesGrid.innerHTML = '';

    let counts = { bollywood: 0, hollywood: 0, series: 0 };

    dataset.forEach(item => {
        const card = document.createElement('div');
        card.className = 'media-card';
        // Store metadata directly inside DOM datasets for seamless search lookup extraction
        card.dataset.title = item.title.toLowerCase();
        card.dataset.genre = item.genre.toLowerCase();
        card.dataset.desc = (item.description || '').toLowerCase();

        card.innerHTML = `
            <div class="poster-wrapper">
                <img src="${item.poster}" alt="${item.title}" loading="lazy">
                <div class="card-dark-overlay">
                    <div class="info-circle-btn">View Details</div>
                </div>
            </div>
            <div class="card-body">
                <div class="card-info-header">
                    <span class="type-tag">${item.type}</span>
                    <span class="card-rating">★ ${item.rating}</span>
                </div>
                <h3 class="card-title">${item.title}</h3>
                <span class="card-genre">${item.genre}</span>
            </div>
        `;

        card.addEventListener('click', () => openDetailsPanel(item.id));

        if (item.industry === 'bollywood' && bollywoodGrid) {
            bollywoodGrid.appendChild(card);
            counts.bollywood++;
        } else if (item.industry === 'hollywood' && hollywoodGrid) {
            hollywoodGrid.appendChild(card);
            counts.hollywood++;
        } else if (item.industry === 'series' && seriesGrid) {
            seriesGrid.appendChild(card);
            counts.series++;
        }
    });

    if (counts.bollywood === 0 && bollywoodGrid) bollywoodGrid.innerHTML = '<div class="empty-placeholder-msg">More Bollywood additions coming soon.</div>';
    if (counts.hollywood === 0 && hollywoodGrid) hollywoodGrid.innerHTML = '<div class="empty-placeholder-msg">More Hollywood additions coming soon.</div>';
    if (counts.series === 0 && seriesGrid) seriesGrid.innerHTML = '<div class="empty-placeholder-msg">More Web Series additions coming soon.</div>';
}

/* Modal Interface Intercept and Data Mapping Logic */
function openDetailsPanel(id) {
    const item = contentDatabase.find(m => m.id === id);
    if (!item) return;

    document.getElementById('panel-title-target').innerText = item.title;
    document.getElementById('panel-rating-target').innerText = `★ ${item.rating}`;
    document.getElementById('panel-type-target').innerText = item.type.toUpperCase();
    document.getElementById('panel-genre-target').innerText = item.genre;
    document.getElementById('panel-desc-target').innerText = item.description || '';
    document.getElementById('panel-banner-target').style.background = `url('${item.poster}')`;

    const playBtn = document.getElementById('panel-play-trigger');
    playBtn.onclick = () => openCinemaScreen(item.streamUrl);

    const panel = document.getElementById('global-details-panel');
    if (panel) {
        panel.style.display = 'flex';
        setTimeout(() => panel.classList.add('active'), 10);
    }
}

function closeDetailsPanel() {
    const panel = document.getElementById('global-details-panel');
    if (panel) {
        panel.classList.remove('active');
        setTimeout(() => panel.style.display = 'none', 400);
    }
}

function openCinemaScreen(url) {
    const frame = document.getElementById('cinema-frame-element');
    if (frame) frame.src = url;
    const player = document.getElementById('global-player-overlay');
    if (player) player.classList.add('active');
}

function closeCinemaScreen() {
    const frame = document.getElementById('cinema-frame-element');
    if (frame) frame.src = '';
    const player = document.getElementById('global-player-overlay');
    if (player) player.classList.remove('active');
}

/* UI Navigation Rail Controls */
function scrollCarousel(gridId, direction) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const scrollAmount = grid.offsetWidth * 0.75;
    grid.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}

function scrollToSection(targetId, elementPointer) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (elementPointer) {
        elementPointer.classList.add('active');
    } else {
        // Find corresponding navigation button by section target if scrolled programmatically
        const matchBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => {
            return btn.getAttribute('onclick').includes(targetId);
        });
        if (matchBtn) matchBtn.classList.add('active');
    }

    const navbarOffset = document.getElementById('app-navigation').offsetHeight + 20;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Enhanced Search Engine Controller
 * Filters titles instantly, shows ONLY matching movies, and hides non-matching elements entirely.
 */
function setupSearchEngineListener() {
    const searchInput = document.getElementById('live-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const allSections = document.querySelectorAll('section.row-container');

        if (query === '') {
            // Restore everything back to normal grid parameters
            allSections.forEach(section => {
                section.style.display = 'block'; // Show all row containers
                const cards = section.querySelectorAll('.media-card');
                cards.forEach(card => {
                    card.style.display = 'block'; // Show all cards
                    card.style.transform = '';
                    card.style.borderColor = 'var(--border-subtle)';
                });
            });

            // Reset horizontal track scrolling back to start
            document.querySelectorAll('.carousel-viewport').forEach(grid => grid.scrollLeft = 0);

            // Default select the Home tab
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            const homeTab = document.querySelectorAll('.tab-btn')[0];
            if (homeTab) homeTab.classList.add('active');
            return;
        }

        let firstMatchedSectionId = null;

        allSections.forEach(section => {
            const cards = section.querySelectorAll('.media-card');
            let sectionHasMatch = false;

            cards.forEach(card => {
                const title = card.dataset.title || '';
                const genre = card.dataset.genre || '';
                const desc = card.dataset.desc || '';

                if (title.includes(query) || genre.includes(query) || desc.includes(query)) {
                    card.style.display = 'block'; // Keep match visible
                    card.style.borderColor = 'var(--accent-primary)';
                    sectionHasMatch = true;
                } else {
                    card.style.display = 'none'; // Hide non-matching movie entirely
                }
            });

            // If a category row has at least one matching movie, keep it visible
            if (sectionHasMatch) {
                section.style.display = 'block';

                // Instantly snap the layout track back to 0 so the active movie is right in front of the screen
                const gridElement = section.querySelector('.carousel-viewport');
                if (gridElement) gridElement.scrollLeft = 0;

                if (!firstMatchedSectionId) {
                    firstMatchedSectionId = section.id;
                }
            } else {
                section.style.display = 'none'; // Hide entire category if no matches exist
            }
        });

        // Jump straight down to the matched row
        if (firstMatchedSectionId) {
            scrollToSection(firstMatchedSectionId, null);
        }
    });
}

function resetFilters(e) {
    e.preventDefault();
    const searchInput = document.getElementById('live-search');
    if (searchInput) searchInput.value = '';

    const allSections = document.querySelectorAll('section.row-container');
    allSections.forEach(section => {
        section.style.display = 'block';
        const cards = section.querySelectorAll('.media-card');
        cards.forEach(card => {
            card.style.display = 'block';
            card.style.transform = '';
            card.style.borderColor = 'var(--border-subtle)';
        });
        const gridElement = section.querySelector('.carousel-viewport');
        if (gridElement) gridElement.scrollLeft = 0;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const homeTab = document.querySelectorAll('.tab-btn')[0];
    if (homeTab) homeTab.classList.add('active');
}