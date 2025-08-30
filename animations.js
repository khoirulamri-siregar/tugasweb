// Additional animations and effects
document.addEventListener('DOMContentLoaded', function() {
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add hover effect to skill cards
    const skillCards = document.querySelectorAll('.skill-category');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.backgroundPosition = `center ${rate}px`;
        }
    });
    
    // Animate progress bars for skills
    const animateSkills = () => {
        const skills = document.querySelectorAll('.skill-item');
        skills.forEach(skill => {
            const level = skill.getAttribute('data-level');
            skill.querySelector('.skill-progress').style.width = level + '%';
        });
    };
    
    // Intersection Observer for animate on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                if (entry.target.classList.contains('skills-section')) {
                    animateSkills();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add cyber grid effect to specific elements
    const cyberElements = document.querySelectorAll('.cyber-grid');
    cyberElements.forEach(el => {
        const columns = Math.floor(el.offsetWidth / 20);
        const rows = Math.floor(el.offsetHeight / 20);
        
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                const dot = document.createElement('div');
                dot.style.position = 'absolute';
                dot.style.width = '2px';
                dot.style.height = '2px';
                dot.style.background = 'var(--accent-color)';
                dot.style.left = `${i * 20}px`;
                dot.style.top = `${j * 20}px`;
                dot.style.opacity = Math.random() * 0.5;
                el.appendChild(dot);
            }
        }
    });
    
    // Add glitch effect on random intervals
    setInterval(() => {
        const elements = document.querySelectorAll('.glitch-effect');
        elements.forEach(el => {
            if (Math.random() > 0.7) {
                el.classList.add('glitch');
                setTimeout(() => {
                    el.classList.remove('glitch');
                }, 200);
            }
        });
    }, 3000);
    
    // Interactive background particles
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 5 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.background = 'var(--accent-color)';
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            hero.appendChild(particle);
            
            // Animate particle
            animateParticle(particle);
        }
    }
    
    function animateParticle(particle) {
        const duration = Math.random() * 10 + 5;
        const xMovement = Math.random() * 100 - 50;
        const yMovement = Math.random() * 100 - 50;
        
        particle.animate([
            { transform: 'translate(0, 0)', opacity: parseFloat(particle.style.opacity) },
            { transform: `translate(${xMovement}px, ${yMovement}px)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'ease-in-out',
            iterations: Infinity,
            direction: 'alternate'
        });
    }
    
    createParticles();
});

// Page transition effects
function createPageTransition() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'var(--accent-color)';
    overlay.style.zIndex = '9999';
    overlay.style.transform = 'scaleY(0)';
    overlay.style.transformOrigin = 'top center';
    overlay.style.transition = 'transform 0.5s ease-in-out';
    
    document.body.appendChild(overlay);
    
    // Animate in on page load
    setTimeout(() => {
        overlay.style.transform = 'scaleY(0)';
    }, 500);
    
    // Animate out when clicking links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.host === window.location.host) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                overlay.style.transform = 'scaleY(1)';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            });
        }
    });
}

// Initialize page transitions
document.addEventListener('DOMContentLoaded', createPageTransition);
