// Cookie consent banner + settings modal (Talleres Mateo 2.0)
(function () {
  const STORAGE_KEY = 'tmateo_cookie_consent';

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; }
  }
  function saveConsent(analytics) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics, date: new Date().toISOString() }));
  }

  function buildUI() {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML =
      '<p>Usamos cookies propias necesarias para el funcionamiento de la web y, con tu consentimiento, cookies analíticas. Puedes aceptar, rechazar o configurar tu elección. Más información en nuestra <a href="legal.html#cookies">Política de Cookies</a>.</p>' +
      '<div class="cookie-actions">' +
        '<button type="button" class="cookie-btn settings" id="cookieOpenSettings">Configurar</button>' +
        '<button type="button" class="cookie-btn reject" id="cookieReject">Rechazar</button>' +
        '<button type="button" class="cookie-btn accept" id="cookieAccept">Aceptar todo</button>' +
      '</div>';

    const modal = document.createElement('div');
    modal.id = 'cookie-modal';
    modal.innerHTML =
      '<div class="cookie-modal-box" role="dialog" aria-label="Configuración de cookies">' +
        '<h3>Configuración de cookies</h3>' +
        '<p>Elige qué cookies quieres permitir. Las técnicas son necesarias para que la web funcione y no se pueden desactivar.</p>' +
        '<div class="cookie-option">' +
          '<div class="cookie-option-text"><strong>Técnicas (necesarias)</strong><span>Recuerdan tu elección de cookies.</span></div>' +
          '<label class="switch"><input type="checkbox" checked disabled /><span class="slider"></span></label>' +
        '</div>' +
        '<div class="cookie-option">' +
          '<div class="cookie-option-text"><strong>Analíticas</strong><span>Nos ayudan a medir el uso de la web.</span></div>' +
          '<label class="switch"><input type="checkbox" id="cookieAnalyticsToggle" /><span class="slider"></span></label>' +
        '</div>' +
        '<div class="cookie-modal-actions">' +
          '<button type="button" class="cookie-btn reject" id="cookieModalClose">Cancelar</button>' +
          '<button type="button" class="cookie-btn accept" id="cookieModalSave">Guardar preferencias</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);
    document.body.appendChild(modal);
    return { banner, modal };
  }

  function init() {
    const { banner, modal } = buildUI();
    const analyticsToggle = modal.querySelector('#cookieAnalyticsToggle');

    function showBanner() { requestAnimationFrame(() => banner.classList.add('show')); }
    function hideBanner() { banner.classList.remove('show'); }
    function openModal() {
      const consent = getConsent();
      analyticsToggle.checked = !!(consent && consent.analytics);
      modal.classList.add('show');
    }
    function closeModal() { modal.classList.remove('show'); }

    const consent = getConsent();
    if (!consent) showBanner();

    banner.querySelector('#cookieAccept').addEventListener('click', () => {
      saveConsent(true);
      hideBanner();
    });
    banner.querySelector('#cookieReject').addEventListener('click', () => {
      saveConsent(false);
      hideBanner();
    });
    banner.querySelector('#cookieOpenSettings').addEventListener('click', openModal);

    modal.querySelector('#cookieModalClose').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    modal.querySelector('#cookieModalSave').addEventListener('click', () => {
      saveConsent(analyticsToggle.checked);
      closeModal();
      hideBanner();
    });

    document.querySelectorAll('[data-cookie-settings]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
