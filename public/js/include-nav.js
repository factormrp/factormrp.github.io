document.addEventListener('DOMContentLoaded', function() {
    fetch('/includes/nav.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data + document.querySelector('header').innerHTML;
        })
        .catch(error => console.error('Error loading navigation:', error));
});
