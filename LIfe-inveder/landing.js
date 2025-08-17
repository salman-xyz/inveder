// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
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

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class and observe elements
    const animateElements = document.querySelectorAll('.feature-card, .category-card, .section-header');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Staggered animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Staggered animation for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for floating shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Counter animation for hero stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const numericTarget = target.replace(/[^0-9]/g, '');
            const suffix = target.replace(/[0-9]/g, '');
            
            if (numericTarget) {
                let current = 0;
                const increment = parseInt(numericTarget) / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= parseInt(numericTarget)) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 50);
            }
        });
    }

    // Trigger counter animation when hero section is visible
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // Add loading animation to dashboard preview
    const dashboardPreview = document.querySelector('.dashboard-preview');
    if (dashboardPreview) {
        setTimeout(() => {
            dashboardPreview.classList.add('loaded');
        }, 1000);
    }

    // Add typewriter effect to hero title (optional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Uncomment to enable typewriter effect
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 50);
    // }

    // Add click tracking for analytics (optional)
    document.addEventListener('click', function(e) {
        const clickedElement = e.target;
        
        // Track button clicks
        if (clickedElement.classList.contains('btn')) {
            console.log('Button clicked:', clickedElement.textContent);
            // Here you can add your analytics tracking code
        }
        
        // Track navigation clicks
        if (clickedElement.classList.contains('nav-link')) {
            console.log('Navigation clicked:', clickedElement.textContent);
            // Here you can add your analytics tracking code
        }
    });

    // Add mobile menu close functionality
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        document.addEventListener('click', function(e) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    }

    // Add scroll progress indicator
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    createScrollProgress();

    // Add easter egg (optional fun feature)
    let clickCount = 0;
    const brandIcon = document.querySelector('.brand-icon');
    
    if (brandIcon) {
        brandIcon.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 5) {
                this.style.animation = 'spin 1s linear infinite';
                setTimeout(() => {
                    this.style.animation = '';
                    clickCount = 0;
                }, 3000);
            }
        });
    }
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .loaded .preview-card {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(30px) rotateY(-5deg) rotateX(5deg);
            opacity: 0;
        }
        to {
            transform: translateY(0) rotateY(-5deg) rotateX(5deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
