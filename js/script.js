// LAUNDRYKLIK - JAVASCRIPT INTERACTIVITY


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar shadow effect on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    }
});

// Animation on scroll (Fade in effect)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards
document.querySelectorAll('.feature-card, .step-card, .pricing-card, .testimonial-card, .problem-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Counter animation untuk hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toString();
        }
    }, 16);
}

// Trigger counter animation when hero section visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-item h3');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('+')) {
                    const number = parseInt(text.replace('+', '').replace('★', ''));
                    if (!isNaN(number)) {
                        stat.textContent = '0';
                        animateCounter(stat, number);
                        setTimeout(() => {
                            stat.textContent = text;
                        }, 2100);
                    }
                }
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Form handling untuk CTA buttons (Demo alert)
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#daftar' || href === '#' || href === '') {
            e.preventDefault();
            alert('🎉 Terima kasih! Fitur pendaftaran akan segera aktif.\n\nUntuk demo, hubungi:\n📱 WhatsApp: +62 812-3456-7890\n📧 Email: info@laundryklik.com');
        }
    });
});

console.log('✅ LaundryKlik Landing Page berhasil dimuat! 🧺');

