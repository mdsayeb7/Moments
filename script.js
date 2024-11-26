const dialog = document.querySelector('#dialog');
const galleryContainer = document.querySelector('.imageGallery');
const carouselContainer = document.querySelector('#carousel');
const closeDialogBtn = document.querySelector('#closeDialogBtn');
const controlsBtn = document.querySelectorAll('.controls-btn');

const images = [
  "/img/CLELFJhu.webp", "/img/FcFjBvHx.webp", "/img/TeAeZpxD.webp", "/img/tKuctSHr.webp", 
  "/img/tKuctSHr.webp", "/img/tKuctSHr.webp", "/img/akbFivud.webp", "/img/mMhbtqvY.webp", 
  "/img/mMhbtqvY.webp", "/img/tBKkxMmk.webp", "/img/tBKkxMmk.webp", "/img/tAndIWYz.webp"
];

// Dynamically generate gallery buttons
images.forEach((image, index) => {
  const button = document.createElement('button');
  button.onclick = () => openDialog(index);
  const img = document.createElement('img');
  img.src = image;
  img.alt = "Sayfullah Sayeb - Moments";
  img.loading = "lazy";
  button.appendChild(img);
  galleryContainer.appendChild(button);
});

// Dynamically generate carousel images
images.forEach((image) => {
  const img = document.createElement('img');
  img.src = image;
  img.alt = "Sayfullah Sayeb - Moments";
  img.loading = "lazy";
  carouselContainer.appendChild(img);
});

function openDialog(index) {
  if (!document.startViewTransition) {
    dialog.showModal();
    const image = carouselContainer.querySelectorAll('img')[index];
    image.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  } else {
    handleTransition(index);
  }
}

async function handleTransition(index) {
  const transition = document.startViewTransition(() => dialog.showModal());
  try {
    await transition.finished;
  } finally {
    const image = carouselContainer.querySelectorAll('img')[index];
    image.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }
}

function scrollCarousel(direction) {
  const width = carouselContainer.clientWidth;
  carouselContainer.scrollBy({
    left: width * direction,
    behavior: 'smooth'
  });
}

const closeDialog = () => {
  if (!document.startViewTransition) {
    dialog.close();
  } else {
    document.startViewTransition(() => dialog.close());
  }
};

closeDialogBtn.addEventListener('click', () => closeDialog());

controlsBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    const direction = btn.classList.contains('next') ? 1 : -1;
    scrollCarousel(direction);
  });
});
