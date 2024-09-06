document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('resume-button');
    const pdfContainer = document.getElementById('resume-view');
    const pdfPreview = document.getElementById('resume-preview');
  
    if (button && pdfContainer && pdfPreview) {
      button.addEventListener('click', function() {
        pdfContainer.classList.toggle('hidden');
      });
  
      button.addEventListener('mouseover', function(e) {
        pdfPreview.style.left = (e.pageX + 10) + 'px';  // Offset slightly for better visibility
        pdfPreview.style.top = (e.pageY + 10) + 'px';
        pdfPreview.classList.remove('hidden');
      });
  
      button.addEventListener('mouseout', function() {
        pdfPreview.classList.add('hidden');
      });
    } else {
      console.warn('One or more PDF viewer elements are missing from the page.');
    }
});
