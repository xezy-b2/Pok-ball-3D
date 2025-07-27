function scrollProducts(direction) {
  const container = document.getElementById('products');
  container.scrollBy({ left: direction * 300, behavior: 'smooth' });
}

const galleryImages = {
  "pokeball-classique": [
    { src: "images/pokeball-classique.jpg", alt: "PokéBall Classique - vue principale" },
    { src: "images/pokeball-classique-2.jpg", alt: "PokéBall Classique - vue de côté" },
    { src: "images/pokeball-classique.jpg", alt: "PokéBall Classique - zoom" }
  ],
  "mimiqui": [
    { src: "images/mimqui1.png", alt: "mimiqui - vue principale" },
    { src: "images/mimiqui2.png", alt: "mimiqui - vue de côté" },
    { src: "images/mimiqui3.png", alt: "mimiqui - vue de derrière" }
  ],
  "ultraball": [
    { src: "ultraball.jpg", alt: "Ultra Ball - vue principale" },
    { src: "ultraball-2.jpg", alt: "Ultra Ball - vue de côté" }
  ],
  "masterball": [
    { src: "masterball.jpg", alt: "Master Ball - vue principale" },
    { src: "masterball-2.jpg", alt: "Master Ball - vue de côté" }
  ],
  "lune-ball": [
    { src: "lune-ball.jpg", alt: "Lune Ball - vue principale" },
    { src: "lune-ball-2.jpg", alt: "Lune Ball - vue de côté" }
  ]
};

let currentGallery = [];
let currentIndex = 0;
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');

document.querySelectorAll('.product').forEach(product => {
  product.addEventListener('click', () => {
    const key = product.dataset.key;
    currentGallery = galleryImages[key] || [];
    currentIndex = 0;
    updateModalImage();
    modal.classList.add('visible');
  });
});

function updateModalImage() {
  const { src, alt } = currentGallery[currentIndex];
  modalImg.src = src;
  modalImg.alt = alt;
  modalCaption.textContent = alt;
}

document.getElementById('modal-close').addEventListener('click', () => {
  modal.classList.remove('visible');
});
document.getElementById('modal-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateModalImage();
});
document.getElementById('modal-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateModalImage();
});
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('visible');
});

// Discord Modal
const discordLink = document.getElementById('discord-link');
const discordModal = document.getElementById('discord-modal');
const discordClose = document.getElementById('discord-close');

discordLink.addEventListener('click', e => {
  e.preventDefault();
  discordModal.classList.add('visible');
});
discordClose.addEventListener('click', () => {
  discordModal.classList.remove('visible');
});
discordModal.addEventListener('click', e => {
  if (e.target === discordModal) discordModal.classList.remove('visible');
});
document.addEventListener('keydown', e => {
  if (e.key === "Escape") discordModal.classList.remove('visible');
});

// Thème sombre/clair
const toggleBtn = document.getElementById('theme-toggle');
function updateIcon() {
  toggleBtn.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
}
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  updateIcon();
});
updateIcon();

// Formulaire
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', async e => {
  e.preventDefault();
  formMessage.style.display = 'none';
  const formData = new FormData(form);
  try {
    const response = await fetch(form.action, {
      method: form.method,
      headers: { 'Accept': 'application/json' },
      body: formData
    });
    if (response.ok) {
      showMessage('Merci pour votre message !', 'var(--primary)');
      form.reset();
    } else {
      throw new Error('Erreur');
    }
  } catch {
    showMessage('Erreur, veuillez réessayer.', 'red');
  }
});

function showMessage(text, color) {
  formMessage.textContent = text;
  formMessage.style.color = color;
  formMessage.classList.add('visible');
  formMessage.style.display = 'block';
  setTimeout(() => {
    formMessage.classList.remove('visible');
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 500);
  }, 5000);
}
