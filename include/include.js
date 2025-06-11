/**
 * GOAT ST RESTAURANT - FUNCIONES PRINCIPALES
 * Maneja la carga de componentes y navegación móvil
 */

// Cargar componentes header y footer
document.addEventListener('DOMContentLoaded', function() {
  loadComponent('header', 'components/header.html');
  loadComponent('footer', 'components/footer.html');
});

/**
 * Carga un componente HTML externo
 * @param {string} elementId - ID del elemento donde cargar el componente 
 * @param {string} filePath - Ruta del archivo a cargar
 */
function loadComponent(elementId, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar ${filePath}: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      document.getElementById(elementId).innerHTML = html;
      
      // Si es el header, inicializar la navegación móvil
      if (elementId === 'header') {
        initMobileNavigation();
      }
    })
    .catch(error => {
      console.error('Error cargando componente:', error);
      document.getElementById(elementId).innerHTML = 
        `<p>Error al cargar ${elementId}</p>`;
    });
}

/**
 * Inicializa la funcionalidad del menú hamburguesa
 * Se ejecuta después de cargar el header
 */
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('close-btn');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-list a');

  if (!hamburgerBtn || !mobileNav) {
    console.warn('Elementos de navegación no encontrados');
    return;
  }

  // Abrir menú
  hamburgerBtn.addEventListener('click', function() {
    hamburgerBtn.classList.add('active');
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  });

  // Cerrar menú - botón X
  closeBtn?.addEventListener('click', closeMenu);
  
  // Cerrar menú - overlay
  navOverlay?.addEventListener('click', closeMenu);
  
  // Cerrar menú - enlaces
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      closeMenu();
    }
  });

  /**
   * Función para cerrar el menú móvil
   */
  function closeMenu() {
    hamburgerBtn.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll
  }
}