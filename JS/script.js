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
// 3. LENIS SMOOTH SCROLL
// ===================================================

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    syncTouch: true,
    wheelMultiplier: 1.3,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ===================================================
// 4. NAVBAR SCROLL KE ELEMEN
// ===================================================

document.querySelectorAll('nav ul li a, .dropdown-content a, .hero-btn a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                lenis.scrollTo(targetElement, {
                    offset: 0,
                    duration: 1.5,
                });
                
                document.querySelectorAll('nav ul li a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// ===================================================
// 5. SCROLL KE PROJECT TEAM DARI STATS
// ===================================================

const projectStat = document.querySelector('.stat-box a[href="#project-team"]');
if (projectStat) {
    projectStat.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector('#project-team');
        if (target) {
            lenis.scrollTo(target, {
                offset: 0,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
