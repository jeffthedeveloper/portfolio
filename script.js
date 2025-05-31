/**
 * @file script.js
 * @description Main JavaScript file for Jefferson Firmino's portfolio.
 * Handles skill bar animations, contact form submission, mobile navigation, skill tooltips, and dynamic year update.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /**
   * ------------------------------------------------------------------------
   * Helper Utilities
   * ------------------------------------------------------------------------
   */

  /**
   * Checks if an element is currently within the viewport.
   * @param {Element} el - The element to check.
   * @returns {boolean} True if the element is in the viewport, false otherwise.
   */
  function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0 &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right > 0
    );
  }

  /**
   * Debounces a function, ensuring it's only called after a certain delay
   * since the last time it was invoked.
   * @param {Function} func - The function to debounce.
   * @param {number} delay - The debounce delay in milliseconds.
   * @returns {Function} The debounced function.
   */
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  /**
   * ------------------------------------------------------------------------
   * Skill Bar Animation
   * ------------------------------------------------------------------------
   */
  // Store original widths globally or pass to tooltip function if needed for accuracy before animation
  const skillBarOriginalWidths = new Map();

  function initSkillBarAnimation() {
    const skillBars = document.querySelectorAll('.skill-bar');
    if (skillBars.length === 0) return;

    const animatedBars = new Set();

    skillBars.forEach(bar => {
      skillBarOriginalWidths.set(bar, bar.style.width || '0%'); // Store for tooltip and animation
      bar.style.width = '0%'; // Start with 0 width for animation
    });

    function animateVisibleBars() {
      skillBars.forEach(bar => {
        const parentItem = bar.closest('.skill-item');
        if (parentItem && isElementInViewport(parentItem) && !animatedBars.has(bar)) {
          bar.style.transition = 'width 0.8s ease-in-out';
          bar.style.width = skillBarOriginalWidths.get(bar);
          animatedBars.add(bar);
        }
      });
    }

    animateVisibleBars();
    const debouncedAnimateVisibleBars = debounce(animateVisibleBars, 150);
    window.addEventListener('scroll', debouncedAnimateVisibleBars, { passive: true });
    window.addEventListener('resize', debouncedAnimateVisibleBars, { passive: true });
  }

  /**
   * ------------------------------------------------------------------------
   * Contact Form (Mailto)
   * ------------------------------------------------------------------------
   */
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name') || 'N/A';
      const email = formData.get('email') || 'N/A';
      const subject = formData.get('subject') || 'Sem Assunto';
      const message = formData.get('message') || 'Nenhuma mensagem fornecida.';

      const primaryEmail = 'jeffersonfir@gmail.com';
      const ccEmails = 'professorjefferson.site@gmail.com,jefferson.mendes@ccc.ufcg.edu.br';

      const mailtoParams = new URLSearchParams();
      mailtoParams.append('subject', `Contato Portfólio: ${subject}`);
      mailtoParams.append('body',
        `Nome: ${name}\n` +
        `Email: ${email}\n\n` +
        `Mensagem:\n${message}`
      );
      if (ccEmails) {
        mailtoParams.append('cc', ccEmails);
      }
      mailtoParams.append('reply-to', email);

      const mailtoLink = `mailto:${primaryEmail}?${mailtoParams.toString()}`;
      window.location.href = mailtoLink;
      // contactForm.reset(); // Consider resetting form
    });
  }

  /**
   * ------------------------------------------------------------------------
   * Mobile Navigation (Hamburger Menu)
   * ------------------------------------------------------------------------
   */
  function initMobileNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (!menuToggle || !navLinksContainer) return;

    menuToggle.addEventListener('click', function () {
      const isActive = navLinksContainer.classList.toggle('active');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive.toString());
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        if (navLinksContainer.classList.contains('active')) {
          navLinksContainer.classList.remove('active');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  /**
   * ------------------------------------------------------------------------
   * Skill Tooltips
   * ------------------------------------------------------------------------
   */
  function initSkillTooltips() {
    const skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length === 0) return;

    let tooltipElement = document.querySelector('.skill-tooltip');

    if (!tooltipElement) {
      tooltipElement = document.createElement('div');
      tooltipElement.classList.add('skill-tooltip');
      document.body.appendChild(tooltipElement); // Append to body for global positioning
    }

    skillItems.forEach(item => {
      const skillBar = item.querySelector('.skill-bar');
      if (!skillBar) return;

      item.addEventListener('mouseenter', (event) => {
        // Get the original proficiency stored during skill bar animation setup
        const proficiency = skillBarOriginalWidths.get(skillBar) || skillBar.style.width || 'N/A';
        tooltipElement.textContent = `Proficiência: ${proficiency}`;
        tooltipElement.classList.add('visible');
        updateTooltipPosition(event);
      });

      item.addEventListener('mouseleave', () => {
        tooltipElement.classList.remove('visible');
      });

      item.addEventListener('mousemove', (event) => {
        // Only update position if tooltip is visible to avoid unnecessary calculations
        if (tooltipElement.classList.contains('visible')) {
          updateTooltipPosition(event);
        }
      });
    });

    function updateTooltipPosition(event) {
      if (!tooltipElement) return;

      const tooltipRect = tooltipElement.getBoundingClientRect();
      const cursorPadding = 15; // Distance from cursor

      let x = event.pageX;
      let y = event.pageY;

      // Default position: below and to the right of the cursor
      let newX = x + cursorPadding;
      let newY = y + cursorPadding;

      // Adjust if tooltip goes off screen right
      if (x + tooltipRect.width + cursorPadding > window.innerWidth + window.scrollX) {
        newX = x - tooltipRect.width - cursorPadding;
      }
      // Adjust if tooltip goes off screen bottom
      if (y + tooltipRect.height + cursorPadding > window.innerHeight + window.scrollY) {
        newY = y - tooltipRect.height - cursorPadding;
      }
      // Adjust if tooltip goes off screen left (less common with default right positioning)
      if (newX < window.scrollX) {
        newX = window.scrollX + cursorPadding;
      }
      // Adjust if tooltip goes off screen top (less common with default bottom positioning)
      if (newY < window.scrollY) {
        newY = window.scrollY + cursorPadding;
      }

      tooltipElement.style.left = `${newX}px`;
      tooltipElement.style.top = `${newY}px`;
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Dynamic Year in Footer
   * ------------------------------------------------------------------------
   */
  function updateFooterYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Initialize all modules
   * ------------------------------------------------------------------------
   */
  initSkillBarAnimation(); // Must run first to populate skillBarOriginalWidths
  initContactForm();
  initMobileNavigation();
  initSkillTooltips();    // Initialize tooltips after skill bars might have their widths set
  updateFooterYear();

});
