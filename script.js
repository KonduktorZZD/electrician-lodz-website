// script.js

document.addEventListener("DOMContentLoaded", () => {
  /* === Scroll Reveal === */
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .fade-up, .zoom"
  );

  const scrollReveal = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        el.classList.add("show");
      } else {
        el.classList.remove("show");
      }
    });
  };

  scrollReveal();
  window.addEventListener("scroll", scrollReveal);

  /* === Slider opinii klientów z dot navigation === */
  const track = document.querySelector(".testimonial-track");
  const slides = Array.from(document.querySelectorAll(".testimonial-slide"));
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  const dotsContainer = document.querySelector(".dots");

  let currentIndex = 1;
  const slideWidth = slides[0].offsetWidth;

  // Ustawienie początkowe (przesunięcie do pierwszego oryginalnego slajdu)
  track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

  // Generowanie kropek
  const realSlidesCount = slides.length - 2; // bez klonów
  for (let i = 0; i < realSlidesCount; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dotsContainer.append(dot);
    dot.addEventListener("click", () => {
      currentIndex = i + 1;
      updateSlider();
      updateDots();
    });
  }
  const dots = Array.from(dotsContainer.children);

  function updateSlider() {
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  function updateDots() {
    dots.forEach((d, idx) =>
      d.classList.toggle("active", idx === currentIndex - 1)
    );
  }

  function handleTransitionEnd() {
    const all = Array.from(document.querySelectorAll(".testimonial-slide"));
    // Jeżeli dotknęliśmy klonu ostatniego slajdu (klon Michała)
    if (all[currentIndex].innerHTML.includes("– Michał")) {
      track.style.transition = "none";
      currentIndex = all.length - 2;
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
    // Jeżeli dotknęliśmy klonu pierwszego slajdu (klon Anny)
    if (all[currentIndex].innerHTML.includes("– Anna")) {
      track.style.transition = "none";
      currentIndex = 1;
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
    updateDots();
  }

  nextBtn.addEventListener("click", () => {
    const all = document.querySelectorAll(".testimonial-slide");
    if (currentIndex < all.length - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  track.addEventListener("transitionend", handleTransitionEnd);

  // Automatyczne przesuwanie co 7 sekund
  setInterval(() => {
    currentIndex++;
    updateSlider();
  }, 7000);

  // Przeliczanie szerokości po zmianie rozmiaru ekranu
  window.addEventListener("resize", () => {
    const newWidth = slides[0].offsetWidth;
    track.style.transition = "none";
    track.style.transform = `translateX(-${newWidth * currentIndex}px)`;
  });
});


document.addEventListener('DOMContentLoaded', () => {
  /* --- Tabs --- */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn, .tab-content')
        .forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  /* --- Dynamic slider cenowy --- */
  const ptsRange = document.getElementById('pointsRange');
  const ptsValue = document.getElementById('pointsValue');
  const installPts = document.getElementById('installPoints');
  const installPrice = document.getElementById('installPrice');
  ptsRange.addEventListener('input', () => {
    const n = +ptsRange.value;
    ptsValue.textContent = n;
    installPts.textContent = n;
    installPrice.textContent = n * 1000;
  });

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const ans = btn.nextElementSibling;
      if (btn.classList.contains('active')) {
        ans.style.maxHeight = ans.scrollHeight + 'px';
      } else {
        ans.style.maxHeight = null;
      }
    });
  });

  /* --- Lottie dla CTA --- */
  const lottieOpts = id => ({
    container: document.getElementById(id),
    renderer: 'svg', loop: true, autoplay: true,
    path: './arrow.json'
  });
  lottie.loadAnimation(lottieOpts('lottie-small'));
  lottie.loadAnimation(lottieOpts('lottie-install'));
  lottie.loadAnimation(lottieOpts('lottie-sub'));

  /* ... reszta Twojego existing JS (scroll reveal, slider opinii itp.) ... */
});

