/**
 * GOAT ST RESTAURANT - MENU LOADER
 * Carga dinámicamente las secciones del menú desde menu.json
 * 
 * MANTENIMIENTO:
 * - Para agregar nuevas secciones: añadir al JSON y crear el HTML correspondiente
 * - Los precios se muestran automáticamente con símbolo $
 * - Manejo de errores incluido
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  loadMenuSection('pa-picar');
  // FUTURO: Agregar más secciones aquí cuando sea necesario
  // loadMenuSection('bebidas');
  // loadMenuSection('postres');
});

/**
 * Carga una sección específica del menú
 * @param {string} sectionName - Nombre de la sección en el JSON
 */
function loadMenuSection(sectionName) {
  fetch('data/menu.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const section = document.getElementById(sectionName);
      if (!section) {
        console.warn(`Sección "${sectionName}" no encontrada en el HTML`);
        return;
      }
      
      const menuItems = section.querySelector('.menu-items');
      if (!menuItems) {
        console.warn(`Contenedor .menu-items no encontrado en sección "${sectionName}"`);
        return;
      }
      
      // Limpiar contenido existente
      menuItems.innerHTML = '';
      
      // Verificar si la sección existe en el JSON
      if (!data[sectionName]) {
        menuItems.innerHTML = `<p>Sección "${sectionName}" no disponible.</p>`;
        return;
      }
      
      // Crear elementos del menú
      data[sectionName].forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
          <div class="item-info">
            <strong class="item-name">${item.nombre}</strong>
            <p class="item-description">${item.descripcion}</p>
          </div>
          <div class="item-price">$${item.precio}</div>
        `;
        menuItems.appendChild(menuItem);
      });
    })
    .catch(error => {
      console.error(`Error al cargar la sección "${sectionName}":`, error);
      const menuItems = document.querySelector(`#${sectionName} .menu-items`);
      if (menuItems) {
        menuItems.innerHTML = '<p class="error-message">Error al cargar el menú. Por favor, intenta más tarde.</p>';
      }
    });
}