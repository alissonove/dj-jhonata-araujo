const equalizerBars = document.querySelectorAll(".equalizer i");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let equalizerTimer;
let phase = 0;

function updateEqualizer() {
  phase += 0.42;

  equalizerBars.forEach((bar, index) => {
    const level = 0.35 + Math.abs(Math.sin(phase + index * 0.8)) * 2.4;
    bar.style.setProperty("--level", level.toFixed(2));
  });
}

function syncEqualizer() {
  window.clearInterval(equalizerTimer);

  if (reducedMotion.matches || document.hidden) {
    equalizerBars.forEach((bar) => bar.style.setProperty("--level", "1"));
    return;
  }

  updateEqualizer();
  equalizerTimer = window.setInterval(updateEqualizer, 100);
}

syncEqualizer();
document.addEventListener("visibilitychange", syncEqualizer);
reducedMotion.addEventListener("change", syncEqualizer);