document.addEventListener("DOMContentLoaded", () => {
  /* === Portfolio: filtracja === */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // aktywna klasa
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const cat = btn.dataset.cat;
      items.forEach(item => {
        // pokaż wszystkie lub tylko zgodne
        if (cat === "all" || item.dataset.category === cat) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  /* === Portfolio: modal === */
  const modal = document.getElementById("portfolio-modal");
  const modalBody = modal.querySelector(".portfolio-modal-body");
  const closeBtn = modal.querySelector(".portfolio-modal-close");

  items.forEach(item => {
    item.addEventListener("click", () => {
      // przygotuj zawartość: obrazek + tytuł (alt) + przykładowy opis
      const img = item.querySelector("img");
      modalBody.innerHTML = `
        <img src="${img.src}" alt="${img.alt}">
        <h3>${img.alt}</h3>
        <p>Opis realizacji: tutaj możesz dodać szczegóły zakresu, technologii i efektów pracy.</p>
      `;
      modal.style.display = "flex";
    });
  });
  closeBtn.addEventListener("click", () => modal.style.display = "none");
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const hero = document.getElementById("hero");
  const navLinks = document.querySelectorAll("nav.nav-desktop a");
  const hamburger = document.getElementById("hamburger");
  const navMobile = document.getElementById("nav-mobile");
  const openChat = document.getElementById("open-chat");
  const openChatMobile = document.getElementById("open-chat-mobile");
  const chatModal = document.getElementById("chat-modal");
  const chatClose = document.getElementById("chat-close");

  // 1. Sticky + shrink on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      document.body.classList.add("scrolled");
    } else {
      document.body.classList.remove("scrolled");
    }
  });

  // 2. Smooth scroll + active link
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // 3. Hamburger toggle
  hamburger.addEventListener("click", () => {
    navMobile.classList.toggle("open");
    hamburger.classList.toggle("open");
  });

  // 4. Typed text effect
  const mainText = "Profesjonalny elektryk w Łodzi";
  const subPhrases = ["Szybko.", "Solidnie.", "Bez ukrytych kosztów."];
  let idx = 0, subIdx = 0, charIdx = 0;
  const typedEl = document.getElementById("typed");
  const typedSub = document.querySelector(".typed-sub");
  function type() {
    if (charIdx < mainText.length) {
      typedEl.textContent += mainText[charIdx++];
      setTimeout(type, 100);
    } else {
      setTimeout(typeSub, 500);
    }
  }
  function typeSub() {
    if (subIdx < subPhrases.length) {
      if (charIdx - mainText.length < subPhrases[subIdx].length) {
        typedSub.textContent += subPhrases[subIdx][charIdx - mainText.length];
        charIdx++;
        setTimeout(typeSub, 100);
      } else {
        subIdx++;
        charIdx = mainText.length;
        typedSub.textContent += " ";
        setTimeout(typeSub, 300);
      }
    }
  }
  type();

  // 5. Chat modal
  function openModal() { chatModal.style.display = "flex"; }
  function closeModal() { chatModal.style.display = "none"; }
  openChat.addEventListener("click", openModal);
  openChatMobile.addEventListener("click", openModal);
  chatClose.addEventListener("click", closeModal);
  chatModal.addEventListener("click", e => {
    if (e.target === chatModal) closeModal();
  });

});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const fields = {
    name: {
      elem: document.getElementById('name'),
      validator: v => v.trim().length >= 2,
      error: 'Podaj co najmniej 2 znaki'
    },
    email: {
      elem: document.getElementById('email'),
      validator: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      error: 'Podaj poprawny adres e‑mail'
    },
    subject: {
      elem: document.getElementById('subject'),
      validator: v => v.trim().length >= 3,
      error: 'Temat jest wymagany'
    },
    message: {
      elem: document.getElementById('message'),
      validator: v => v.trim().length >= 10,
      error: 'Wiadomość musi mieć minimum 10 znaków'
    },
    consent: {
      elem: document.getElementById('consent'),
      validator: v => v === true,
      error: 'Musisz wyrazić zgodę'
    }
  };

  // Helper: pokaż komunikat błędu pod polem
  function showError(field, msg) {
    // usuń stary komunikat
    const old = field.elem.parentElement.querySelector('.error-message');
    if (old) old.remove();
    field.elem.classList.add('error');
    const span = document.createElement('div');
    span.className = 'error-message';
    span.textContent = msg;
    field.elem.parentElement.appendChild(span);
  }

  function clearError(field) {
    field.elem.classList.remove('error');
    const old = field.elem.parentElement.querySelector('.error-message');
    if (old) old.remove();
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    // Walidacja każdego pola
    Object.values(fields).forEach(({ elem, validator, error }) => {
      clearError(fields[elem.id] || fields.consent);
      let value = elem.type === 'checkbox' ? elem.checked : elem.value;
      if (!validator(value)) {
        showError(
          Object.values(fields).find(f => f.elem === elem),
          error
        );
        valid = false;
      }
    });

    if (valid) {
      // wszystko ok — np. wyślij AJAX-em lub form.submit()
      console.log('Formularz poprawny. Wysyłam dane...');
      form.submit();
    }
  });

  // Usuwaj błąd przy poprawie wartości
  Object.values(fields).forEach(field => {
    field.elem.addEventListener('input', () => clearError(field));
    if (field.elem.type === 'checkbox') {
      field.elem.addEventListener('change', () => clearError(field));
    }
  });
});

// MAŁA NAPRAWA
const repairForm = document.getElementById('repairForm');
const repairPrice = document.getElementById('repairPrice');
const repairPrices = {
  gniazdko: 150,
  bezpiecznik: 200,
  zwarcie: 250
};
repairForm.addEventListener('change', () => {
  const type = document.getElementById('repairType').value;
  const surcharge = repairForm.time.value === 'extra' ? 50 : 0;
  repairPrice.textContent = repairPrices[type] + surcharge;
});

// MONTAŻ INSTALACJI
const installForm = document.getElementById('installForm');
const pointsRange = document.getElementById('points');
const pointsLabel = document.getElementById('pointsLabel');
const installPrice = document.getElementById('installPrice');
pointsRange.addEventListener('input', () => updateInstallPrice());
installForm.addEventListener('change', () => updateInstallPrice());
function updateInstallPrice() {
  const points = parseInt(pointsRange.value);
  const multiplier = parseFloat(document.getElementById('buildingType').value);
  const ownMaterials = document.getElementById('ownMaterials').checked;
  const base = 100;
  let total = points * base * multiplier;
  if (ownMaterials) total *= 0.9;
  installPrice.textContent = Math.round(total);
  pointsLabel.textContent = points;
}
updateInstallPrice();
