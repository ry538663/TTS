// Key Recruiters Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carouselInner = document.querySelector('.carousel-inner');
    const images = document.querySelectorAll('.carousel img');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    // Calculate the width of one image including margins
    const firstImage = images[0];
    const style = window.getComputedStyle(firstImage);
    const imageWidth = firstImage.offsetWidth + 
                      parseInt(style.marginLeft) + 
                      parseInt(style.marginRight);
    
    let currentIndex = 0;
    let autoScrollInterval;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    }
    
    function moveToNext() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateCarousel();
    }
    
    function moveToPrev() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = images.length - 1; // Loop to end
        }
        updateCarousel();
    }
    
    // Navigation button handlers
    nextButton.addEventListener('click', function() {
        moveToNext();
        resetAutoScroll();
    });
    
    prevButton.addEventListener('click', function() {
        moveToPrev();
        resetAutoScroll();
    });
    
    // Auto-scroll functionality
    function startAutoScroll() {
        autoScrollInterval = setInterval(moveToNext, 3000);
    }
    
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }
    
    // Start auto-scroll on page load
    startAutoScroll();
    
    // Pause auto-scroll on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        startAutoScroll();
    });
    
    // Touch events for mobile
    carouselInner.addEventListener('touchstart', touchStart, {passive: true});
    carouselInner.addEventListener('touchend', touchEnd, {passive: true});
    carouselInner.addEventListener('touchmove', touchMove, {passive: true});
    
    // Mouse events for desktop drag
    carouselInner.addEventListener('mousedown', dragStart);
    carouselInner.addEventListener('mouseup', dragEnd);
    carouselInner.addEventListener('mouseleave', dragEnd);
    carouselInner.addEventListener('mousemove', dragMove);
    
    function touchStart(e) {
        startPos = e.touches[0].clientX;
        clearInterval(autoScrollInterval);
    }
    
    function touchMove(e) {
        if (!isDragging) return;
        const currentPosition = e.touches[0].clientX;
        const diff = currentPosition - startPos;
        carouselInner.style.transform = `translateX(${-currentIndex * imageWidth + diff}px)`;
    }
    
    function touchEnd(e) {
        const endPos = e.changedTouches[0].clientX;
        handleSwipe(startPos, endPos);
        startAutoScroll();
    }
    
    function dragStart(e) {
        isDragging = true;
        startPos = e.clientX;
        prevTranslate = currentIndex * imageWidth;
        carouselInner.style.cursor = 'grabbing';
        clearInterval(autoScrollInterval);
        e.preventDefault();
    }
    
    function dragMove(e) {
        if (!isDragging) return;
        const currentPosition = e.clientX;
        const diff = currentPosition - startPos;
        currentTranslate = prevTranslate - diff;
        carouselInner.style.transform = `translateX(-${currentTranslate}px)`;
    }
    
    function dragEnd() {
        isDragging = false;
        carouselInner.style.cursor = 'grab';
        
        // Snap to nearest slide
        currentIndex = Math.round(currentTranslate / imageWidth);
        
        // Boundary checks
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex >= images.length) currentIndex = images.length - 1;
        
        updateCarousel();
        startAutoScroll();
    }
    
    function handleSwipe(startX, endX) {
        const threshold = 50; // Minimum swipe distance
        if (startX - endX > threshold) {
            moveToNext(); // Swipe left
        } else if (endX - startX > threshold) {
            moveToPrev(); // Swipe right
        } else {
            updateCarousel(); // Return to current position if not enough swipe
        }
    }
    
    // Make carousel keyboard accessible
    document.addEventListener('keydown', (e) => {
        if (document.activeElement === carousel || document.activeElement === carouselInner) {
            if (e.key === 'ArrowRight') {
                moveToNext();
                resetAutoScroll();
            } else if (e.key === 'ArrowLeft') {
                moveToPrev();
                resetAutoScroll();
            }
        }
    });
    
    // Set initial position
    updateCarousel();
});