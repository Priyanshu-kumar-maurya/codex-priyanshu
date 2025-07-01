
// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Add active class to navigation links based on scroll position
function updateActiveNav() {
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Add scroll event listener
window.addEventListener('scroll', updateActiveNav);

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(this);
  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const message = this.querySelector('textarea').value;
  
  // Simple form validation
  if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
    alert('Please fill in all fields.');
    return;
  }
  
  // Simulate form submission
  alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
  
  // Reset form
  this.reset();
});

// Add click event listeners to navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    scrollToSection(targetId);
  });
});

// Add animation on scroll for service cards
function animateOnScroll() {
  const cards = document.querySelectorAll('.service-card');
  const windowHeight = window.innerHeight;
  
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    
    if (cardTop < windowHeight - 100) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
}

// Initialize service cards as hidden
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run animation on scroll
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
});

// Add header background change on scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = '#fff';
    header.style.backdropFilter = 'none';
  }
});
