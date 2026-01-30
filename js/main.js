// Controla el menú hamburguesa y comportamiento de enlaces internos
const btn = document.querySelector('.nav-toggle');
const nav = document.getElementById('main-nav');

if (btn && nav) {
  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    btn.classList.toggle('is-active', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  // Cerrar menú al clicar un enlace (mejor experiencia en móvil)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      // Si el enlace es interno, dejar que haga el scroll; luego cerrar el menú
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Cerrar al hacer click fuera (opcional)
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.classList.remove('is-active');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Accessibility: cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.classList.remove('is-active');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
}

// CARRUSEL DE IMÁGENES
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel-container');
  
  carousels.forEach(container => {
    const carousel = container.querySelector('.carousel');
    const images = carousel.querySelectorAll('img');
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');
    const dots = container.querySelectorAll('.carousel-dot');
    
    let currentIndex = 0;
    
    // Función para actualizar el carrusel
    const updateCarousel = () => {
      const offset = -currentIndex * 100;
      carousel.style.transform = `translateX(${offset}%)`;
      
      // Actualizar puntos
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    };
    
    // Botón siguiente
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
      });
    }
    
    // Botón anterior
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
      });
    }
    
    // Puntos de navegación
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });
    
    // Inicializar
    updateCarousel();
  });
  });

  // Abrir WhatsApp al hacer clic en un producto (ignorar clics en controles del carrusel)
  const products = document.querySelectorAll('.producto');
  const phone = '+573238149197';

  products.forEach(prod => {
    prod.addEventListener('click', (e) => {
      if (e.target.closest('.carousel-btn') || e.target.closest('.carousel-dot')) return;
      const name = prod.dataset.product || (prod.querySelector('h3') && prod.querySelector('h3').textContent.trim()) || 'producto';
      const text = encodeURIComponent(`Hola. Quiero información sobre ${name}.`);
      window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank', 'noopener');
    });
  });

// FIN js/main.js;