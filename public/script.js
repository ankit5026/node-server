// script.js
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".buttons button");
  const validPages = ["/about", "/news", "/payment"];

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("data-page");
      if (validPages.includes(page)) {
        window.location.href = page;
      } else {
        window.location.href = "/pagenotfound";
      }
    });
  });
});
