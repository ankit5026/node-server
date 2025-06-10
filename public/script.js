// script.js
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".buttons button");

  buttons.forEach(button => {
    button.addEventListener("click", async () => {
      const page = button.getAttribute("data-page");

      try {
        const response = await fetch(page, { method: "HEAD" });
        if (response.ok) {
          window.location.href = page;
        } else {
          window.location.href = "/pagenotfound";
        }
      } catch (error) {
        window.location.href = "/pagenotfound";
      }
    });
  });
});
