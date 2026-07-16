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

