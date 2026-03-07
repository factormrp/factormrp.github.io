document.addEventListener('DOMContentLoaded', function() {
    fetch('/includes/nav.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data + document.querySelector('header').innerHTML;
            syncToggleLabel();
            initializeNavAnimation();
        })
        .catch(error => console.error('Error loading navigation:', error));
});

/** Keeps the toggle button label in sync with the actual theme. */
function syncToggleLabel() {
    const theme = window.siteTheme ? window.siteTheme.getTheme() : 'dark';
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.textContent = theme === 'dark' ? 'Light' : 'Dark';
        btn.dataset.currentTheme = theme;
    });
}

// Re-sync label whenever theme changes (e.g. toggled on another page)
document.addEventListener('themechange', (e) => {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.textContent = e.detail.theme === 'dark' ? 'Light' : 'Dark';
    });
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
        inactivityTimer = setTimeout(startAnimation, 1000);
    }

    // Event listeners
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);

    // Initial setup
    resetInactivityTimer();
}