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
    inactivityTimer = setTimeout(startAnimation, 7500);
}

// Event listeners
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);

// Initial setup
resetInactivityTimer();
