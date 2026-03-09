document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('resume-button');
    const pdfContainer = document.getElementById('resume-view');
    if (button && pdfContainer) {
      button.addEventListener('click', function() {
        pdfContainer.classList.toggle('hidden');
      });
  
      button.addEventListener('mouseover', function(e) {
        button.classList.add('resume-preview');
        button.innerHTML = '';
      });
  
      button.addEventListener('mouseout', function() {
        // pdfPreview.classList.add('hidden');
        button.classList.remove('resume-preview');
        button.innerHTML = 'My Paper Trail';
      });
    } else {
      console.warn('One or more PDF viewer elements are missing from the page.');
    }
});
