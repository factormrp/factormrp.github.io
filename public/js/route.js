// Function to load content based on route
function loadContent(route) {
    if (route === '/') {
        route = 'index';
    }
    if (route.endswith('.html')){
        route = route.slice(0,-5);
    }

    fetch(`/pages/${route}/${route}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('app').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

// Function to handle navigation clicks
function handleNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const route = this.getAttribute('href').substr(1);
            loadContent(route);
            history.pushState(null, '', this.getAttribute('href'));
        });
    });
}

// Function to handle back/forward browser buttons
window.onpopstate = function() {
    const route = location.pathname.substr(1);
    loadContent(route);
};

// Initial page load
document.addEventListener("DOMContentLoaded", function() {
    const currentRoute = location.pathname.substr(1);
    loadContent(currentRoute);
    handleNavigation();
});
