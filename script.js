const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const progressBar = document.querySelector(".scroll-progress");
const revealItems = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const sections = [...document.querySelectorAll("main section[id]")];

const productsInfo = {
  frutas: {
    title: "Tarta de frutas y crema",
    description:
      "Una propuesta fresca y vistosa, perfecta para celebraciones familiares. Esta demo la presenta como producto estrella para transmitir elegancia, calidad y pedido por encargo.",
    tags: ["Fruta fresca", "Crema suave", "Celebraciones"]
  },
  chocolate: {
    title: "Tarta de chocolate premium",
    description:
      "Ideal para una sección de alto impacto visual. Refuerza la idea de producto especial, con personalidad y pensado para cumpleaños, regalos o eventos.",
    tags: ["Chocolate intenso", "Capas premium", "Encargo"]
  },
  crema: {
    title: "Pasteles de crema artesanos",
    description:
      "Los comentarios de clientes destacan mucho la crema pastelera, así que aquí se usa como argumento comercial claro dentro del catálogo.",
    tags: ["Tradición", "Crema pastelera", "Producto diario"]
  },
  vitrina: {
    title: "Dulce de vitrina diaria",
    description:
      "Una categoría pensada para mostrar variedad y frecuencia de compra. Ayuda a que la web no solo venda encargos, sino también visitas recurrentes al local.",
    tags: ["Rotación diaria", "Vitrina", "Compra recurrente"]
  },
  encargo: {
    title: "Tartas personalizadas",
    description:
      "Perfecta para convertir la web en un canal de encargo. En la versión final, esta sección podría incluir formulario, sabores, tamaños y entrega.",
    tags: ["Personalización", "Eventos", "Reserva"]
  },
  temporada: {
    title: "Especialidades festivas",
    description:
      "Un bloque muy útil para campañas fuertes como Reyes o Navidad. Aporta sensación de novedad y permite crear landing pages de temporada.",
    tags: ["Campañas", "Roscón", "Edición limitada"]
  }
};

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    body.classList.toggle("menu-open");
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach(item => revealObserver.observe(item));

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 8;
  if (header) {
    header.classList.toggle("scrolled", scrolled);
  }

  const scrollTop = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  let currentId = "";
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) currentId = section.id;
  });

  navLinks.forEach(link => {
    const target = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", target === currentId);
  });
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach(card => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hide", !matches);
    });
  });
});

const testimonials = document.querySelectorAll(".testimonial");
const prevButton = document.querySelector(".slider-arrow.prev");
const nextButton = document.querySelector(".slider-arrow.next");
let currentTestimonial = 0;
let testimonialInterval;

function showTestimonial(index) {
  testimonials.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function moveTestimonial(step) {
  currentTestimonial = (currentTestimonial + step + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
}

function startAutoplay() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(() => moveTestimonial(1), 5000);
}

if (prevButton && nextButton) {
  prevButton.addEventListener("click", () => {
    moveTestimonial(-1);
    startAutoplay();
  });

  nextButton.addEventListener("click", () => {
    moveTestimonial(1);
    startAutoplay();
  });

  showTestimonial(currentTestimonial);
  startAutoplay();
}

const modal = document.querySelector(".product-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalTags = document.getElementById("modal-tags");
const modalClose = document.querySelector(".modal-close");
const modalBackdrop = document.querySelector(".modal-backdrop");
const moreButtons = document.querySelectorAll(".product-more");

function openModal(key) {
  const product = productsInfo[key];
  if (!product || !modal) return;

  modalTitle.textContent = product.title;
  modalDescription.textContent = product.description;
  modalTags.innerHTML = product.tags.map(tag => `<span>${tag}</span>`).join("");

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  body.style.overflow = "";
}

moreButtons.forEach(button => {
  button.addEventListener("click", () => {
    openModal(button.dataset.product);
  });
});

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && modal.classList.contains("open")) {
    closeModal();
  }
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Formulario adaptado a GitHub Pages:
// no usa backend, abre WhatsApp con mensaje preparado.
const demoForm = document.getElementById("demoForm");

if (demoForm) {
  demoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim() || "";
    const telefono = document.getElementById("telefono")?.value.trim() || "";
    const mensaje = document.getElementById("mensaje")?.value.trim() || "";

    const texto = `Hola Pastelería La Gloria,

Soy ${nombre || "un cliente"}.
Mi teléfono: ${telefono || "no indicado"}.

Quiero consultar:
${mensaje || "Me gustaría hacer un encargo."}`;

    const whatsappUrl = `https://wa.me/34953602315?text=${encodeURIComponent(texto)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}
