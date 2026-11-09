// ---------- 1. Select elements ----------
const allImages = document.querySelectorAll(".gallery img");
const filterButtons = document.querySelectorAll(".filter-btn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const counter = document.getElementById("counter");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// ---------- 2. State ----------
let visibleImages = Array.from(allImages); // images currently shown on page
let currentIndex = 0;                      // which image is open in lightbox

// ---------- 3. Lightbox functions ----------
function showImage(index) {
  // wrap around: after last -> first, before first -> last
  currentIndex = (index + visibleImages.length) % visibleImages.length;

  const img = visibleImages[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  counter.textContent = `${currentIndex + 1} / ${visibleImages.length}`;
}

function openLightbox(index) {
  showImage(index);
  lightbox.classList.add("show");
}

function closeLightbox() {
  lightbox.classList.remove("show");
}

// ---------- 4. Click events ----------
allImages.forEach((img) => {
  img.addEventListener("click", () => {
    openLightbox(visibleImages.indexOf(img));
  });
});

nextBtn.addEventListener("click", () => showImage(currentIndex + 1));
prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
closeBtn.addEventListener("click", closeLightbox);

// click on dark background (not on the image/buttons) closes it
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// ---------- 5. Keyboard support ----------
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;

  if (e.key === "ArrowRight") showImage(currentIndex + 1);
  if (e.key === "ArrowLeft") showImage(currentIndex - 1);
  if (e.key === "Escape") closeLightbox();
});

// ---------- 6. Category filter (Bonus) ----------
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // highlight the clicked button
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const category = btn.dataset.filter;

    allImages.forEach((img) => {
      const match = category === "all" || img.dataset.category === category;
      img.style.display = match ? "block" : "none";
    });

    // rebuild the list used by next/prev
    visibleImages = Array.from(allImages).filter(
      (img) => img.style.display !== "none"
    );
  });
});
