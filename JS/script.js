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