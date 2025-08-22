document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("message");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "");
      localStorage.setItem("username", username);true
      window.location.href = "admin.html";
    } else {
      msg.textContent = "Invalid username or password.";
      msg.style.color = "red";
    }
  });
});
