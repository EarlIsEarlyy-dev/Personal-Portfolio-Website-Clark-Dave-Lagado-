emailjs.init({
  publicKey: "rROkRkmNzAR1DM0Wm",
});

const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = form.querySelector("button[type='submit']");
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  formMsg.textContent = "";
  formMsg.className = "form-msg";

  emailjs.sendForm(
    "service_ph91kc8",
    "template_g45f98l",
    form
  )
  .then(() => {
    formMsg.textContent = "Message sent! I'll get back to you soon.";
    formMsg.className = "form-msg success";
    form.reset();
  })
  .catch((error) => {
    console.error("EmailJS error:", error);
    formMsg.textContent = "Something went wrong. Please try again or email me directly.";
    formMsg.className = "form-msg error";
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  });
});
