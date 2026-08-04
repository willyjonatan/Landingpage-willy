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
// 3. NAVBAR SCROLL KE ELEMEN (TANPA LENIS)
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
// 4. SCROLL KE PROJECT TEAM DARI STATS (TANPA LENIS)
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
// 5. TECH STACK TAB
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
// 6. PROJECT SLIDER
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
// 7. HIGHLIGHT ACTIVE NAV LINK SAAT SCROLL
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
// 8. ORGANISASI - FADE IN FOTO
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
// 9. LAZY LOADING - INTERSECTION OBSERVER (FALLBACK)
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
// 10. PERFORMA - LAPORKAN WAKTU LOAD
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
// 11. LIGHTBOX SIMPLE - VERSION ULTIMATE (PASTI JALAN)
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

// ===================================================
// 12. TOMBOL COPY (FITUR 1)
// ===================================================

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(' Berhasil disalin!');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(' Berhasil disalin!');
    });
}

function showToast(message) {
    const oldToast = document.querySelector('.toast-copy');
    if (oldToast) oldToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast-copy';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ===================================================
// 13. CONTACT FORM - AJAX (PASTI JALAN, TANPA REDIRECT)
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successNotif = document.getElementById('successNotification');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            submitBtn.textContent = '⏳ Mengirim...';
            submitBtn.disabled = true;
            
            const formData = new FormData(form);
            
            fetch('https://formspree.io/f/xoeaaegn', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    form.style.display = 'none';
                    successNotif.style.display = 'block';
                    successNotif.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    console.log('✅ Pesan berhasil dikirim!');
                } else {
                    alert('❌ Gagal mengirim pesan. Silakan coba lagi.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('❌ Gagal mengirim pesan. Periksa koneksi internet Anda.');
            })
            .finally(() => {
                submitBtn.textContent = 'Kirim Pesan';
                submitBtn.disabled = false;
            });
        });
    }
});

// ===================================================
// 14. RESET FORM (KIRIM ULANG)
// ===================================================

function resetForm() {
    const form = document.getElementById('contactForm');
    const successNotif = document.getElementById('successNotification');
    const submitBtn = document.getElementById('submitBtn');
    
    // Reset form (kosongkan input)
    if (form) {
        form.reset();
        form.style.display = 'block';
    }
    
    // Sembunyikan notifikasi
    if (successNotif) {
        successNotif.style.display = 'none';
    }
    
    // Kembalikan tombol ke normal
    if (submitBtn) {
        submitBtn.textContent = 'Kirim Pesan';
        submitBtn.disabled = false;
    }
    
    // Scroll ke form
    if (form) {
        form.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}