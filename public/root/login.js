document.addEventListener('DOMContentLoaded', () => {
  const savedUsername = localStorage.getItem("rememberedUsername");
  if (savedUsername) {
    document.getElementById("username").value = savedUsername;
    document.getElementById("rememberMe").checked = true;
  }

  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    if (rememberMe) {
      localStorage.setItem("rememberedUsername", username);
    } else {
      localStorage.removeItem("rememberedUsername");
    }

    // Check hardcoded admin
    if (username === "admin" && password === "admin123") {
      window.location.href = "admin.html";
      return;
    }

    // Check saved user from signup
    const newUser = JSON.parse(localStorage.getItem("newUser"));
    if (newUser && username === newUser.username && password === newUser.password) {
      window.location.href = "admin.html"; 
    } else {
      document.getElementById("message").textContent = "Invalid credentials.";
    }
  });

  document.getElementById("forgotPassword").addEventListener("click", function (event) {
    event.preventDefault();
    alert("Please contact the system administrator to reset your password.");
  });
});
