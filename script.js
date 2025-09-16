document.addEventListener('DOMContentLoaded', () => {
  // --- Typing Effect ---
  const headline = document.getElementById('headline');
  if (headline) {
    const textToType = headline.textContent; // Get text from HTML
    headline.textContent = ''; // Clear it for the effect

    let i = 0;
    function typeWriter() {
      if (i < textToType.length) {
        headline.textContent += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, 120); // Adjust typing speed here
      } else {
        headline.classList.add('typing-done'); // Stop the cursor from blinking via CSS
      }
    }

    // Start after a brief delay to make it noticeable
    setTimeout(typeWriter, 500);
  }

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
      hamburger.setAttribute('aria-expanded', !isExpanded);
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
  const closeBtn = document.querySelector('.close-button');

  if (modal && contactNavLink && closeBtn) {
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

    contactNavLink.addEventListener('click', openModal);
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
});