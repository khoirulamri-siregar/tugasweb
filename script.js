document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const pages = document.querySelectorAll('.page');
    let currentPageIndex = 0;
    let isTransitioning = false; // Flag to prevent multiple scrolls during transition

    // Function to navigate to a specific page
    function goToPage(index) {
        // Prevent navigation if already transitioning or index is out of bounds
        if (isTransitioning || index < 0 || index >= pages.length) {
            return;
        }

        isTransitioning = true; // Set flag to true

        // Calculate the translateY value to move the container
        container.style.transform = `translateY(${-index * 100}vh)`;
        currentPageIndex = index;

        // Reset the transition flag after the CSS transition completes
        // The timeout duration should match the CSS transition duration (0.8s = 800ms)
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    // Event listener for mouse wheel (scroll)
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) { // Scrolling down
            goToPage(currentPageIndex + 1);
        } else { // Scrolling up
            goToPage(currentPageIndex - 1);
        }
    });

    // Optional: Keyboard navigation with arrow keys
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            goToPage(currentPageIndex + 1);
        } else if (event.key === 'ArrowUp') {
            goToPage(currentPageIndex - 1);
        }
    });

    // --- Typing Effect for Home Page H1 ---
    const homeH1 = document.querySelector('#home h1.typing-effect');
    if (homeH1) {
        const originalText = homeH1.textContent;
        homeH1.textContent = ''; // Clear initial text
        let charIndex = 0;

        function typeEffect() {
            if (charIndex < originalText.length) {
                homeH1.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, 90); // Typing speed in ms
            } else {
                homeH1.style.borderRight = 'none'; // Remove cursor after typing
            }
        }
        setTimeout(typeEffect, 500); // Start typing after a short delay
    }

    // --- Smooth scroll for anchor links (e.g., "View My Work", "Get In Touch") ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const targetIndex = Array.from(pages).indexOf(targetElement);
                goToPage(targetIndex);
            }
        });
    });
});
