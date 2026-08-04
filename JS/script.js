// ===================================================
// 1. ACTIVE NAVIGATION LINK & SMOOTH SCROLL ACCURACY
// ===================================================

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 160) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection) && currentSection !== '') {
            link.classList.add('active');
        }
    });
});

// ===================================================
// 2. REVEAL ANIMATION ON SCROLL
// ===================================================

const revealElements = document.querySelectorAll('.card, .project-card, .timeline-item, .tech-stack span');

const revealOnScroll = () => {
    const triggerBottom = (window.innerHeight / 5) * 4;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('reveal-show');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

document.addEventListener('DOMContentLoaded', () => {
    revealElements.forEach(el => el.classList.add('reveal-hidden'));
    revealOnScroll();
});


// ===================================================
// 4. NAVBAR SCROLL KE ELEMEN (TANPA LENIS)
// ===================================================

document.querySelectorAll('nav ul li a, .dropdown-content a, .hero-btn a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
                
                document.querySelectorAll('nav ul li a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// ===================================================
// 5. SCROLL KE PROJECT TEAM DARI STATS (TANPA LENIS)
// ===================================================

const projectStat = document.querySelector('.stat-box a[href="#project-team"]');
if (projectStat) {
    projectStat.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector('#project-team');
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
}

// ===================================================
// 6. TECH STACK TAB
// ===================================================

function switchTab(tab) {
    document.querySelectorAll('.tech-grid').forEach(grid => {
        grid.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (tab === 'tools') {
        document.getElementById('tools-content').classList.add('active');
        document.querySelector('.tab-btn:first-child').classList.add('active');
    } else if (tab === 'programming') {
        document.getElementById('programming-content').classList.add('active');
        document.querySelector('.tab-btn:last-child').classList.add('active');
    }
}

// ===================================================
// 7. PROJECT SLIDER
// ===================================================

function initSlider(containerId, prevBtnSelector, nextBtnSelector) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const wrapper = container.closest('.project-slider-wrapper');
    const prevBtn = wrapper?.querySelector(prevBtnSelector);
    const nextBtn = wrapper?.querySelector(nextBtnSelector);
    
    if (container && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            const firstCard = container.querySelector('.project-card');
            if (firstCard) {
                const cardWidth = firstCard.offsetWidth;
                const gap = 24;
                const scrollAmount = cardWidth + gap;
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
        
        nextBtn.addEventListener('click', function() {
            const firstCard = container.querySelector('.project-card');
            if (firstCard) {
                const cardWidth = firstCard.offsetWidth;
                const gap = 24;
                const scrollAmount = cardWidth + gap;
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    }
}

// Inisialisasi slider Project Team
initSlider('teamSlider', '.prev-btn', '.next-btn');

// ===================================================
// 8. HIGHLIGHT ACTIVE NAV LINK SAAT SCROLL
// ===================================================

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===================================================
// 9. ORGANISASI - FADE IN FOTO
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    const docItems = document.querySelectorAll('.org-doc-item');
    docItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 + index * 100);
    });
});

// ===================================================
// 10. LAZY LOADING - INTERSECTION OBSERVER (FALLBACK)
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    if ('loading' in HTMLImageElement.prototype) {
        console.log('✅ Native lazy loading supported');
    } else {
        console.log('⚠️ Native lazy loading NOT supported, using Intersection Observer fallback');
        
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src;
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            lazyImages.forEach(function(img) {
                img.src = img.src;
            });
        }
    }
});

// ===================================================
// 11. PERFORMA - LAPORKAN WAKTU LOAD
// ===================================================

window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`🚀 Website loaded in ${loadTime.toFixed(2)}ms`);
    
    let totalImageSize = 0;
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            const size = (img.naturalWidth * img.naturalHeight * 4) / (1024 * 1024);
            totalImageSize += size;
        }
    });
    console.log(`📸 Total estimated image size: ${totalImageSize.toFixed(2)} MB`);
});

// ===================================================
// 12. LIGHTBOX SIMPLE - VERSION ULTIMATE (PASTI JALAN)
// ===================================================

function openLightbox(img) {
    const overlay = document.getElementById('lightbox');
    const bigImg = document.getElementById('lightbox-img');
    if (!overlay || !bigImg) return;
    
    bigImg.src = img.src || img.getAttribute('href');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
    const overlay = document.getElementById('lightbox');
    const bigImg = document.getElementById('lightbox-img');
    if (!overlay) return;
    
    if (e) {
        if (e.target === overlay || e.target.classList.contains('close')) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            if (bigImg) bigImg.src = '';
        }
    } else {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        if (bigImg) bigImg.src = '';
    }
}

// ESC key close lightbox
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
});

// ===== EVENT DELEGATION UNTUK LIGHTBOX =====
// TAMBAHKAN .gallery a biar gallery kena lightbox
document.addEventListener('click', function(e) {
    const link = e.target.closest('.gallery-link, .gallery a, .org-doc-item a, .project-images a');
    
    if (link) {
        const img = link.querySelector('img');
        if (img) {
            e.preventDefault();
            openLightbox(img);
        }
    }
});

console.log('✅ Lightbox siap! Gambar baru otomatis kebaca!');