document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('wrapper');
    const contentContainer = document.getElementById('content-container');
    const pages = document.querySelectorAll('.page');
    let currentPageIndex = 0;
    let isTransitioning = false;

    // Set the first page as active initially
    pages[currentPageIndex].classList.add('active');

    function goToPage(index) {
        if (isTransitioning || index < 0 || index >= pages.length) {
            return;
        }
        isTransitioning = true;

        // Remove active class from current page
        pages[currentPageIndex].classList.remove('active');
        
        currentPageIndex = index;
        
        // Move the content container
        contentContainer.style.transform = `translateY(${-currentPageIndex * 100}vh)`;

        // Add active class to the new page after a short delay to allow transition
        setTimeout(() => {
            pages[currentPageIndex].classList.add('active');
            isTransitioning = false;
        }, 800); // Harus sama dengan waktu transisi CSS
    }

    // Event listener for mouse wheel
    let lastScrollTime = 0;
    window.addEventListener('wheel', (event) => {
        const currentTime = new Date().getTime();
        if (currentTime - lastScrollTime < 500) { // Throttle scroll events
            return;
        }
        lastScrollTime = currentTime;

        if (event.deltaY > 0) { // Scrolling down
            goToPage(currentPageIndex + 1);
        } else { // Scrolling up
            goToPage(currentPageIndex - 1);
        }
    });

    // Event listener for keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            goToPage(currentPageIndex + 1);
        } else if (event.key === 'ArrowUp') {
            goToPage(currentPageIndex - 1);
        }
    });

    // Event listener for anchor links
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
