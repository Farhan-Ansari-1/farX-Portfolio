document.addEventListener('DOMContentLoaded', () => {
  // --- Scrolled Header Effect ---
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // --- Hamburger Menu ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  // Helper function to close the hamburger menu for better code reuse
  const closeHamburgerMenu = () => {
    if (hamburger && navMenu && hamburger.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  };

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', (!isExpanded).toString());
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        // We don't close for the contact link, as it opens a modal
        if (!link.id.includes('contact')) {
            closeHamburgerMenu();
        }
      });
    });
  }

  // --- Tab Functionality ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (tabBtns.length > 0 && tabPanes.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Deactivate all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // Activate the clicked button and its corresponding pane
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        const activePane = document.getElementById(tabId);
        if (activePane) {
          activePane.classList.add('active');
        }
      });
    });
  }

  // --- *** NEW: Logic for Project Nav Link *** ---
  const projectsNavLink = document.querySelector('a.nav-link[href="#projects"]');
  const projectsTabBtn = document.querySelector('.tab-btn[data-tab="projects-tab"]');

  if (projectsNavLink && projectsTabBtn) {
    projectsNavLink.addEventListener('click', () => {
      // When the nav link is clicked, also "click" the corresponding tab button
      projectsTabBtn.click();
    });
  }

  // --- Contact Modal ---
  const modal = document.getElementById('contact-modal');
  const contactNavLink = document.getElementById('contact-nav-link');
  const sayHelloBtn = document.getElementById('say-hello-btn'); // New button
  const closeBtn = document.querySelector('.close-button');

  if (modal && closeBtn) {
    const openModal = (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      modal.classList.add('show-modal');
      document.body.classList.add('modal-open');
      // Close hamburger if open
      closeHamburgerMenu();
    };

    const closeModal = () => {
      modal.classList.remove('show-modal');
      document.body.classList.remove('modal-open');

      // Reset form for next time
      const contactSection = document.querySelector('#contact');
      if (contactSection && contactSection.classList.contains('form-submitted')) {
        contactSection.classList.remove('form-submitted');
        // Also reset the form fields and button state
        const form = contactSection.querySelector('#contact-form');
        const button = form.querySelector('.btn-submit');
        form.reset();
        button.disabled = false;
        button.textContent = 'Send Message';
      }
    };

    if (contactNavLink) {
      contactNavLink.addEventListener('click', openModal);
    }
    if (sayHelloBtn) {
      sayHelloBtn.addEventListener('click', openModal);
    }

    closeBtn.addEventListener('click', closeModal);

    // Close modal if user clicks outside of the modal content
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
    
    // Close modal with Escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('show-modal')) {
            closeModal();
        }
    });
  }

  // --- AJAX Form Submission ---
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success-message');

  if (contactForm && successMessage) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent the default redirect

      const submitButton = contactForm.querySelector('.btn-submit');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactForm.parentElement.classList.add('form-submitted');
        } else {
          alert('Oops! There was a problem submitting your form. Please try again later.');
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      } catch (error) {
        console.error('Submission error:', error);
        alert('Oops! There was a network error. Please check your connection and try again.');
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }

  // --- Back to Top Button ---
  const backToTopBtn = document.getElementById('back-to-top-btn');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      const shouldShow = document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;
      backToTopBtn.classList.toggle('show', shouldShow);
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Dynamic Copyright Year ---
  const yearSpan = document.getElementById('copyright-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Initialize AOS ---
  AOS.init({
    duration: 1000, // values from 0 to 3000, with step 50ms
    once: true, // whether animation should happen only once - while scrolling down
  });

  // --- Typewriter Effect for Subtitle ---
  const subtitle = document.getElementById('typing-subtitle');
  if (subtitle) {
    const text = subtitle.textContent.trim();
    subtitle.textContent = '';

    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    subtitle.appendChild(cursor);

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        cursor.before(text.charAt(i));
        i++;
        setTimeout(typeWriter, 70); // Typing speed
      } else {
        cursor.style.display = 'none';
      }
    };
    
    // Start typing after AOS animation (approx 1s)
    setTimeout(typeWriter, 1000);
  }

  // --- Active Link Highlighter (Scroll Spy) ---
  // Select only direct sections of main to avoid selecting the hidden contact section in modal
  const sections = document.querySelectorAll('main > section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 150)) {
        // Only update current if the section has an ID
        const id = section.getAttribute('id');
        if (id) current = id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      // Check if current is not empty before matching
      if (current && link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // --- 3D Tilt Effect for Cards ---
  const tiltCards = document.querySelectorAll('.project-card, .about-me, .skill-item');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // --- Custom Cursor Logic ---
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      // Dot follows instantly
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      // Outline follows with slight delay (via CSS transition)
      cursorOutline.style.left = `${posX}px`;
      cursorOutline.style.top = `${posY}px`;
    });

    // Add hover effect for links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
    });
  }

  // --- Cyber Network Background (Canvas) ---
  const canvas = document.getElementById('cyber-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = (Math.random() * 1) - 0.5; // Speed
        this.directionY = (Math.random() * 1) - 0.5;
        this.size = Math.random() * 2 + 1;
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#00f2ea'; // Neon Cyan
        ctx.fill();
      }
    }

    function init() {
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000; // Density
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Draw connections
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 242, 234, ${1 - distance/100})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    init();
    animate();
  }
});