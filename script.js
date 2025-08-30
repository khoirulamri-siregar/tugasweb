document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    // Hitung lebar setiap item
    const itemWidth = items[0].getBoundingClientRect().width + 20; // Tambah 20px gap

    let currentPosition = 0;

    // Fungsi untuk geser ke posisi yang diinginkan
    function slideTo(position) {
        if (position < 0) {
            position = items.length - 1;
        } else if (position >= items.length) {
            position = 0;
        }
        currentPosition = position;
        track.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
    }

    // Geser ke item berikutnya
    nextBtn.addEventListener('click', () => {
        slideTo(currentPosition + 1);
    });

    // Geser ke item sebelumnya
    prevBtn.addEventListener('click', () => {
        slideTo(currentPosition - 1);
    });
});
