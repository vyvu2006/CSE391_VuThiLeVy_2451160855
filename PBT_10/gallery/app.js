const gallery = document.getElementById("gallery");

const loading = document.getElementById("loading");

const trigger = document.getElementById("load-trigger");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightboxImg");

const closeBtn = document.getElementById("closeBtn");

let page = 1;
let isLoading = false;

// ====================
// LOAD PHOTOS
// ====================

async function loadMorePhotos() {
  if (isLoading) return;

  isLoading = true;

  loading.style.display = "block";

  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=20`,
    );

    const photos = await response.json();

    renderPhotos(photos);

    page++;
  } catch (error) {
    alert("Lỗi tải ảnh!");
  } finally {
    loading.style.display = "none";

    isLoading = false;
  }
}

// ====================
// RENDER PHOTOS
// ====================

function renderPhotos(photos) {
  photos.forEach((photo) => {
    const img = document.createElement("img");

    // lazy loading
    img.dataset.src = photo.download_url;

    img.alt = photo.author;

    // click mở ảnh lớn
    img.addEventListener("click", () => {
      openLightbox(photo.download_url);
    });

    gallery.appendChild(img);

    imageObserver.observe(img);
  });
}

// ====================
// LAZY LOAD
// ====================

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;

      img.src = img.dataset.src;

      observer.unobserve(img);
    }
  });
});

// ====================
// INFINITE SCROLL
// ====================

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMorePhotos();
  }
});

observer.observe(trigger);

// ====================
// LIGHTBOX
// ====================

function openLightbox(src) {
  lightboxImg.src = src;

  lightbox.style.display = "flex";
}

// nút X đóng
closeBtn.onclick = function () {
  lightbox.style.display = "none";
};

// click nền đen đóng
lightbox.onclick = function (e) {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
};

// load lần đầu
loadMorePhotos();
