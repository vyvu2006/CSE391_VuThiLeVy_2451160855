const images = [
  "https://picsum.photos/id/1015/700/400",
  "https://picsum.photos/id/1016/700/400",
  "https://picsum.photos/id/1018/700/400",
  "https://picsum.photos/id/1020/700/400",
  "https://picsum.photos/id/1024/700/400",
  "https://picsum.photos/id/1025/700/400",
  "https://picsum.photos/id/1035/700/400",
  "https://picsum.photos/id/1039/700/400",
  "https://picsum.photos/id/1043/700/400",
];

const commands = [
  "Next Image",
  "Previous Image",
  "Play Slideshow",
  "Pause Slideshow",
  "Open Modal",
  "Close Modal",
];

const galleryImage = document.getElementById("galleryImage");

const modal = document.getElementById("imageModal");

const modalImage = document.getElementById("modalImage");

const palette = document.getElementById("palette");

const commandInput = document.getElementById("commandInput");

const commandList = document.getElementById("commandList");

const thumbs = document.getElementById("thumbs");

let currentIndex = 0;
let slideshow = null;
let isPlaying = false;

/* RENDER THUMBNAILS */

function renderThumbs() {
  thumbs.innerHTML = "";

  images.forEach((image, index) => {
    const img = document.createElement("img");

    img.src = image;

    img.className = index === currentIndex ? "thumb active" : "thumb";

    img.tabIndex = 0;

    img.setAttribute("aria-label", `Thumbnail ${index + 1}`);

    img.addEventListener("click", () => {
      currentIndex = index;
      updateGallery();
    });

    thumbs.appendChild(img);
  });
}

/* UPDATE GALLERY */

function updateGallery() {
  galleryImage.src = images[currentIndex];

  renderThumbs();
}

/* NEXT IMAGE */

function nextImage() {
  currentIndex++;

  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  updateGallery();
}

/* PREVIOUS IMAGE */

function prevImage() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  updateGallery();
}

/* BUTTONS */

document.getElementById("nextBtn").addEventListener("click", nextImage);

document.getElementById("prevBtn").addEventListener("click", prevImage);

/* IMAGE MODAL */

galleryImage.addEventListener("click", () => {
  modal.classList.remove("hidden");

  modalImage.src = images[currentIndex];
});

/* CLOSE MODAL */

function closeModal() {
  modal.classList.add("hidden");

  palette.classList.add("hidden");
}

/* SLIDESHOW */

function toggleSlideshow() {
  if (!isPlaying) {
    slideshow = setInterval(() => {
      nextImage();
    }, 2000);

    isPlaying = true;
  } else {
    clearInterval(slideshow);

    isPlaying = false;
  }
}

/* COMMAND PALETTE */

function openPalette() {
  palette.classList.remove("hidden");

  commandInput.value = "";

  renderCommands(commands);

  commandInput.focus();
}

function renderCommands(list) {
  commandList.innerHTML = "";

  list.forEach((command) => {
    const li = document.createElement("li");

    li.textContent = command;

    li.tabIndex = 0;

    li.setAttribute("aria-label", command);

    li.addEventListener("click", () => {
      executeCommand(command);
    });

    commandList.appendChild(li);
  });
}

function executeCommand(command) {
  switch (command) {
    case "Next Image":
      nextImage();
      break;

    case "Previous Image":
      prevImage();
      break;

    case "Play Slideshow":
      if (!isPlaying) {
        toggleSlideshow();
      }

      break;

    case "Pause Slideshow":
      if (isPlaying) {
        toggleSlideshow();
      }

      break;

    case "Open Modal":
      modal.classList.remove("hidden");

      modalImage.src = images[currentIndex];

      break;

    case "Close Modal":
      closeModal();
      break;
  }

  palette.classList.add("hidden");
}

/* SEARCH COMMAND */

commandInput.addEventListener("input", () => {
  const keyword = commandInput.value.toLowerCase();

  const filtered = commands.filter((command) =>
    command.toLowerCase().includes(keyword),
  );

  renderCommands(filtered);
});

/* ENTER COMMAND */

commandInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const first = commandList.querySelector("li");

    if (first) {
      executeCommand(first.textContent);
    }
  }
});

/* KEYBOARD SHORTCUTS */

document.addEventListener("keydown", (e) => {
  /* CTRL + K */

  if (e.ctrlKey && e.key.toLowerCase() === "k") {
    e.preventDefault();

    openPalette();
  }

  /* ESC */

  if (e.key === "Escape") {
    closeModal();
  }

  /* LEFT */

  if (e.key === "ArrowLeft") {
    prevImage();
  }

  /* RIGHT */

  if (e.key === "ArrowRight") {
    nextImage();
  }

  /* SPACE */

  if (e.code === "Space") {
    e.preventDefault();

    toggleSlideshow();
  }

  /* 1-9 */

  const number = parseInt(e.key);

  if (number >= 1 && number <= 9 && number <= images.length) {
    currentIndex = number - 1;

    updateGallery();
  }
});

/* START */

updateGallery();
