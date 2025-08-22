document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const role = document.getElementById('role')?.value || 'user'; 
  const message = document.getElementById('message');

  if (!username || !password || !confirmPassword) {
    message.style.color = 'red';
    message.textContent = 'Please fill in all fields.';
    return;
  }

  if (password !== confirmPassword) {
    message.style.color = 'red';
    message.textContent = 'Passwords do not match.';
    return;
  }

  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role }) 
    });

    const data = await res.json();

    if (data.success) {
      message.style.color = 'green';
      message.textContent = 'Signup successful! Redirecting to login...';
      setTimeout(() => window.location.href = '/login', 1500);
    } else {
      message.style.color = 'red';
      message.textContent = data.message || 'Signup failed';
    }
  } catch (err) {
    message.style.color = 'red';
    message.textContent = 'Error: ' + err.message;
  }
});
