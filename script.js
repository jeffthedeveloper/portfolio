/**
 * @file script.js
 * @description Main JavaScript file for Jefferson Firmino's portfolio.
 * Handles skill bar animations, contact form submission, mobile navigation, skill tooltips,
 * dynamic year update, and unique visitor tracking.
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
   * Unique Visitor Tracking and Counter
   * ------------------------------------------------------------------------
   */

  // Funções auxiliares para Local Storage e Cookies
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Função principal para registrar o visitante e atualizar o contador
  async function registerAndDisplayVisitorCount() {
    const visitorCountElement = document.getElementById('visitor-count');
    if (!visitorCountElement) {
      console.error('Elemento #visitor-count não encontrado. Certifique-se de que o HTML está correto.');
      return; // Não prossegue se o elemento não existe
    }

    // 1. Tentar identificar o usuário no Local Storage ou Cookie
    let visitorId = localStorage.getItem('site_visitor_id');
    let isNewVisitorSession = false; // Flag para informar ao backend se é uma "nova sessão" do navegador

    if (!visitorId) {
      // Se não houver ID no Local Storage, tenta no Cookie
      visitorId = getCookie('site_visitor_id');
      if (!visitorId) {
        // Se ainda não houver, é um novo visitante (ou um antigo que limpou dados)
        visitorId = crypto.randomUUID(); // Gera um UUID único
        localStorage.setItem('site_visitor_id', visitorId);
        setCookie('site_visitor_id', visitorId, 365); // Guarda por 1 ano
        isNewVisitorSession = true; // Marca como nova sessão/novo visitante
      } else {
        // Encontrou no cookie, mas não no local storage (limpou local storage?)
        localStorage.setItem('site_visitor_id', visitorId);
      }
    }

    // 2. Tentar obter a localização aproximada pelo IP (usando uma API externa gratuita)
    // NOTA: Para um uso profissional e para evitar limites de requisição no frontend,
    // é ALTAMENTE recomendado que a chamada para a API GeoIP seja feita NO BACKEND.
    // Aqui, é mantido no frontend para demonstração da captura de dados.
    let country = 'Desconhecido';
    let city = 'Desconhecido';
    let ipAddressFromFrontend = 'Não capturado'; // O IP real e confiável deve vir do backend

    try {
      const ipGeoResponse = await fetch('https://ipapi.co/json/');
      const ipGeoData = await ipGeoResponse.json();

      if (ipGeoData && ipGeoData.ip) {
        ipAddressFromFrontend = ipGeoData.ip;
        country = ipGeoData.country_name || country;
        city = ipGeoData.city || city;
      }
    } catch (error) {
      console.warn('Erro ao obter localização ou IP via API externa no frontend:', error);
    }

    // 3. Enviar os dados para o seu Backend e obter a contagem
    try {
      const response = await fetch('/api/register-visit', { // Seu endpoint no backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitorId: visitorId,
          // O IP real será capturado no backend (req.ip ou x-forwarded-for)
          // Mas enviamos o capturado no frontend para fins de log ou fallback
          ipAddressFromFrontend: ipAddressFromFrontend,
          country: country,
          city: city,
          isNewVisitorSession: isNewVisitorSession,
          userAgent: navigator.userAgent,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height
        }),
      });

      const data = await response.json();
      console.log('Visita registrada:', data);

      // Atualizar o contador no frontend com o valor retornado pelo backend
      if (data.totalVisitors !== undefined) {
        visitorCountElement.textContent = data.totalVisitors;
      }

    } catch (error) {
      console.error('Erro ao enviar dados para o backend ou obter a contagem:', error);
      visitorCountElement.textContent = 'Erro ao carregar'; // Indica falha
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
  initSkillTooltips(); // Initialize tooltips after skill bars might have their widths set
  updateFooterYear();

  // NOVO: Chamar a função de rastreamento de visitantes
  registerAndDisplayVisitorCount();

});
