document.addEventListener('DOMContentLoaded', () => {
    // Get all modals and trailer buttons
    const modals = document.querySelectorAll('.modal');
    const trailerButtons = document.querySelectorAll('.trailer-button');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Function to toggle the correct modal
    const toggleModal = (modal, show, trailerUrl = '') => {
        modal.style.display = show ? 'flex' : 'none';
        document.body.style.overflow = show ? 'hidden' : 'auto';
        
        // Get the iframe within the modal
        const iframe = modal.querySelector('iframe');
        
        // If showing the modal, set the iframe's src to the trailer URL
        if (show) {
            iframe.src = trailerUrl;
        } else {
            iframe.src = ''; // Reset video source to stop playback when closing
        }
    };

    // Attach event listeners to trailer buttons
    trailerButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const trailerUrl = button.getAttribute('data-trailer');
            toggleModal(modals[index], true, trailerUrl);
        });
    });

    // Attach event listeners to close buttons
    closeButtons.forEach((button, index) => {
        button.addEventListener('click', () => toggleModal(modals[index], false));
    });

    // Close modal when clicking outside the modal content
    modals.forEach((modal, index) => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) toggleModal(modals[index], false);
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Lazy load images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
});
