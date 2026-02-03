document.addEventListener('DOMContentLoaded', () => {
    // Burger Menu
    const burger = document.getElementById('burger');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    const body = document.body;
    
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
            
            // Add mobile actions if they don't exist
            if (nav.classList.contains('active') && !nav.querySelector('.nav-mobile-actions')) {
                const mobileActions = document.createElement('div');
                mobileActions.className = 'nav-mobile-actions';
                
                // Check current language
                const isArabic = window.location.pathname.includes('/ar/');
                
                mobileActions.innerHTML = `
                    <a href="tel:+971527746805" class="phone-btn mobile-phone">+971 52 774 6805</a>
                    <div class="lang-switcher mobile-lang">
                        <a href="${isArabic ? '/ar/' : '/'}" class="lang-btn active">${isArabic ? 'عربي' : 'EN'}</a>
                        <span class="lang-divider">|</span>
                        <a href="${isArabic ? '/' : '/ar/'}" class="lang-btn">${isArabic ? 'EN' : 'عربي'}</a>
                    </div>
                `;
                nav.appendChild(mobileActions);
                
                // Add click handlers for mobile language switcher
                const mobileLangBtns = mobileActions.querySelectorAll('.lang-btn');
                mobileLangBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        if (!btn.classList.contains('active')) {
                            // Close menu before navigating
                            nav.classList.remove('active');
                            burger.classList.remove('active');
                            body.style.overflow = '';
                        }
                    });
                });
            }
            
            if (nav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }
    
    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(2, 6, 23, 0.95)';
                header.style.padding = '10px 0';
            } else {
                header.style.background = 'rgba(2, 6, 23, 0.8)';
                header.style.padding = '20px 0';
            }
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for # only
            if (href === '#') return;
            
            // Don't prevent default for external links
            if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            // Close mobile menu if open
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (burger) burger.classList.remove('active');
                body.style.overflow = '';
            }
            
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    // Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Arabic version specific adjustments
    if (document.documentElement.lang === 'ar') {
        // Reverse brands animation for Arabic
        const brandsTrack = document.querySelector('.brands-track');
        if (brandsTrack) {
            brandsTrack.style.animation = 'scroll 30s linear infinite reverse';
        }
    }
    
    // Initialize header padding
    if (header) {
        header.style.padding = '20px 0';
    }
});