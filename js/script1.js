document.querySelectorAll('.square-container').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav').classList.toggle('show');
  });