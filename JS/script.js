// Di file JavaScript utama
// =========================================================================
// 1. ACTIVE NAVIGATION LINK & SMOOTH SCROLL ACCURACY
// Otomatis mengubah menu aktif di navbar sesuai posisi scroll layar
// =========================================================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Mengurangi 160px untuk toleransi tinggi navbar melayang agar pas saat discroll
        if (window.pageYOffset >= sectionTop - 160) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        // Jika link mengarah ke id section saat ini, nyalakan status active 3D-nya
        if (link.getAttribute('href').includes(currentSection) && currentSection !== '') {
            link.classList.add('active');
        }
    });
});

// =========================================================================
// 2. REVEAL ANIMATION ON SCROLL (FADE IN EFFECTS)
// Membuat elemen muncul perlahan saat di-scroll ke bawah
// =========================================================================
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

// =========================================================================
// 3. DROPDOWN INTERACTION SYSTEM (DESKTOP & MOBILE FRIENDLY)
// Mengatur buka tutup dropdown secara halus
// =========================================================================
const dropdownParent = document.querySelector('.dropdown');
const dropdownBtn = document.querySelector('.dropdown > a');

// Mencegah lompatan link saat klik tombol utama dropdown jika ada sub-menu
if (dropdownBtn) {
    dropdownBtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdownParent.classList.toggle('show-dropdown');
        }
    });
}

// Menutup dropdown otomatis ketika pengguna mengklik tautan di dalam dropdown atau area luar luar menu
window.addEventListener('click', function(e) {
    const dropdownParent = document.querySelector('.dropdown');
    if (dropdownParent && !dropdownParent.contains(e.target)) {
        dropdownParent.classList.remove('show-dropdown');
    }
});

// Menutup dropdown setelah salah satu sub-menu (Team / Individu) diklik
const dropdownLinks = document.querySelectorAll('.dropdown-content a');
dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        const dropdownParent = document.querySelector('.dropdown');
        if (dropdownParent) {
            dropdownParent.classList.remove('show-dropdown');
        }
    });
});

// =========================================================================
// 4. PROJECT TEAM SLIDER SYSTEM
// Mengatur pergeseran horizontal kartu proyek menggunakan tombol panah
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.project-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (container && prevBtn && nextBtn) {
        // Fungsi membaca lebar 1 kartu proyek secara dinamis beserta celah gap-nya
        const getScrollAmount = () => {
            const card = container.querySelector('.project-card');
            if (card) {
                const cardWidth = card.getBoundingClientRect().width;
                return cardWidth + 24; // 24 didapat dari ukuran gap CSS
            }
            return 300; // nilai cadangan (fallback)
        };

        // Event saat tombol panah kanan diklik
        nextBtn.addEventListener('click', () => {
            container.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // Event saat tombol panah kiri diklik
        prevBtn.addEventListener('click', () => {
            container.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });
    }
});

// =========================================================================
// 5. PROJECT MODAL POP-UP SYSTEM (VIEW ALL GRID)
// Mengatur sistem buka tutup jendela pop-up proyek lengkap
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    const openBtn = document.getElementById('open-modal-btn');
    const closeBtn = document.getElementById('close-modal-btn');

    if (modal && openBtn && closeBtn) {
        // Buka Modal
        openBtn.addEventListener('click', () => {
            modal.classList.add('modal-open');
            document.body.style.overflow = 'hidden'; // Kunci scroll halaman utama belakang
        });

        // Tutup Modal lewat tombol X
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('modal-open');
            document.body.style.overflow = ''; // Aktifkan kembali scroll utama
        });

        // Tutup Modal otomatis jika pengguna klik area luar kotak hitam modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('modal-open');
                document.body.style.overflow = '';
            }
        });
    }
});

// =========================================================================
// 6. TECH STACK SYSTEM TAB INTERAKTIF
// Mengatur fungsionalitas klik perpindahan tab antara bahasa & tools
// =========================================================================
function switchTab(tabName) {
    // 1. Hapus class 'active' dari semua tombol tab
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // 2. Hapus class 'active' dari semua grid konten tech stack
    const grids = document.querySelectorAll('.tech-grid');
    grids.forEach(grid => grid.classList.remove('active'));
    
    // 3. Tambahkan class 'active' ke tombol yang baru saja diklik
    const clickedButton = window.event.currentTarget;
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    
    // 4. Tampilkan grid konten yang sesuai dengan id target
    const targetGrid = document.getElementById(tabName + '-content');
    if (targetGrid) {
        targetGrid.classList.add('active');
    }
}

// ===================================================
// LENIS SMOOTH SCROLL - IMPLEMENTASI (CDN)
// ===================================================

// Inisialisasi Lenis
const lenis = new Lenis({
    duration: 1.2,              // Durasi animasi scroll
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
    orientation: 'vertical',    // Arah scroll
    smoothWheel: true,          // Smooth untuk wheel mouse
    syncTouch: true,            // Sinkronisasi touch device
    wheelMultiplier: 1.3,         // Kecepatan scroll wheel
    touchMultiplier: 2,         // Kecepatan scroll touch
    infinite: false,            // Infinite scrolling
});

// Jalankan Lenis dengan requestAnimationFrame
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ===================================================
// FUNGSI SCROLL KE ELEMEN DARI NAVBAR
// ===================================================

// Ambil semua link navigasi yang mengarah ke ID
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
                
                // Update active class di navbar
                document.querySelectorAll('nav ul li a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// ===================================================
// SCROLL SMOOTH KE PROJECT TEAM DARI STATS
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
// KODE EXISTING (PERTAHANKAN SEMUA YANG SUDAH ADA)
// ===================================================

// TECH STACK TAB
function switchTab(tab) {
    // Sembunyikan semua grid
    document.querySelectorAll('.tech-grid').forEach(grid => {
        grid.classList.remove('active');
    });
    
    // Nonaktifkan semua tombol
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Aktifkan grid yang dipilih
    if (tab === 'tools') {
        document.getElementById('tools-content').classList.add('active');
        document.querySelector('.tab-btn:first-child').classList.add('active');
    } else if (tab === 'programming') {
        document.getElementById('programming-content').classList.add('active');
        document.querySelector('.tab-btn:last-child').classList.add('active');
    }
}

// ===================================================
// PROJECT SLIDER - UNTUK PROJECT INDIVIDU & TEAM
// ===================================================

function initSlider(containerId, prevBtnSelector, nextBtnSelector) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const wrapper = container.closest('.project-slider-wrapper');
    const prevBtn = wrapper?.querySelector(prevBtnSelector);
    const nextBtn = wrapper?.querySelector(nextBtnSelector);
    
    if (container && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            // Ambil lebar card pertama + gap
            const firstCard = container.querySelector('.project-card');
            if (firstCard) {
                const cardWidth = firstCard.offsetWidth;
                const gap = 24; // sesuai gap di CSS
                const scrollAmount = cardWidth + gap;
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
        
        nextBtn.addEventListener('click', function() {
            const firstCard = container.querySelector('.project-card');
            if (firstCard) {
                const cardWidth = firstCard.offsetWidth;
                const gap = 24; // sesuai gap di CSS
                const scrollAmount = cardWidth + gap;
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    }
}

// Inisialisasi slider untuk Project Team
initSlider('teamSlider', '.prev-btn', '.next-btn');


// HIGHLIGHT ACTIVE NAV LINK SAAT SCROLL
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
// ORGANISASI - CARD HMSI
// ===================================================

// Efek fade in foto saat halaman dimuat
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