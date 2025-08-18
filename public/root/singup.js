document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const message = document.getElementById("message");

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      message.textContent = "Passwords do not match.";
      return;
    }

    // Simulate saving the user (ill add this  connect to backend/API next day na siguro)
    localStorage.setItem("newUser", JSON.stringify({ username, password }));
    message.style.color = "green";
    message.textContent = "Signup successful! Redirecting to login...";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  });
});
