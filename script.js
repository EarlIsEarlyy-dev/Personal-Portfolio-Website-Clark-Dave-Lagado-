(function () {
  // Header shadow on scroll
  const header = document.getElementById("siteHeader");
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
    backToTop.classList.toggle("show", window.scrollY > 500);
  });
  backToTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  // Mobile nav toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks
    .querySelectorAll("a")
    .forEach((a) =>
      a.addEventListener("click", () => navLinks.classList.remove("open")),
    );

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navA = document.querySelectorAll(".nav-links a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute("id");
    });
    navA.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealEls.forEach((el) => io.observe(el));

  // Portfolio filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".p-card");

  function applyFilter(filter) {
    cards.forEach((card) => {
      const matches = filter === "all" || card.dataset.cat === filter;
      card.style.display = matches ? "" : "none";
    });
  }
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.dataset.filter);
    });
  });
  applyFilter("all");

  // Testimonials slider
  const slides = document.querySelectorAll(".t-slide");
  const dotsWrap = document.getElementById("tDots");
  let current = 0,
    timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "t-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Testimonial " + (i + 1));
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = document.querySelectorAll(".t-dot");

  function goTo(i) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = i;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }
  function next() {
    goTo((current + 1) % slides.length);
  }
  function startAuto() {
    timer = setInterval(next, 6000);
  }
  function stopAuto() {
    clearInterval(timer);
  }
  startAuto();
  document.querySelector(".t-slider").addEventListener("mouseenter", stopAuto);
  document.querySelector(".t-slider").addEventListener("mouseleave", startAuto);

  // Contact form (front-end only demo)
  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (!data.get("name") || !data.get("email") || !data.get("message")) {
      formMsg.textContent = "Please fill in all required fields.";
      formMsg.classList.remove("success");
      return;
    }
    formMsg.textContent =
      "Thanks! Your message has been sent — I'll get back to you soon.";
    formMsg.classList.add("success");
    form.reset();
  });
})();


//for emailjs
document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialize EmailJS with your Public Key
  emailjs.init({
    publicKey: "rROkRkmNzAR1DM0Wm",
  });

  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  // Safeguard: make sure the form exists on the DOM
  if (!form) {
    console.error("Could not find element with ID 'contactForm'");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    
    if (formMsg) {
      formMsg.textContent = "";
      formMsg.className = "form-msg";
    }

    // 2. Send Form data using EmailJS
    emailjs
      .sendForm("service_ph91kc8", "lx9aavn", form)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        if (formMsg) {
          formMsg.textContent = "Message sent! I'll get back to you soon.";
          formMsg.className = "form-msg success";
        }
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        if (formMsg) {
          formMsg.textContent = "Something went wrong. Please try again.";
          formMsg.className = "form-msg error";
        }
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
  });
});