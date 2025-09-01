document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('content-container');
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('#sidebar-nav a');
    let currentPageIndex = 0;
    let isTransitioning = false;
    let lastScrollTime = 0;

    // Initialize the first page as active
    pages[currentPageIndex].classList.add('active');
    navLinks[currentPageIndex].classList.add('active');

    // Function to navigate to a page
    const goToPage = (index) => {
        if (isTransitioning || index < 0 || index >= pages.length) return;

        isTransitioning = true;
        
        // Remove 'active' class from old page and nav link
        pages[currentPageIndex].classList.remove('active');
        navLinks[currentPageIndex].classList.remove('active');

        // Update index and add 'active' class to new page and nav link
        currentPageIndex = index;
        pages[currentPageIndex].classList.add('active');
        navLinks[currentPageIndex].classList.add('active');
        
        // Transform the content container for morph effect
        contentContainer.style.transform = `translateY(${-currentPageIndex * 100}vh)`;

        // Reset transition state after animation finishes
        setTimeout(() => {
            isTransitioning = false;
        }, 900); // Must match CSS transition duration
    };

    // Mouse wheel event listener with throttling
    window.addEventListener('wheel', (e) => {
        const currentTime = new Date().getTime();
        if (currentTime - lastScrollTime < 1000) return; // Throttle scroll
        lastScrollTime = currentTime;

        if (e.deltaY > 0) { // Scroll down
            goToPage(currentPageIndex + 1);
        } else { // Scroll up
            goToPage(currentPageIndex - 1);
        }
    });

    // Sidebar navigation event listener
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            goToPage(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            goToPage(currentPageIndex + 1);
        } else if (e.key === 'ArrowUp') {
            goToPage(currentPageIndex - 1);
        }
    });
});
