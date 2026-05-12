const skillBars = document.querySelectorAll(".skill-progress");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute("data-width");

      bar.style.width = width;
    }
  });
});

skillBars.forEach((bar) => {
  observer.observe(bar);
});
