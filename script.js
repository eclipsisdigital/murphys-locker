const modalBackdrop = document.querySelector('[data-modal-backdrop]');
const modalTitle = document.querySelector('#modal-title');
const modalCopy = document.querySelector('[data-modal-copy]');
const modalClose = document.querySelector('.modal-close');
const modalAction = document.querySelector('.modal-action');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

const modalContent = {
  sh1: {
    title: 'Silent Hill 1 / El origen',
    copy: 'Harry Mason llega buscando a Cheryl y encuentra un pueblo cubierto de ceniza. El primer juego convirtió la limitación técnica en lenguaje: la niebla no ocultaba el mundo, lo imaginaba. Su gran hallazgo es que el terror también puede nacer de una pregunta sin respuesta.'
  },
  sh2: {
    title: 'Silent Hill 2 / La culpa',
    copy: 'James Sunderland recibe una carta de su esposa fallecida y regresa al lugar donde fueron felices. Silent Hill 2 no persigue el susto fácil: construye un descenso íntimo sobre el duelo, la negación y la forma en que la mente fabrica sus propios monstruos.'
  },
  sh3: {
    title: 'Silent Hill 3 / El cuerpo',
    copy: 'Heather Mason despierta en un centro comercial que no termina nunca. La tercera entrega lleva la pesadilla a la carne, al rito y a la identidad: una historia sobre heredar una violencia que nunca pediste y decidir qué hacer con ella.'
  },
  signal: {
    title: 'Registro sonoro / 04:17',
    copy: 'La radio no emite una canción. Es una simulación de estática: el sonido de una frecuencia buscando un lugar donde quedarse. En Silent Hill, escuchar siempre fue una forma de mirar.'
  },
  note: {
    title: 'Expedientes pendientes',
    copy: 'Todavía faltan nombres, finales y caminos secundarios. Este archivo crece con cada partida: si una escena se quedó contigo después de los créditos, quizá también pertenece aquí.'
  }
};

function openModal(key) {
  const content = modalContent[key] || modalContent.signal;
  modalTitle.textContent = content.title;
  modalCopy.textContent = content.copy;
  modalBackdrop.hidden = false;
  document.body.classList.add('modal-open');
  modalClose.focus();
}

function closeModal() {
  modalBackdrop.hidden = true;
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
  trigger.addEventListener('click', () => openModal(trigger.dataset.openModal));
});

modalClose.addEventListener('click', closeModal);
modalAction.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (event) => {
  if (event.target === modalBackdrop) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modalBackdrop.hidden) closeModal();
});

const filterButtons = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-category]');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('is-selected', item === button));
    cards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !visible);
    });
  });
});

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.main-nav a').forEach((item) => item.classList.remove('is-active'));
    link.classList.add('is-active');
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      document.querySelectorAll('.main-nav a').forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35 });

document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
