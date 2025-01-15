document.addEventListener('DOMContentLoaded', function() {
    fetch('includes/nav.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data + document.querySelector('header').innerHTML;
            initializeNavAnimation();
        })
        .catch(error => console.error('Error loading navigation:', error));
});

function initializeNavAnimation() {
    let inactivityTimer;
    const navItems = document.querySelectorAll('.nav-item');

    function startAnimation() {
        navItems.forEach((item, index) => {
            item.classList.add('animate');
            item.style.animationDelay = `${index * 0.2}s`;
        });
    }

    function stopAnimation() {
        navItems.forEach(item => {
            item.classList.remove('animate');
            item.style.animationDelay = '';
        });
    }

    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        stopAnimation();
        inactivityTimer = setTimeout(startAnimation, 2000);
    }

    // Event listeners
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);

    // Initial setup
    resetInactivityTimer();
}
