// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading process
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            
            // Initialize animations after loading
            initAnimations();
            initCarousel();
            initNavigation();
            initFormValidation();
        }, 500);
    }, 2000);
});

// Initialize AOS (Animate On Scroll)
function initAnimations() {
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out',
    });
}

// Navigation
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navClose = document.getElementById('navClose');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }
    
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Certificate Carousel
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track || items.length === 0) return;
    
    // Set item width based on responsive design
    let itemsPerView = getItemsPerView();
    const itemWidth = track.clientWidth / itemsPerView;
    
    // Position items
    items.forEach((item, index) => {
        item.style.minWidth = `${itemWidth}px`;
    });
    
    // Create dots for carousel
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(items.length / itemsPerView);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => slideTo(i * itemsPerView));
            dotsContainer.appendChild(dot);
        }
    }
    
    let currentPosition = 0;
    const maxPosition = items.length - itemsPerView;
    
    // Function to get items per view based on screen size
    function getItemsPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 992) return 2;
        return 3;
    }
    
    // Function to slide to a specific position
    function slideTo(position) {
        if (position < 0) {
            position = 0;
        } else if (position > maxPosition) {
            position = maxPosition;
        }
        
        currentPosition = position;
        track.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
        
        // Update active dot
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            const activeDotIndex = Math.floor(currentPosition / itemsPerView);
            dots.forEach((dot, index) => {
                if (index === activeDotIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
    
    // Slide to next item
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            slideTo(currentPosition + itemsPerView);
        });
    }
    
    // Slide to previous item
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            slideTo(currentPosition - itemsPerView);
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        itemsPerView = getItemsPerView();
        const newItemWidth = track.clientWidth / itemsPerView;
        
        items.forEach(item => {
            item.style.minWidth = `${newItemWidth}px`;
        });
        
        slideTo(0);
    });
    
    // Auto slide every 5 seconds
    let autoSlideInterval = setInterval(() => {
        if (currentPosition >= maxPosition) {
            slideTo(0);
        } else {
            slideTo(currentPosition + itemsPerView);
        }
    }, 5000);
    
    // Pause auto slide on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            if (currentPosition >= maxPosition) {
                slideTo(0);
            } else {
                slideTo(currentPosition + itemsPerView);
            }
        }, 5000);
    });
}

// Form Validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            let isValid = true;
            
            // Simple validation
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Nama harus diisi');
                isValid = false;
            } else {
                clearError(nameInput);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                showError(emailInput, 'Email harus valid');
                isValid = false;
            } else {
                clearError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Pesan harus diisi');
                isValid = false;
            } else {
                clearError(messageInput);
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Mengirim...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Pesan berhasil dikirim! (Ini hanya simulasi)');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    function showError(input, message) {
        clearError(input);
        
        const error = document.createElement('div');
        error.classList.add('error-message');
        error.textContent = message;
        error.style.color = 'var(--tertiary-color)';
        error.style.fontSize = '0.8rem';
        error.style.marginTop = '5px';
        
        input.parentNode.appendChild(error);
        input.style.borderColor = 'var(--tertiary-color)';
    }
    
    function clearError(input) {
        const error = input.parentNode.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        input.style.borderColor = '';
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Add binary rain effect to hero section
function addBinaryRain() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    heroSection.classList.add('binary-rain');
    
    // Create binary digits
    for (let i = 0; i < 50; i++) {
        createBinaryDigit(heroSection);
    }
    
    function createBinaryDigit(container) {
        const digit = document.createElement('div');
        digit.classList.add('binary-digit');
        digit.textContent = Math.random() > 0.5 ? '1' : '0';
        
        const size = Math.random() * 20 + 10;
        digit.style.fontSize = `${size}px`;
        digit.style.left = `${Math.random() * 100}%`;
        digit.style.opacity = Math.random() * 0.5 + 0.3;
        digit.style.animationDuration = `${Math.random() * 5 + 3}s`;
        digit.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(digit);
        
        // Remove digit after animation completes
        setTimeout(() => {
            digit.remove();
            createBinaryDigit(container);
        }, (parseFloat(digit.style.animationDuration) + parseFloat(digit.style.animationDelay)) * 1000);
    }
}

// Initialize binary rain effect
document.addEventListener('DOMContentLoaded', addBinaryRain);

// Add scroll to top functionality
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.classList.add('scroll-to-top');
    scrollBtn.style.display = 'none';
    scrollBtn.style.position = 'fixed';
    scrollBtn.style.bottom = '20px';
    scrollBtn.style.right = '20px';
    scrollBtn.style.width = '50px';
    scrollBtn.style.height = '50px';
    scrollBtn.style.borderRadius = '50%';
    scrollBtn.style.background = 'var(--gradient-1)';
    scrollBtn.style.color = '#000';
    scrollBtn.style.border = 'none';
    scrollBtn.style.cursor = 'pointer';
    scrollBtn.style.zIndex = '100';
    scrollBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    scrollBtn.style.transition = 'opacity 0.3s';
    
    document.body.appendChild(scrollBtn);
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', initScrollToTop);
