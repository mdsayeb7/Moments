const dialog = document.querySelector('#dialog');
const galleryContainer = document.querySelector('.imageGallery');
const carouselContainer = document.querySelector('#carousel');
const closeDialogBtn = document.querySelector('#closeDialogBtn');
const nextButton = document.querySelector('.controls-btn.next');
const prevButton = document.querySelector('.controls-btn.prev');

// Array of image URLs
const images = [
  "img/CLELFJhu.webp", "img/FcFjBvHx.webp", "img/TeAeZpxD.webp", "img/tKuctSHr.webp",
  "img/akbFivud.webp", "img/mMhbtqvY.webp", "img/tBKkxMmk.webp", "img/tAndIWYz.webp"
];

let currentIndex = 0; // Track the current index of the displayed image

// Dynamically generate gallery buttons
images.forEach((image, index) => {
  const button = document.createElement('button');
  button.onclick = () => openDialog(index);
  const img = document.createElement('img');
  img.src = image;
  img.alt = "Image";
  img.loading = "lazy";
  button.appendChild(img);
  galleryContainer.appendChild(button);
});

// Dynamically generate carousel images
images.forEach((image) => {
  const img = document.createElement('img');
  img.src = image;
  img.alt = "Image";
  img.loading = "lazy";
  carouselContainer.appendChild(img);
});

function openDialog(index) {
  currentIndex = index;
  dialog.showModal();
  const image = carouselContainer.querySelectorAll('img')[currentIndex];
  image.scrollIntoView({ behavior: 'smooth', inline: 'center' });

  // Update the button states when opening the dialog
  updateButtonStates();
}

function scrollCarousel(direction) {
  // Update the currentIndex based on the direction
  if (direction === 1 && currentIndex < images.length - 1) {
    currentIndex++; // Move to next image
  } else if (direction === -1 && currentIndex > 0) {
    currentIndex--; // Move to previous image
  }

  // Scroll to the new image
  const image = carouselContainer.querySelectorAll('img')[currentIndex];
  image.scrollIntoView({ behavior: 'smooth', inline: 'center' });

  // Update the button states after scrolling
  updateButtonStates();
}

// Update button states (disable/enable next and previous)
function updateButtonStates() {
  if (currentIndex === 0) {
    prevButton.disabled = true;  // Disable "Previous" button on the first image
  } else {
    prevButton.disabled = false;
  }

  if (currentIndex === images.length - 1) {
    nextButton.disabled = true;  // Disable "Next" button on the last image
  } else {
    nextButton.disabled = false;
  }
}

// Event listeners for the buttons
nextButton.addEventListener('click', () => scrollCarousel(1));
prevButton.addEventListener('click', () => scrollCarousel(-1));

// Event listener for closing the dialog
closeDialogBtn.addEventListener('click', () => {
  dialog.close();
  // Ensure that the buttons reset when closing the dialog
  updateButtonStates();
});

// Initial state check for the buttons
updateButtonStates(); // Call it on page load to set the correct button states
